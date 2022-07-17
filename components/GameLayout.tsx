import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import GameButton from './GameButton';
import sounds from '../assets/Sounds';
import {CommonActions} from '@react-navigation/native';

interface screenProps {
  updateCurrentScore: Function;
  currentScore: number;
  navigation: any;
}
export default ({
  updateCurrentScore,
  currentScore,
  navigation,
}: screenProps) => {
  const [didGameStart, setDidGameStart] = useState<boolean>(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(false);
  const [playerClickIndex, setPlayerClickIndex] = useState<number>(0);
  const [simonMoves, setSimonMoves] = useState<string[]>([]);
  const [currentColor, setCurrentColor] = useState<string>('');
  const colors = ['red', 'blue', 'yellow', 'green'];
  const startGame = (): void => {
    setDidGameStart(true);
    setIsPlayerTurn(false);
    generateSimonMove();
  };
  const randColor = (): string => {
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const generateSimonMove = (): void => {
    const updatedSimonMoves = [...simonMoves];
    updatedSimonMoves.push(randColor());
    setSimonMoves(updatedSimonMoves);
    emulateSimonMoves(updatedSimonMoves);
  };
  const emulateSimonMoves = (updatedSimonMoves: string[]): void => {
    playNotes(updatedSimonMoves);
  };
  const playSound = (color: string): void => {
    sounds[color].play();
  };
  const playNotes = (sequence: string[]): void => {
    let i = 0;
    let intervalId = setInterval(() => {
      playSound(sequence[i]);
      animate(sequence[i]);
      i++;
      if (i >= sequence.length) {
        clearInterval(intervalId);
        setIsPlayerTurn(true);
      }
    }, 1000);
  };
  const animate = (color: string): void => {
    setCurrentColor(color);
    setTimeout(() => setCurrentColor(''), 800);
  };
  const gameOver = (): void => {
    console.log('game over');
    setIsPlayerTurn(false);
    setPlayerClickIndex(0);
    updateCurrentScore(0);
    setSimonMoves([]);
    setDidGameStart(false);
    navigation.dispatch(
      CommonActions.navigate('Result Screen', {currentScore}),
    );
  };
  const attemptPlayerMove = (color: string): void => {
    if (simonMoves[playerClickIndex] !== color) {
      gameOver();
      return;
    }
    playSound(color);
    if (playerClickIndex === currentScore) {
      setIsPlayerTurn(false);
      setPlayerClickIndex(0);
      updateCurrentScore();
      generateSimonMove();
    } else {
      setPlayerClickIndex(playerClickIndex + 1);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={didGameStart}
        onPress={startGame}
        style={styles.buttonContainer}>
        <Text style={styles.text}>{didGameStart ? 'Simon' : 'Start'}</Text>
      </TouchableOpacity>
      <View style={[styles.cross, styles.vertical]} />
      <View style={[styles.cross, styles.horizontal]} />
      <GameButton
        color={'red'}
        attemptPlayerMove={(color: string) => {
          attemptPlayerMove(color);
        }}
        isPlayerTurn={isPlayerTurn}
        isCurrentColor={currentColor === 'red'}
      />
      <GameButton
        color={'blue'}
        attemptPlayerMove={(color: string) => {
          attemptPlayerMove(color);
        }}
        isPlayerTurn={isPlayerTurn}
        isCurrentColor={currentColor === 'blue'}
      />
      <GameButton
        color={'yellow'}
        attemptPlayerMove={(color: string) => {
          attemptPlayerMove(color);
        }}
        isPlayerTurn={isPlayerTurn}
        isCurrentColor={currentColor === 'yellow'}
      />
      <GameButton
        color={'green'}
        attemptPlayerMove={(color: string) => {
          attemptPlayerMove(color);
        }}
        isPlayerTurn={isPlayerTurn}
        isCurrentColor={currentColor === 'green'}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 90,
  },
  buttonContainer: {
    position: 'absolute',
    top: 100,
    left: 100,
    zIndex: 10,
    backgroundColor: 'black',
    overflow: 'hidden',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  opacity: {
    opacity: 0.6,
  },
  cross: {
    zIndex: 9,
    position: 'absolute',
    backgroundColor: 'black',
  },
  vertical: {
    width: 40,
    height: 300,
    left: 130,
  },
  horizontal: {
    width: 300,
    height: 40,
    top: 130,
  },
});
