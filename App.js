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
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [uri, setUri] = useState('');

  const getUri = url => {
    console.log('url=>', url);
    setUri(url);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Take snap" component={TakeSnap} />
        <Stack.Screen name="Image picker" component={ImagePicker} />
      </Stack.Navigator>
    </NavigationContainer>
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
