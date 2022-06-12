import React from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from 'react-native';

const InstructionModal = ({modalVisible, setModalVisible}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Select an operation !</Text>
          <View>
            <View>
              <Image
                style={styles.operationIcon}
                source={require('../assets/note.png')}
              />
            </View>
            <View>
              <Text style={styles.operationDescription}>
                Ullamco fugiat fugiat cillum adipisicing non anim mollit
                laborum.
              </Text>
            </View>
          </View>
          <View>
            <View>
              <Image
                style={styles.operationIcon}
                source={require('../assets/visiting-card.png')}
              />
            </View>
            <View>
              <Text style={styles.operationDescription}>
                Ad incididunt enim exercitation esse mollit officia cupidatat
                minim officia aute magna mollit aliquip elit.
              </Text>
            </View>
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>GOT IT</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 12,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  operationIcon: {
    alignSelf: 'center',
    height: 100,
    width: 100,
  },
  operationDescription: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default InstructionModal;
