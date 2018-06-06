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

const PerguntaTxt = styled.TextInput`
  font-size: 24px;
  min-width: 90%;
  margin: 5px;
  height: 45px;
`;
const RespostaTxt = styled.TextInput`
  font-size: 18px;
  min-width: 90%;
  margin: 5px;
  height: 45px;
`;

const StyledTxtCount = styled.Text`
  color: #aaa;
  font-size: 14px;
`;

const StyledTitle = styled.Text`
  padding: 10px;
  margin: 10px;
  font-size: 18px;
`;

export default class App extends React.Component {
  state = {
    pergunta: '',
    resposta: ''
  };
  static navigationOptions = ({ navigation }) => {
    return { title: `${navigation.state.params.title} - adicionar carta` };
  };

  onAddPress = () => {
    if (!this.state.deckName || this.state.deckName.length > 15)
      return Alert.alert(
        'Campo Inválido',
        'O nome do baralho precisa ter entre 1 e 15 caracteres',
        [{ text: 'OK' }],
        { cancelable: true }
      );

    saveDeckTitle(this.state.deckName).then(() => {
      this.props.navigation.state.params.onGoBack();
      this.props.navigation.goBack();
    });
  };

  onPerguntaChanged = pergunta => {
    this.setState({ pergunta });
  };
  onRespostaChanged = resposta => {
    this.setState({ resposta });
  };

  render = () => (
    <MainView>
      <Title>
        Adicionar carta ao baralho {this.props.navigation.state.params.title}
      </Title>
      <StyledTitle>Pergunta:</StyledTitle>
      <PerguntaTxt
        value={this.state.pergunta}
        onChangeText={this.onPerguntaChanged}
      />
      <StyledTxtCount>{this.state.pergunta.length}/44</StyledTxtCount>
      <StyledTitle>Resposta:</StyledTitle>
      <RespostaTxt
        value={this.state.resposta}
        onChangeText={this.onRespostaChanged}
      />
      <StyledTxtCount>{this.state.resposta.length}/144</StyledTxtCount>
      <AddBtn onPress={this.onAddPress}>
        <AddBtnText>Criar</AddBtnText>
      </AddBtn>
    </MainView>
  );
}
