import dataModel from './data-model.js';
import {dataAdapter} from './data-model.js';
import {deepCopy} from '../utils/utils.js';
import {initialState} from '../data/data.js';

const gameModelAdapter = new class extends dataAdapter {
  constructor() {
    super();
  }

  preprocess(data) {
    return data.map((item) => {
      switch (item.type) {
        case `artist`:
          return {type: 1, data: {file: item.src}, answers: gameModelAdapter.proceedArtistAnswers(item.answers)};
        case `genre`:
          return {type: 2, data: item.question, answers: gameModelAdapter.proceedGenreAnswers(item.answers, item.genre)};
      }

      return {};
    });
  }

  toServer(data) {
    return JSON.stringify(data);
  }

  proceedArtistAnswers(answers) {
    return answers.map((item) => {
      return {valid: item.isCorrect, artistName: item.title, image: item.image.url};
    });
  }

  proceedGenreAnswers(answers, correctGenre) {
    return answers.map((item) => {
      return {valid: item.genre === correctGenre ? true : false, file: item.src};
    });
  }
}();

class GameModel extends dataModel {

  constructor() {
    super();

    this.QuestionType = {
      ARTIST: 1,
      GENRE: 2
    };

    this.questions = [];
    this.initState = deepCopy(initialState);
    this.initState.questions = deepCopy(this.questions);
    this.state = Object.assign({}, this.initState);
  }

  get urlRead() {
    return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/questions`;
  }

  get correctAnswers() {
    return this.state.questions.reduce((sum, question) => {
      return sum + (question.isUserAnswerCorrect ? 1 : 0);
    }, 0);
  }

  get gameTime() {
    return this.initState.time - this.state.time;
  }

  set timeLeft(value) {
    this.state.time = value;

    if (!this.state.time) {
      this.onFinishGame();
    }
  }

  get timeLeft() {
    return this.state.time;
  }

  get lives() {
    return this.state.lives;
  }

  get currentQuestion() {
    return this.state.questions[this.state.currentIndex];
  }

  get stats() {
    const stats = {};
    stats.correctAnswers = this.correctAnswers;
    stats.time = this.gameTime;
    return stats;
  }

  get isFail() {
    return !this.timeLeft || !this.lives;
  }

  resetGame() {
    this.state = Object.assign({}, this.initState, {questions: deepCopy(this.questions)});
  }

  answer(...selectedIndexes) {
    this.proceedCurrentAnswer(selectedIndexes);
    if (this.currentQuestion.isUserAnswerCorrect) {
      this.nextQuestion();
    } else {
      this.state.lives = Math.max(0, this.state.lives - 1);

      if (this.state.lives < 1) {
        this.onFinishGame();
      } else {
        this.nextQuestion();
      }
    }
  }

  nextQuestion() {
    this.state.currentIndex++;

    if (this.state.currentIndex >= this.state.questions.length) {
      this.onFinishGame();
    } else {
      this.onNextQuestion();
    }
  }

  proceedCurrentAnswer(answerIndexes) {
    const answers = this.currentQuestion.answers;
    answerIndexes.forEach((item) => {
      answers[item].isUserAnswer = true;
    });

    let correct = answers.findIndex((item, i) => item.valid && !item.isUserAnswer || !item.valid && item.isUserAnswer) <= 0;
    this.currentQuestion.isUserAnswerCorrect = correct;
    return correct;
  }

  onFinishGame() {

  }

  onNextQuestion() {

  }

  load() {
    return super.load(gameModelAdapter);
  }
}

const model = new GameModel();
export default model;
