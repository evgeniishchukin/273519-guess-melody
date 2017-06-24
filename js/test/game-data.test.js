import assert from 'assert';
import {deepCopy} from '../utils/utils.js';
import gameModel from '../models/game-model.js';

const artistQuestion = JSON.parse(`{"type":1,"data":{"artistName":"Би-2","song":"Молитва","file":"sound/2.mp3","genre":"Rock"},"answers":[{"valid":true,"artistName":"Би-2","image":"./img/artists/bi-2.jpg"},{"valid":false,"artistName":"Краски","image":"./img/artists/kraski.jpg"},{"valid":false,"artistName":"Мельница","image":"./img/artists/melnica.jpg"}]}`);
const genreQuestion = JSON.parse(`{"type":2,"data":{"genreName":"Rock","description":"Рок"},"answers":[{"valid":true,"song":"Би-2","file":"sound/1.mp3"},{"valid":true,"song":"Оранжевое солнце","file":"sound/2.mp3"},{"valid":false,"song":"Вселенная бесконечна","file":"sound/4.mp3"}]}`);
const questions = [artistQuestion, genreQuestion, artistQuestion, artistQuestion, genreQuestion];

describe(`Game Logic Test`, () => {
  gameModel.questions = deepCopy(questions);

  beforeEach(function () {
    gameModel.resetGame();
    gameModel.questions = deepCopy(questions);
  });

  it(`All answers correct, game should be succsess`, () => {
    questions.forEach((item, i, array) => {
      switch (item.type) {
        case gameModel.GENRE_QUESTION_TYPE:
          gameModel.answer(0, 1);
          break;
        case gameModel.ARTIST_QUESTION_TYPE:
          gameModel.answer(0);
          break;
      }
    });

    assert.equal(false, gameModel.isFail);
  });

  it(`All answers incorrect, game should be fail`, () => {
    questions.forEach((item, i, array) => {
      switch (item.type) {
        case gameModel.QuestionType.GENRE:
          gameModel.answer(2);
          break;
        case gameModel.QuestionType.ARTIST:
          gameModel.answer(1);
          break;
      }
    });

    assert.equal(true, gameModel.isFail);
  });

  it(`All answers incorrect, lives should be 0`, () => {
    questions.forEach((item, i, array) => {
      switch (item.type) {
        case gameModel.QuestionType.GENRE:
          gameModel.answer(2);
          break;
        case gameModel.QuestionType.ARTIST:
          gameModel.answer(1);
          break;
      }
    });

    assert.equal(0, gameModel.lives);
  });

  it(`Time left, game should be fail`, () => {
    gameModel.resetGame();
    gameModel.timeLeft = 0;

    assert.equal(true, gameModel.isFail);
  });
});
