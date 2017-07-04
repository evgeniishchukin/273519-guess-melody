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
          return statisticsModel.load();
        })
        .then((stats) => {
          statisticsModel.stats = stats;
          this._view = new SuccessView(Object.assign({}, params, {percentHighscore: this._getPercentHighscore(params)}));
          show(this._view.element);
          this._view.onRestartClick = () => {
            this._view = null;
            location.reload();
            return application.welcomeScreen();
          };
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
      return b.points - a.points || a.time - b.time;
    });

    const playerIndex = commonStats.findIndex((item) => {
      return item.points === params.points && item.time === params.time;
    });

    let result = 0;

    if (playerIndex === 0 || commonStats.length === 1) {
      result = 100;
    } else if (playerIndex !== commonStats.length - 1) {
      result = 100 - (Math.abs(playerIndex + 1) / commonStats.length) * 100;
    }

    return Math.floor(result) + `%`;
  }
}
export default new ResultPresenter();
