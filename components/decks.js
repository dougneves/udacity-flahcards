import React from 'react';
import { AsyncStorage, ScrollView } from 'react-native';
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

const DeckBtn = styled.TouchableOpacity`
  background: #6666bb;
  padding: 20px;
  min-width: 90%;
  align-items: center;
  margin: 5px;
`;

const DeckBtnText = styled.Text`
  color: #fff;
  font-size: 20px;
`;
const DeckBtnTextCount = styled.Text`
  color: #ddd;
  font-size: 14px;
`;

const Title = styled.Text`
  padding: 10px;
  margin: 10px;
  font-size: 30px;
`;
const AddBtn = styled.TouchableOpacity`
  background: #66bb66;
  padding: 20px;
  min-width: 90%;
  align-items: center;
  margin: 5px;
`;

const AddBtnText = styled.Text`
  color: #fff;
  font-size: 24px;
`;

export default class App extends React.Component {
  state = { deckList: [] };

  componentDidMount = () => {
    this.refresh();
  };

  refresh = () => {
    getDecks().then(decks => {
      if (decks) this.setState({ deckList: Object.values(decks) });
    });
  };

  openDeck = title =>
    this.props.navigation.navigate('ViewDeck', {
      title,
      refresh: this.refresh
    });

  renderList = list =>
    list.map((item, index) => {
      return (
        <DeckBtn key={index} onPress={() => this.openDeck(item.title)}>
          <DeckBtnText>{item.title}</DeckBtnText>
          <DeckBtnTextCount>
            {item.questions.length}{' '}
            {item.questions.length === 1 ? 'cartão' : 'cartões'}
          </DeckBtnTextCount>
        </DeckBtn>
      );
    });

  addDeck = () =>
    this.props.navigation.navigate('AddDeck', {
      onGoBack: deckName => {
        this.openDeck(deckName);
        this.refresh();
      }
    });

  render = () => (
    <MainView>
      <Title>Seus Baralhos</Title>
      <ScrollView>{this.renderList(this.state.deckList)}</ScrollView>
      <AddBtn onPress={this.addDeck}>
        <AddBtnText>+ NOVO BARALHO</AddBtnText>
      </AddBtn>
    </MainView>
  );
}
