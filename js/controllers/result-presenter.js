import SuccessView from '../views/result-success-view.js';
import FailView from '../views/result-fail-view.js';
import application from '../application/application.js';
import statisticsModel from '../models/statistics-model.js';
import {show} from '../utils/utils.js';

class ResultPresenter {
  init(params) {
    if (params) {
      statisticsModel.send(params)
        .then(() => {
          statisticsModel.load()
            .then((stats) => {
              statisticsModel.stats = stats;
            })
            .then(() => {
              this.view = new SuccessView(Object.assign({}, params, {percentHighscore: this.getPercentHighscore(params)}));
              show(this.view.element);
              this.view.onRestartClick = () => {
                location.reload();
                return application.welcomeScreen();
              };
            })
            .catch(window.console.error);
        })
        .catch(window.console.error);
    } else {
      this.view = new FailView();
      show(this.view.element);
      this.view.onRestartClick = () => {
        location.reload();
        return application.welcomeScreen();
      };
    }
  }

  getPercentHighscore(params) {
    const commonStats = statisticsModel.stats;
    commonStats.forEach((item) => {
      item.points = item.correctAnswers + (item.correctAnswers / item.time);
    });

    commonStats.sort((a, b) => {
      return b.points - a.points;
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
