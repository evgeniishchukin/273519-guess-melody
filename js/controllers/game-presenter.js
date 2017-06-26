import GenreView from '../views/game-genre-view.js';
import ArtistView from '../views/game-artist-view.js';
import gameModel from '../models/game-model.js';
import application from '../application/application.js';
import {show} from '../utils/utils.js';

class GamePresenter {

  constructor(model) {
    this.model = model;
  }

  init() {
    if (this.model.state.currentIndex === 0) {
      this.timer = setInterval(() =>
        this.updateTimer()
      , 1000);
      // window.initializeCountdown();
    }

    switch (this.model.currentQuestion.type) {
      case this.model.QuestionType.ARTIST:
        this.view = new ArtistView(this.model.currentQuestion);
        break;
      case this.model.QuestionType.GENRE:
        this.view = new GenreView(this.model.currentQuestion);
        break;
    }

    show(this.view.element);
    this.view.onAnswer = (...answerIndexes) => this.model.answer(...answerIndexes);

    this.model.onNextQuestion = () => {
      if (this.model.state.currentIndex === 0) {
        application.gameScreen();
      } else {
        application.showGame();
      }
    };

    this.model.onFinishGame = () => {
      application.showResult(this.model.isFail);
      this.destroy();
    };
  }

  destroy() {
    clearInterval(this.timer);
    this.model.resetGame();
  }

  updateTimer() {
    this.model.timeLeft--;

    const timerMin = document.getElementsByClassName(`timer-value-mins`)[0];
    const timerSec = document.getElementsByClassName(`timer-value-secs`)[0];

    const minutes = Math.floor(this.model.timeLeft / 60);
    const seconds = this.model.timeLeft - (minutes * 60);

    timerMin.innerHTML = minutes.toString().length === 1 ? `0${minutes}` : minutes;
    timerSec.innerHTML = seconds.toString().length === 1 ? `0${seconds}` : seconds;
  }
}
const game = new GamePresenter(gameModel);

export default game;
