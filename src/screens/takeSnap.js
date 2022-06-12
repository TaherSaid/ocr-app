'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import InstructionModal from '../components/modal';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);

class TakeSnap extends Component {
  // operation value containe 0 or 1
  // - "0" will refer for a visit card
  // - "1" will refer for simple text
  state = {
    flash: false,
    operation: null,
    modalVisible: false,
  };

  render() {
    return (
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={
          this.state.flash
            ? RNCamera.Constants.FlashMode.on
            : RNCamera.Constants.FlashMode.off
        }
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status}) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
                flexDirection: 'column',
                alignContent: 'flex-start',
                width: '100%',
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  flexDirection: 'column',
                  alignContent: 'flex-start',
                  width: '100%',
                  paddingTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({flash: !this.state.flash})}
                  style={styles.capture}>
                  <Image
                    style={styles.flashIcon}
                    source={
                      this.state.flash === true
                        ? require('../assets/flashON.png')
                        : require('../assets/flashOFF.png')
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({operation: 0})}
                  style={styles.capture}>
                  <Image
                    style={styles.flashIcon}
                    source={require('../assets/visiting-card.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({operation: 1})}
                  style={styles.capture}>
                  <Image
                    style={styles.flashIcon}
                    source={require('../assets/note.png')}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.takePicture(camera, this.props.navigation.navigate)
                  }
                  style={styles.capture}>
                  <Image
                    style={styles.takeSnapIcon}
                    source={require('../assets/circle.png')}
                  />
                </TouchableOpacity>
              </View>
              <InstructionModal
                modalVisible={this.state.modalVisible}
                setModalVisible={newState =>
                  this.setState({modalVisible: newState})
                }
              />
            </View>
          );
        }}
      </RNCamera>
    );
  }

  takePicture = async function (camera, navigation) {
    if (this.state.operation != null) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      navigation('Image picker', {
        uri: data.uri,
      });
    } else {
      this.setState({modalVisible: true});
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  flashIcon: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
  },
  takeSnapIcon: {
    width: 60,
    height: 60,
  },
  capture: {
    flex: 0,
    margin: 20,
    alignSelf: 'flex-end',
  },
});

export default TakeSnap;
