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
  static navigationOptions = ({ navigation }) => {
    return { title: navigation.state.params.title };
  };

  addCard = () =>
    this.props.navigation.navigate('AddCard', {
      title: this.props.navigation.state.params.title
    });
  onCancelPress = () => this.props.navigation.goBack();

  render = () => (
    <MainView>
      <Title>{this.props.navigation.state.params.title}</Title>
      <CardsCount>287 cartas</CardsCount>
      <AddBtn onPress={this.addCard}>
        <AddBtnText>Adicionar carta</AddBtnText>
      </AddBtn>
      <PlayBtn>
        <PlayBtnText>Jogar</PlayBtnText>
      </PlayBtn>
      <CancelBtn onPress={this.onCancelPress}>
        <CancelBtnText>Cancelar</CancelBtnText>
      </CancelBtn>
    </MainView>
  );
}
