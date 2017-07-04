import welcome from '../controllers/welcome-presenter.js';
import game from '../controllers/game-presenter.js';
import result from '../controllers/result-presenter.js';
import model from '../models/game-model.js';
import preloader from '../views/preloader-view.js';
import {preloadAudio, show} from '../utils/utils.js';

const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  RESULT: `result`
};

export default class Application {
  constructor() {

    window.onhashchange = () => {
      return this._initLocation();
    };

    this._routes = {
      [ControllerId.WELCOME]: welcome,
      [ControllerId.GAME]: game,
      [ControllerId.RESULT]: result
    };
  }

  init() {
    show(preloader.element);

    model.load()
      .then((data) => {
        this._setup(data);
        return data.reduce((sum, question) => {
          switch (question.type) {
            case `genre`:
              return sum.concat(question.answers
                .filter((answer) => {
                  return answer.file;
                })
                .map((answer) => {
                  return answer.file;
                }));
            case `artist`:
              return question.data.file ? sum.concat(question.data.file) : sum;
            default:
              return sum;
          }
        }, []);
      })
      .then((urls) => {
        return preloadAudio(urls);
      })
      .then(() => {
        return this._initLocation();
      })
      .catch(window.console.error);
  }

  _setup(questions) {
    model.questions = questions;
  }

  _initLocation() {
    const params = this._getJSONHashString(location.hash);
    this._changeController(this._getRawHashString(location.hash), params);
  }

  _getRawHashString(hash) {
    let returnString = hash.replace(`#`, ``);

    const index = hash.indexOf(`=`);
    if (index > 0) {
      returnString = returnString.substr(0, index - 1);
    }
    return returnString;
  }

  _getJSONHashString(hash) {
    const index = hash.indexOf(`=`);

    let returnString = hash.replace(`#`, ``);
    if (index > 0) {
      returnString = returnString.substr(index);
    }
    try {
      return JSON.parse(returnString);
    } catch (error) {
      return null;
    }
  }

  _changeController(route = ``, params) {
    const controller = this._routes[route];
    game.destroy();
    if (controller) {
      controller.init(params);
    } else {
      welcome.init();
    }
  }

  static welcomeScreen() {
    location.hash = ControllerId.WELCOME;
  }

  static showWelcome() {
    welcome.init();
  }

  static gameScreen() {
    location.hash = ControllerId.GAME;
  }

  static showGame() {
    game.init();
  }

  static showResult(finResult) {
    if (finResult) {
      location.hash = ControllerId.RESULT;
    } else {
      location.hash = `${ControllerId.RESULT}=${JSON.stringify(game.stats)}`;
    }
  }
}
