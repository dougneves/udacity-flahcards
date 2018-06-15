import React from 'react';
import { AsyncStorage, TextInput, Alert } from 'react-native';
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

const DeckNameTxt = styled.TextInput`
  font-size: 24px;
  min-width: 90%;
  margin: 5px;
  height: 45px;
  text-align: center;
`;

const DeckNameCount = styled.Text`
  color: #aaa;
  font-size: 14px;
`;

export default class App extends React.Component {
  state = { deckName: '' };

  handleDeckNameChange = deckName => {
    if (deckName.length <= 15) this.setState({ deckName });
  };

  onAddPress = () => {
    if (
      !this.state.deckName ||
      this.state.deckName.trim().length === 0 ||
      this.state.deckName.length > 15
    )
      return Alert.alert(
        'Campo Inválido',
        'O nome do baralho precisa ter entre 1 e 15 caracteres',
        [{ text: 'OK' }],
        { cancelable: true }
      );

    saveDeckTitle(this.state.deckName.trim())
      .then(() => {
        this.props.navigation.goBack();
        this.props.navigation.state.params.onGoBack(this.state.deckName.trim());
      })
      .catch(err =>
        Alert.alert('Erro', err.message, [{ text: 'OK' }], { cancelable: true })
      );
  };

  onCancelPress = () => this.props.navigation.goBack();

  render = () => (
    <MainView>
      <Title>Criar um novo baralho:</Title>
      <DeckNameTxt
        value={this.state.deckName}
        onChangeText={this.handleDeckNameChange}
      />
      <DeckNameCount>{this.state.deckName.length}/15</DeckNameCount>
      <AddBtn onPress={this.onAddPress}>
        <AddBtnText>Criar</AddBtnText>
      </AddBtn>
      <CancelBtn onPress={this.onCancelPress}>
        <CancelBtnText>Cancelar</CancelBtnText>
      </CancelBtn>
    </MainView>
  );
}
