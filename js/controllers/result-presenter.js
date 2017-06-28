import SuccessView from '../views/result-success-view.js';
import FailView from '../views/result-fail-view.js';
import application from '../application/application.js';
import statisticsModel from '../models/statistics-model.js';
import {show} from '../utils/utils.js';

class ResultPresenter {
  init(params) {
    if (params) {
      statisticsModel.send(params);
    }

    statisticsModel.load()
      .then((stats) => {
        statisticsModel.stats = stats;
      })
      .then(() => {
        if (params) {
          this.view = new SuccessView(Object.assign({}, params, {percentHighscore: this.getPercentHighscore(params)}));
        } else {
          this.view = new FailView();
        }
        show(this.view.element);
        this.view.onRestartClick = () => {
          location.reload();
          application.welcomeScreen();
        };
      })
      .catch(window.console.error);
  }

  getPercentHighscore(params) {
    const commonStats = statisticsModel.stats;

    commonStats.sort((a, b) => {
      return b.answers - a.answers || a.time - b.time;
    });

    const playerIndex = commonStats.findIndex((item) => {
      if (item.correctAnswers === params.correctAnswers && item.time === params.time) {
        return true;
      }
      return false;
    });

    const result = 100 - (Math.abs(playerIndex) / commonStats.length) * 100;
    return Math.floor(result) + `%`;
  }
}
export default new ResultPresenter();
