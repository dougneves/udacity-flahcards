import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
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

const ScrollView = styled.ScrollView`
  background: #fff;
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
  state = {
    pergunta: '',
    resposta: ''
  };
  static navigationOptions = ({ navigation }) => {
    return { title: `${navigation.state.params.title} - adicionar carta` };
  };

  onAddPress = () => {
    if (
      !this.state.pergunta ||
      this.state.pergunta.trim().length === 0 ||
      this.state.pergunta.length > 44
    )
      return Alert.alert(
        'Campo Inválido',
        'A pergunta precisa ter entre 1 e 44 caracteres',
        [{ text: 'OK' }],
        { cancelable: true }
      );
    if (
      !this.state.resposta ||
      this.state.resposta.trim().length === 0 ||
      this.state.resposta.length > 144
    )
      return Alert.alert(
        'Campo Inválido',
        'A resposta precisa ter entre 1 e 144 caracteres',
        [{ text: 'OK' }],
        { cancelable: true }
      );

    addCardToDeck(this.props.navigation.state.params.title, {
      pergunta: this.state.pergunta.trim(),
      resposta: this.state.resposta.trim()
    })
      .then(() => {
        this.props.navigation.state.params.goBack();
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.error(err);
        return Alert.alert('Erro', err.message, [{ text: 'OK' }], {
          cancelable: true
        });
      });
  };

  onCancelPress = () => this.props.navigation.goBack();
  onPerguntaChanged = pergunta => {
    if (pergunta.length <= 44) this.setState({ pergunta });
  };
  onRespostaChanged = resposta => {
    if (resposta.length <= 144) this.setState({ resposta });
  };

  render = () => (
    <ScrollView>
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
        <CancelBtn onPress={this.onCancelPress}>
          <CancelBtnText>Cancelar</CancelBtnText>
        </CancelBtn>
      </MainView>
    </ScrollView>
  );
}
