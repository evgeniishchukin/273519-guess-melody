import welcome from '../controllers/welcome-presenter.js';
import game from '../controllers/game-presenter.js';
import result from '../controllers/result-presenter.js';
import resultModel from '../models/result-model.js';
import model from '../models/game-model.js';


const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  RESULT: `result`
};

export default class Application {
  constructor() {

    window.onhashchange = () => {
      this.initLocation();
    };

    this.routes = {
      [ControllerId.WELCOME]: welcome,
      [ControllerId.GAME]: game,
      [ControllerId.RESULT]: result
    };
  }

  setup(questions) {
    model.questions = questions;
  }

  init() {
    model.load()
      .then((data) => this.setup(data))
      .then(() => {
        return resultModel.load();
      })
      .then((stats) => {
        resultModel.stats = stats;
      })
      .then(() => this.initLocation())
      .catch(window.console.error);
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
    location.hash = ControllerId.RESULT;
    if (finResult) {
      location.hash = ControllerId.RESULT;
    } else {
      location.hash = `${ControllerId.RESULT}=${JSON.stringify(model.stats)}`;
    }
  }

  initLocation() {
    const params = this.getJSONHashString(location.hash);
    this.changeController(this.getRawHashString(location.hash), params);
  }

  getRawHashString(hash) {
    let returnString = hash.replace(`#`, ``);

    const index = hash.indexOf(`=`);
    if (index > 0) {
      returnString = returnString.substr(0, index - 1);
    }
    return returnString;
  }

  getJSONHashString(hash) {
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

  changeController(route = ``, params) {
    const controller = this.routes[route];
    game.destroy();
    if (controller) {
      controller.init(params);
    } else {
      welcome.init();
    }
  }
}
