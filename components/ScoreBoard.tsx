import React from 'react';
import {View, StyleSheet, FlatList, Text, Pressable} from 'react-native';
import {storageData} from './types';
import {CommonActions} from '@react-navigation/native';

interface compProps {
  allResults: storageData[];
  visible: boolean;
  navigation: any;
}

export default ({allResults, visible, navigation}: compProps) => {
  if (!visible) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Score Board</Text>
      </View>
      <FlatList
        style={styles.list}
        data={allResults}
        renderItem={({item, index}) => (
          <Text style={styles.listText}>
            {index + 1 + '. ' + item.name + ' scored - ' + item.score}
          </Text>
        )}
      />
      <Pressable
        style={[styles.button]}
        onPress={() => {
          navigation.dispatch(CommonActions.navigate('Game Screen'));
        }}>
        <Text style={styles.textStyle}>Play again</Text>
      </Pressable>
    </View>
  );
};
const styles: Record<string, any> = StyleSheet.create({
  list: {
    marginLeft: 22,
    marginTop: 18,
  },
  container: {
    marginTop: 50,
  },
  listText: {
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
