'use strict';
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';

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
  state = {
    flash: false,
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
              </View>
              <View
                style={{
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => this.takePicture(camera, this.props.seturl)}
                  style={styles.capture}>
                  <Image
                    style={styles.takeSnapIcon}
                    source={require('../assets/circle.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      </RNCamera>
    );
  }

  takePicture = async function (camera, seturl) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    seturl(data.uri);
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
    // borderRadius: 5,
    // padding: 15,
    // paddingHorizontal: 20,
    // alignSelf: 'center',
    margin: 20,
    alignSelf: 'flex-end',
  },
});

export default TakeSnap;
