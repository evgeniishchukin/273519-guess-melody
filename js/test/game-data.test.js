import assert from 'assert';
import {deepCopy} from '../utils/utils.js';
import gameModel from '../models/game-model.js';
import gamePresenter from '../controllers/game-presenter';

const artistQuestion = JSON.parse(`{"type":"artist", "isUserAnswer": true, "data":{"artistName":"Би-2","song":"Молитва","file":"sound/2.mp3","genre":"Rock"},"answers":[{"valid":true,"artistName":"Би-2","image":"./img/artists/bi-2.jpg"},{"valid":false,"artistName":"Краски","image":"./img/artists/kraski.jpg"},{"valid":false,"artistName":"Мельница","image":"./img/artists/melnica.jpg"}]}`);
const genreQuestion = JSON.parse(`{"type":"genre", "isUserAnswer": true, "data":{"genreName":"Rock","description":"Рок"},"answers":[{"valid":true,"song":"Би-2","file":"sound/1.mp3"},{"valid":true,"song":"Оранжевое солнце","file":"sound/2.mp3"},{"valid":false,"song":"Вселенная бесконечна","file":"sound/4.mp3"}]}`);
const questions = [artistQuestion, genreQuestion, artistQuestion, artistQuestion, genreQuestion];

describe(`Game Logic Test`, () => {
  gameModel.questions = deepCopy(questions);

  beforeEach(() => {
    gamePresenter.resetGame();
    gameModel.questions = deepCopy(questions);
  });

  it(`All answers correct, game should be success`, () => {
    gameModel.questions.forEach((item) => {
      switch (item.type) {
        case gameModel.QuestionType.GENRE:
          gamePresenter.answer(1, 0);
          break;
        case gameModel.QuestionType.ARTIST:
          gamePresenter.answer(0);
          break;
      }
    });

    assert.equal(false, gamePresenter.isFail);
  });

  it(`All answers incorrect, game should be fail`, () => {
    questions.forEach((item) => {
      switch (item.type) {
        case gameModel.QuestionType.GENRE:
          gamePresenter.answer(2);
          break;
        case gameModel.QuestionType.ARTIST:
          gamePresenter.answer(2);
          break;
      }
    });

    assert.equal(true, gamePresenter.isFail);
  });

  it(`All answers incorrect, lives should be 0`, () => {
    questions.forEach((item) => {
      switch (item.type) {
        case gameModel.QuestionType.GENRE:
          gamePresenter.answer(2);
          break;
        case gameModel.QuestionType.ARTIST:
          gamePresenter.answer(1);
          break;
      }
    });

    assert.equal(0, gamePresenter.lives);
  });

  it(`Time left, game should be fail`, () => {
    gamePresenter.resetGame();
    gamePresenter.timeLeft = 0;

    assert.equal(true, gamePresenter.isFail);
  });
});
