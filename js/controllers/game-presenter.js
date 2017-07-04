import GenreView from '../views/game-genre-view.js';
import ArtistView from '../views/game-artist-view.js';
import gameModel from '../models/game-model.js';
import application from '../application/application.js';
import {show} from '../utils/utils.js';
import {deepCopy} from '../utils/utils.js';
import redrawCircle from './timer.js';

class GamePresenter {

  constructor(model) {
    this._model = model;
  }

  get stats() {
    const stats = {};
    stats.correctAnswers = this._correctAnswers;
    stats.points = this.points;
    stats.time = this._gameTime;
    return stats;
  }

  get points() {
    return this._model.state.questions.reduce((sum, question) => {
      if (question.isUserAnswerCorrect && question.answerTime < 10) {
        return sum + 2;
      } else if (question.isUserAnswerCorrect) {
        return sum + 1;
      } else {
        return sum;
      }
    }, 0);
  }

  get _correctAnswers() {
    return this._model.state.questions.reduce((sum, question) => {
      return sum + (question.isUserAnswerCorrect ? 1 : 0);
    }, 0);
  }

  get _gameTime() {
    return this._model.initState.time - this._model.state.time;
  }

  get _initTime() {
    return this._model.state.initTime;
  }

  get _timeAnswer() {
    return this._initTime - this._timeLeft;
  }

  set _timeLeft(value) {
    this._model.state.time = value;
  }

  get _timeLeft() {
    return this._model.state.time;
  }

  get _lives() {
    return this._model.state.lives;
  }

  get _currentQuestion() {
    return this._model.state.questions[this._model.state.currentIndex];
  }

  get _isFail() {
    return !this._timeLeft || !this._lives;
  }

  init() {
    if (this._model.state.currentIndex === 0) {
      this.timer = setInterval(() =>
        this._updateTimer()
      , 1000);
    }

    const QestionType = new Map([
      [`artist`, new ArtistView(this._currentQuestion)],
      [`genre`, new GenreView(this._currentQuestion)]
    ]);

    this._view = QestionType.get(this._currentQuestion.type);

    show(this._view.element);
    this._model.state.initTime = this._model.state.time;
    redrawCircle(this._model.state.time);

    this._view.onAnswer = (...answerIndexes) => {
      this._answer(...answerIndexes);
      this._currentQuestion.answerTime = this._timeAnswer;
      this._chooseScreen();
      this._view = null;
    };
  }

  destroy() {
    clearInterval(this.timer);
    this._resetGame();
  }

  _resetGame() {
    this._model.state = Object.assign({}, this._model.state, {questions: deepCopy(this._model.questions)});
  }

  _answer(...selectedIndexes) {
    const correct = this._proceedCurrentAnswer(selectedIndexes);
    if (!correct) {
      this._model.state.lives = Math.max(0, this._model.state.lives - 1);
    }
  }

  _onNextQuestion() {
    if (this._model.state.currentIndex === 0) {
      application.gameScreen();
    } else {
      application.showGame();
    }
  }

  _onFinishGame() {
    application.showResult(this._isFail);
    this.destroy();
  }

  _chooseScreen() {
    if (this._model.state.lives < 1 || this._model.state.time < 0) {
      this._onFinishGame();
    } else {
      this._nextQuestion();
    }
  }

  _nextQuestion() {
    this._model.state.currentIndex++;

    if (this._model.state.currentIndex >= this._model.questions.length) {
      this._onFinishGame();
    } else {
      this._onNextQuestion();
    }
  }

  _proceedCurrentAnswer(answerIndexes) {
    const answers = this._currentQuestion.answers;

    answerIndexes.forEach((item) => {
      answers[item].isUserAnswer = true;
    });

    const correct = answers.filter((answer) => {
      return answer.valid || answer.isUserAnswer;
    }).every((answer) => {
      return answer.valid && answer.isUserAnswer;
    });

    this._currentQuestion.isUserAnswerCorrect = correct;

    return correct;
  }

  _updateTimer() {
    this._timeLeft--;

    if (this._timeLeft <= 0) {
      this._model.state.time = 0;
      this._onFinishGame();
      return;
    }

    const timerMin = document.getElementsByClassName(`timer-value-mins`)[0];
    const timerSec = document.getElementsByClassName(`timer-value-secs`)[0];

    const minutes = Math.floor(this._timeLeft / 60);
    const seconds = this._timeLeft - (minutes * 60);

    timerMin.innerHTML = minutes.toString().length === 1 ? `0${minutes}` : minutes;
    timerSec.innerHTML = seconds.toString().length === 1 ? `0${seconds}` : seconds;
  }
}
const game = new GamePresenter(gameModel);

export default game;
