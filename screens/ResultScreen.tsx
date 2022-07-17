import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface screenProps {
  route: {params: {currentScore: number}};
}
type storageData = {
  name: string;
  score: number;
};

export default ({route}: screenProps) => {
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [text, onChangeText] = useState('');
  const [currentResult, setCurrentResult] = useState<storageData>({
    name: '',
    score: 0,
  });
  const [allResults, setAllResults] = useState<storageData[] | []>([]);
  const {currentScore} = route.params;

  useEffect(() => {
    setIsOpenModal(true);
    setCurrentResult({name: '', score: 0});
  }, []);

  useEffect(() => {
    const getAndUpdateResults = async () => {
      const results: storageData[] | null = JSON.parse(
        (await AsyncStorage.getItem('results')) || '',
      );
      if (results) {
        results.push(currentResult);
        results.sort((a, b) => {
          if (a.score > b.score) {
            return 1;
          }
          return -1;
        });
        setAllResults(results);
        await AsyncStorage.setItem('results', JSON.stringify(results));
      }
    };
    getAndUpdateResults().then(() => {
      console.log('updated results');
    });
  }, [currentResult]);
  const closeModal = async () => {
    setIsOpenModal(!isModalOpen);
    setCurrentResult({name: text, score: currentScore});
    console.log(allResults);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.modalText}>allResults</Text>
      <Modal animationType="slide" transparent={true} visible={isModalOpen}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Whats your name?</Text>
            <TextInput
              onChangeText={onChangeText}
              maxLength={20}
              style={styles.input}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}>
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
