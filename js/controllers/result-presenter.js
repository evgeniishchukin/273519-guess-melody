import SuccessView from '../views/result-success-view.js';
import FailView from '../views/result-fail-view.js';
import application from '../application/application.js';
import {initStat} from '../data/data.js';

class ResultPresenter {
  constructor() {
    this.initStatistics = Object.assign([], initStat);
  }

  show(element) {
    const mainScreen = document.querySelector(`.main`);
    mainScreen.innerHTML = ``;
    mainScreen.appendChild(element);
  }

  init(stats) {
    if (stats) {
      stats.percentHighscore = this.getPercentHighscore(stats.correctAnswers, stats.time);

      this.view = new SuccessView(stats);
    } else {
      this.view = new FailView();
    }

    this.view.getMarkup();
    this.show(this.view.element);

    this.view.onRestartClick = () => {
      location.hash = application.ControllerId.WELCOME;
    };
  }

  getPercentHighscore(correctAnswers, time) {
    this.initStatistics.push({answers: correctAnswers, time, isPlayerResult: true});

    this.initStatistics.sort((a, b) => {
      return b.answers - a.answers || a.time - b.time;
    });

    const playerIndex = this.initStatistics.findIndex((item) => {
      if (item.isPlayerResult) {
        delete item.isPlayerResult;
        return true;
      }

      return false;
    });

    const result = 100 - ((playerIndex + 1) / this.initStatistics.length) * 100;
    return Math.floor(result) + `%`;
  }
}
export default new ResultPresenter();
