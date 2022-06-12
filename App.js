import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import ImagePicker from './src/screens/imagePicker';
import TakeSnap from './src/screens/takeSnap';

export default function App() {
  const [uri, setUri] = useState('');

  const getUri = url => {
    console.log('url=>', url);
    setUri(url);
  };
  return (
    <View style={styles.container}>
      <View style={styles.snap}>
        <TakeSnap seturl={getUri} />
      </View>
      <View style={styles.displayText}>
        <ImagePicker uri={uri} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  snap: {
    flex: 2,
  },
  displayText: {
    flex: 1,
  },
});
