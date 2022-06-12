import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';

const ImagePicker = ({uri}) => {
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
      detect(uri);
    }
  }, [image, uri]);

  const detect = async pic => {
    let result = await TextRecognition.recognize(pic);
    setText(result);
  };

  return (
    <View>
      <Pressable onPress={() => setSelectImage(!selectImage)}>
        <Text> pressable {selectImage ? 'false' : 'true'}</Text>
      </Pressable>

      <View>
        {text
          ? text.map((item, index) => <Text key={index}>{item}</Text>)
          : null}
      </View>
    </View>
  );
};

export default ImagePicker;
