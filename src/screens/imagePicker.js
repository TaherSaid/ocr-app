import React, {useState, useEffect} from 'react';
import {Text, View, Pressable, StyleSheet, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';

const ImagePicker = ({uri, route, navigation}) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState([]);
  const [selectImage, setSelectImage] = useState(false);

  useEffect(() => {
    launchImageLibrary({}, setImage);
  }, [selectImage]);

  useEffect(() => {
    if (image?.assets) {
      detect(image.assets[0]?.uri);
    } else {
      detect(route.params.uri);
    }
  }, [image, route]);

  const detect = async pic => {
    let result = await TextRecognition.recognize(pic);
    setText(result);
  };

  return (
    <View style={style.container}>
      <Pressable onPress={() => setSelectImage(!selectImage)}>
        <Text> pressable {selectImage ? 'false' : 'true'}</Text>
      </Pressable>

      <View>
        {text
          ? text.map((item, index) => (
              <Text key={index} style={{fontSize: 20}}>
                {item}
              </Text>
            ))
          : null}
      </View>
      <Pressable style={style.floatBtn}>
        <Image style={style.addIcon} source={require('../assets/add.png')} />
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  addIcon: {
    width: 80,
    height: 80,
  },
  floatBtn: {
    width: 80,
    height: 80,
    borderRadius: 30,
    position: 'absolute',
    bottom: 10,
    right: 8,
  },
});

export default ImagePicker;
