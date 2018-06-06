import { AsyncStorage } from 'react-native';
const STORAGE_NAME = 'FLASHCARDS_STORAGE';

//retorna todos os baralhos com seus títulos, perguntas, e respostas.
export const getDecks = () =>
  AsyncStorage.getItem(STORAGE_NAME)
    .then(item => JSON.parse(item))
    .catch(ex => console.error(ex));

//dado um único argumento id, ele retorna o baralho associado àquele id.
export const getDeck = id =>
  AsyncStorage.getItem(STORAGE_NAME)
    .then(item => JSON.parse(item)[id])
    .catch(ex => console.error(ex));

//dado um único argumento title, ele adiciona-o aos baralhos.
export const saveDeckTitle = title => {
  return getDecks()
    .then(decks => {
      const newDecks = { ...decks, [title]: { title, questions: [] } };
      return AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(newDecks));
    })
    .catch(ex => console.error(ex));
};

//dado dois argumentos, title e card, ele adiciona o cartão à lista de perguntas ao baralho com o título associado.
export const addCardToDeck = (title, card) => {
  return getDecks()
    .then(decks => {
      if (decks && decks[title]) {
        decks[title].questions.push(card);
        AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(decks));
      }
    })
    .catch(ex => console.error(ex));
};
