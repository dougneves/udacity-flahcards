import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Decks from './components/decks';
import AddDeck from './components/add-deck';
import ViewDeck from './components/view-deck';
import AddCard from './components/add-card';

const Stack = createStackNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      title: 'Baralhos'
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: 'Criar Baralho',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#66bb66'
      }
    }
  },
  ViewDeck: {
    screen: ViewDeck,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#66bbbb'
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#66bbbb'
      }
    }
  }
});

export default class App extends React.Component {
  render() {
    return <Stack />;
  }
}
