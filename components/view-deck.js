import React from 'react';
import { AsyncStorage } from 'react-native';
import styled from 'styled-components/native';
import {
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck
} from '../model/storage';

const MainView = styled.View`
  flex: 1;
  background: #fff;
  align-items: center;
`;

const Title = styled.Text`
  padding: 10px 20px 0;
  margin: 10px 20px 0;
  font-size: 30px;
`;
const CardsCount = styled.Text`
  font-size: 18px;
  color: #777;
  padding-bottom: 20px;
`;

const AddBtn = styled.TouchableOpacity`
  background: #bb66bb;
  padding: 20px;
  min-width: 90%;
  align-items: center;
  margin: 5px;
`;

const AddBtnText = styled.Text`
  color: #fff;
  font-size: 24px;
`;

const PlayBtn = styled.TouchableOpacity`
  background: #66bbbb;
  padding: 20px;
  min-width: 90%;
  align-items: center;
  margin: 5px;
`;

const PlayBtnText = styled.Text`
  color: #fff;
  font-size: 24px;
`;

const DeckNameTxt = styled.TextInput`
  font-size: 24px;
  min-width: 90%;
  margin: 5px;
  height: 45px;
`;

const DeckNameCount = styled.Text`
  color: #aaa;
  font-size: 14px;
`;

const CancelBtn = styled.TouchableOpacity`
  background: #666666;
  padding: 20px;
  min-width: 90%;
  align-items: center;
  margin: 5px;
`;

const CancelBtnText = styled.Text`
  color: #fff;
  font-size: 24px;
`;

export default class App extends React.Component {
  state = { cardsCount: '...' };
  static navigationOptions = ({ navigation }) => {
    return { title: navigation.state.params.title };
  };

  componentDidMount = () => this.refresh();

  refresh = () =>
    getDeck(this.props.navigation.state.params.title)
      .then(deck => this.setState({ cardsCount: deck.questions.length }))
      .catch(err => console.error(err));

  addCard = () =>
    this.props.navigation.navigate('AddCard', {
      title: this.props.navigation.state.params.title,
      goBack: () => {
        this.refresh();
        this.props.navigation.state.params.refresh();
      }
    });
  playDeck = () =>
    this.props.navigation.navigate('PlayDeck', {
      title: this.props.navigation.state.params.title
    });

  onCancelPress = () => this.props.navigation.goBack();

  render = () => (
    <MainView>
      <Title>{this.props.navigation.state.params.title}</Title>
      <CardsCount>{this.state.cardsCount} cartas</CardsCount>
      <AddBtn onPress={this.addCard}>
        <AddBtnText>Adicionar carta</AddBtnText>
      </AddBtn>
      <PlayBtn onPress={this.playDeck}>
        <PlayBtnText>Jogar</PlayBtnText>
      </PlayBtn>
      <CancelBtn onPress={this.onCancelPress}>
        <CancelBtnText>Cancelar</CancelBtnText>
      </CancelBtn>
    </MainView>
  );
}
