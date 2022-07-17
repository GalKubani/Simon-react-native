import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
interface compProps {
  color: string;
  attemptPlayerMove: Function;
  isPlayerTurn: boolean;
  isCurrentColor: boolean;
}

export default ({
  color,
  attemptPlayerMove,
  isPlayerTurn,
  isCurrentColor,
}: compProps) => {
  return (
    <TouchableOpacity
      disabled={!isPlayerTurn}
      onPress={() => {
        attemptPlayerMove(color);
      }}>
      <View
        style={[
          styles.square,
          styles[color],
          isCurrentColor ? {opacity: 0.3} : {},
        ]}
      />
    </TouchableOpacity>
  );
};
const styles: Record<string, any> = StyleSheet.create({
  square: {
    height: 150,
    width: 150,
  },
  red: {
    backgroundColor: 'red',
  },
  blue: {
    backgroundColor: 'blue',
  },
  yellow: {
    backgroundColor: 'yellow',
  },
  green: {
    backgroundColor: 'green',
  },
});
