import GenreView from '../views/game-genre-view.js';
import ArtistView from '../views/game-artist-view.js';
import gameModel from '../models/game-model.js';
import application from '../application/application.js';
import {show} from '../utils/utils.js';
import {deepCopy} from '../utils/utils.js';

class GamePresenter {

  constructor(model) {
    this.model = model;
  }

  init() {

    if (this.model.state.currentIndex === 0) {
      this.timer = setInterval(() =>
        this.updateTimer()
      , 1000);
    }

    switch (this.currentQuestion.type) {
      case this.model.QuestionType.ARTIST:
        this.view = new ArtistView(this.currentQuestion);
        break;
      case this.model.QuestionType.GENRE:
        this.view = new GenreView(this.currentQuestion);
        break;
    }

    show(this.view.element);
    this.view.onAnswer = (...answerIndexes) => {
      this.answer(...answerIndexes);
      this.chooseScreen();
    };
  }

  destroy() {
    clearInterval(this.timer);
    this.resetGame();
  }

  onNextQuestion() {
    if (this.model.state.currentIndex === 0) {
      application.gameScreen();
    } else {
      application.showGame();
    }
  }

  onFinishGame() {
    application.showResult(this.isFail);
    this.destroy();
  }

  updateTimer() {
    this.timeLeft--;

    const timerMin = document.getElementsByClassName(`timer-value-mins`)[0];
    const timerSec = document.getElementsByClassName(`timer-value-secs`)[0];

    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft - (minutes * 60);

    timerMin.innerHTML = minutes.toString().length === 1 ? `0${minutes}` : minutes;
    timerSec.innerHTML = seconds.toString().length === 1 ? `0${seconds}` : seconds;
  }

  get gameTime() {
    return this.model.initState.time - this.model.state.time;
  }

  set timeLeft(value) {
    this.model.state.time = value;
  }

  get timeLeft() {
    return this.model.state.time;
  }

  get lives() {
    return this.model.state.lives;
  }

  get correctAnswers() {
    return this.model.state.questions.reduce((sum, question) => {
      return sum + (question.isUserAnswerCorrect ? 1 : 0);
    }, 0);
  }

  get currentQuestion() {
    return this.model.state.questions[this.model.state.currentIndex];
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
    this.model.state = Object.assign({}, this.model.state, {questions: deepCopy(this.model.questions)});
  }

  answer(...selectedIndexes) {
    const correct = this.proceedCurrentAnswer(selectedIndexes);
    if (!correct) {
      this.model.state.lives = Math.max(0, this.model.state.lives - 1);
    }
  }

  chooseScreen() {
    if (this.model.state.lives < 1 || this.model.state.time < 0) {
      this.onFinishGame();
    } else {
      this.nextQuestion();
    }
  }

  nextQuestion() {
    this.model.state.currentIndex++;
    if (this.model.state.currentIndex >= this.model.questions.length) {
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
    let correct = answers.findIndex((item) => item.valid && item.isUserAnswer) >= 0;
    this.currentQuestion.isUserAnswerCorrect = correct;

    return correct;
  }
}
const game = new GamePresenter(gameModel);

export default game;
