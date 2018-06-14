import React from 'react';
import { AsyncStorage } from 'react-native';
import styled from 'styled-components/native';
import {
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck
} from '../model/storage';
import {
  clearLocalNotifications,
  setLocalNotification
} from '../utils/helpers';

const MainView = styled.View`
  flex: 1;
  background: #fff;
  align-items: center;
`;

const InsideView = styled.View`
  flex: 1;
  background: #fff;
  align-items: center;
  justify-content: center;
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

const QuestionBtn = styled.TouchableOpacity`
  background: #fff;
  padding: 20px;
  min-width: 90%;
  align-items: center;
  margin: 5px;
`;

const CorrectButton = styled.TouchableOpacity`
  background: #66bb66;
  padding: 20px;
  min-width: 90%;
  align-items: center;
  margin: 5px;
`;
const WrongButton = styled.TouchableOpacity`
  background: #bb6666;
  padding: 20px;
  min-width: 90%;
  align-items: center;
  margin: 5px;
`;
const ButtonText = styled.Text`
  color: #fff;
  font-size: 24px;
`;

const QuestionText = styled.Text`
  color: #339999;
  font-size: 24px;
`;

const AnwserText = styled.Text`
  color: #333399;
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
  state = {
    questions: [],
    cardsCount: 0,
    corrects: 0,
    wrongs: 0,
    currentIndex: 0,
    showQuestion: true
  };

  static navigationOptions = ({ navigation }) => {
    return { title: navigation.state.params.title };
  };

  componentDidMount = () => {
    this.refresh();
    clearLocalNotifications()
      .then(setLocalNotification)
      .catch(err => console.error(err));
  };

  refresh = () =>
    getDeck(this.props.navigation.state.params.title)
      .then(deck =>
        this.setState({
          questions: deck.questions,
          cardsCount: deck.questions.length
        })
      )
      .catch(err => console.error(err));

  onCorrectPress = () =>
    this.setState({
      showQuestion: true,
      corrects: this.state.corrects + 1,
      currentIndex: this.state.currentIndex + 1
    });
  onWrongPress = () =>
    this.setState({
      showQuestion: true,
      wrongs: this.state.wrongs + 1,
      currentIndex: this.state.currentIndex + 1
    });

  renderQuestion = question => (
    <InsideView>
      <QuestionBtn onPress={() => this.setState({ showQuestion: false })}>
        <QuestionText>
          {this.state.questions.length <= this.state.currentIndex
            ? '...'
            : this.state.questions[this.state.currentIndex].pergunta}
        </QuestionText>
        {this.state.currentIndex === 0 && (
          <CardsCount>(toque na pergunta para ver a resposta)</CardsCount>
        )}
      </QuestionBtn>
    </InsideView>
  );
  renderAnwser = anwser => (
    <InsideView>
      <AnwserText>
        {this.state.questions.length <= this.state.currentIndex
          ? '...'
          : this.state.questions[this.state.currentIndex].resposta}
      </AnwserText>
      <CorrectButton onPress={this.onCorrectPress}>
        <ButtonText>Acertei!</ButtonText>
      </CorrectButton>
      <WrongButton onPress={this.onWrongPress}>
        <ButtonText>Errei...</ButtonText>
      </WrongButton>
    </InsideView>
  );

  showResult = () => {
    if (this.state.cardsCount > 0) {
      const correctPercent = this.state.corrects / this.state.cardsCount * 100;
      return (
        <InsideView>
          <QuestionText>Fim de jogo!</QuestionText>
          <QuestionText>Veja seu resultado final:</QuestionText>
          <QuestionText>{correctPercent}% de acerto. </QuestionText>
          <QuestionText>
            {correctPercent > 70 ? 'PARABÉNS' : 'Tente de novo, você consegue!'}
          </QuestionText>
        </InsideView>
      );
    } else
      return (
        <QuestionText>
          Adicione cartas ao baralho antes de jogar...
        </QuestionText>
      );
  };

  render = () => {
    return (
      <MainView>
        <Title>{this.props.navigation.state.params.title}</Title>
        <CardsCount>
          {this.state.corrects}{' '}
          {this.state.corrects === 1 ? 'acerto' : 'acertos'} e{' '}
          {this.state.wrongs} {this.state.corrects === 1 ? 'erro' : 'erros'}
        </CardsCount>
        {this.state.questions.length > this.state.currentIndex && (
          <CardsCount>
            Pergunta {this.state.currentIndex + 1} de {this.state.cardsCount}
          </CardsCount>
        )}
        {this.state.questions.length <= this.state.currentIndex
          ? this.showResult()
          : this.state.showQuestion
            ? this.renderQuestion()
            : this.renderAnwser()}
      </MainView>
    );
  };
}
