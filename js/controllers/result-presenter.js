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
              this._view = new SuccessView(Object.assign({}, params, {percentHighscore: this._getPercentHighscore(params)}));
              show(this._view.element);
              this._view.onRestartClick = () => {
                this._view = null;
                location.reload();
                return application.welcomeScreen();
              };
            })
            .catch(window.console.error);
        })
        .catch(window.console.error);
    } else {
      this._view = new FailView();
      show(this._view.element);
      this._view.onRestartClick = () => {
        this._view = null;
        location.reload();
        return application.welcomeScreen();
      };
    }
  }

  _getPercentHighscore(params) {
    const commonStats = statisticsModel.stats;

    commonStats.sort((a, b) => {
      return b.correctAnswers - a.correctAnswers || a.time - b.time;
    });

    const playerIndex = commonStats.findIndex((item) => {
      return item.correctAnswers === params.correctAnswers && item.time === params.time;
    });

    const result = 100 - (Math.abs(playerIndex) / commonStats.length) * 100;
    return Math.floor(result) + `%`;
  }
}
export default new ResultPresenter();
