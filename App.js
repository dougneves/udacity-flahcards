import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Decks from './components/decks';

const Stack = createStackNavigator({
  Decks: {
    screen: Decks
  }
});

export default class App extends React.Component {
  render() {
    return <Stack />;
  }
}
