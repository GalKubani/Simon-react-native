import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
interface screenProps {
  route: {params: {currentScore: number}};
}

export default ({route}: screenProps) => {
  const [isModalOpen, setIsOpenModal] = useState(false);
  // once modal closes, need to add name to high scores, via async storage
  const {currentScore} = route.params;

  useEffect(() => {
    setIsOpenModal(true);
  }, []);
  return (
    <View style={styles.container}>
      <Text />
      <Modal animationType="slide" transparent={true} visible={isModalOpen}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Whats your name?</Text>
            <TextInput maxLength={20} style={styles.input} editable={true} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setIsOpenModal(!isModalOpen)}>
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: 200,
    width: 180,
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
  input: {
    height: 40,
    margin: 12,
    width: 140,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
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
    marginBottom: 15,
    textAlign: 'center',
  },
});
