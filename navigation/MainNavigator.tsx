import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import GameScreen from '../screens/GameScreen';
import ResultScreen from '../screens/ResultScreen';
const MainStackNavigator = createStackNavigator();

export const GameNavigator = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator.Navigator>
        <MainStackNavigator.Screen name="Game Screen" component={GameScreen} />
        <MainStackNavigator.Screen
          name="Result Screen"
          component={ResultScreen}
        />
      </MainStackNavigator.Navigator>
    </NavigationContainer>
  );
};
