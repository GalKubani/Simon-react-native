import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import GameLayout from '../components/GameLayout';
export default ({navigation}: any) => {
  const [currentScore, setCurrentScore] = useState<number>(0);
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Current score: {currentScore}</Text>
      <View style={styles.circle}>
        <GameLayout
          updateCurrentScore={(value: number) => {
            setCurrentScore(value === 0 ? value : currentScore + 1);
          }}
          currentScore={currentScore}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  circle: {
    height: 310,
    width: 310,
    borderColor: 'black',
    borderRadius: 160,
    borderWidth: 5,
    overflow: 'hidden',
  },
  paragraph: {
    margin: 24,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
