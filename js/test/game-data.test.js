import assert from 'assert';
import {deepCopy} from '../utils/utils.js';
import * as gameState from '../controllers/state.js';

const artistQuestion = JSON.parse(`{"type":1,"data":{"artistName":"Би-2","song":"Молитва","file":"sound/2.mp3","genre":"Rock"},"answers":[{"valid":true,"artistName":"Би-2","image":"./img/artists/bi-2.jpg"},{"valid":false,"artistName":"Краски","image":"./img/artists/kraski.jpg"},{"valid":false,"artistName":"Мельница","image":"./img/artists/melnica.jpg"}]}`);
const genreQuestion = JSON.parse(`{"type":2,"data":{"genreName":"Rock","description":"Рок"},"answers":[{"valid":true,"song":"Би-2","file":"sound/1.mp3"},{"valid":true,"song":"Оранжевое солнце","file":"sound/2.mp3"},{"valid":false,"song":"Вселенная бесконечна","file":"sound/4.mp3"}]}`);
const questions = [artistQuestion, genreQuestion, artistQuestion, artistQuestion, genreQuestion];

describe(`Game Logic Test`, () => {
  gameState.state.questions = deepCopy(questions);

  it(`Gamescreen should be equal 2`, () => {
    gameState.showGame();
    assert.equal(gameState.GAME_SCREEN, gameState.getCurrentState());
  });

  it(`All answers correct, game should be succeas`, () => {
    gameState.resetGame();
    gameState.showGame();
    gameState.state.questions = deepCopy(questions);
    questions.forEach((item, i, array) => {
      switch (item.type) {
        case gameState.GENRE_QUESTION_TYPE:
          gameState.answer(0, 1);
          break;
        case gameState.ARTIST_QUESTION_TYPE:
          gameState.answer(0);
          break;
      }
    });

    assert.equal(false, gameState.isFail());
  });

  it(`All answers incorrect, game should be fail`, () => {
    gameState.resetGame();
    gameState.showGame();
    gameState.state.questions = deepCopy(questions);
    questions.forEach((item, i, array) => {
      switch (item.type) {
        case gameState.GENRE_QUESTION_TYPE:
          gameState.answer(2);
          break;
        case gameState.ARTIST_QUESTION_TYPE:
          gameState.answer(1);
          break;
      }
    });

    assert.equal(true, gameState.isFail());
  });

  it(`All answers incorrect, lifes should be equal 0`, () => {
    gameState.resetGame();
    gameState.showGame();
    gameState.state.questions = deepCopy(questions);
    questions.forEach((item, i, array) => {
      switch (item.type) {
        case gameState.GENRE_QUESTION_TYPE:
          gameState.answer(2);
          break;
        case gameState.ARTIST_QUESTION_TYPE:
          gameState.answer(1);
          break;
      }
    });

    assert.equal(0, gameState.getLifes());
  });

  it(`Time left, game should be fail`, () => {
    gameState.resetGame();
    gameState.showGame();
    gameState.setTime(0);

    assert.equal(true, gameState.isFail());
  });
});
