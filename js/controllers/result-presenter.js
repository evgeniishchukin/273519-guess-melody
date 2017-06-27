import SuccessView from '../views/result-success-view.js';
import FailView from '../views/result-fail-view.js';
import application from '../application/application.js';
import statisticsModel from '../models/statistics-model.js';
import {show} from '../utils/utils.js';

class ResultPresenter {
  init(stats) {
    if (stats) {
      statisticsModel.send(stats);
      this.view = new SuccessView(Object.assign({}, stats, {percentHighscore: this.getPercentHighscore(stats)}));

    } else {
      this.view = new FailView();
    }

    show(this.view.element);

    this.view.onRestartClick = () => {
      location.reload();
      application.welcomeScreen();
    };
  }

  getPercentHighscore(stats) {
    stats.isPlayerResult = true;

    const commonStats = statisticsModel.stats;

    commonStats.push(stats);

    commonStats.sort((a, b) => {
      return b.answers - a.answers || a.time - b.time;
    });

    const playerIndex = commonStats.findIndex((item) => {
      if (item.isPlayerResult) {
        delete item.isPlayerResult;
        return true;
      }

      return false;
    });
    const result = 100 - (playerIndex / commonStats.length) * 100;
    return Math.floor(result) + `%`;
  }
}
export default new ResultPresenter();
