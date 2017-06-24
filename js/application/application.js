import welcome from '../controllers/welcome-presenter.js';
import game from '../controllers/game-presenter.js';
import result from '../controllers/result-presenter.js';
import model from '../models/game-model.js';

class Application {
  constructor() {
    this.ControllerId = {
      WELCOME: ``,
      GAME: `game`,
      RESULT: `result`
    };

    window.onhashchange = () => {
      this.initLocation();
    };

    const preloaderRemove = this.showWelcome;

    model.load()
      .then((data) => this.setup(data))
      .then(preloaderRemove)
      .then(() => this.initLocation())
      .catch(window.console.error);

    this.routes = {
      [this.ControllerId.WELCOME]: welcome,
      [this.ControllerId.GAME]: game,
      [this.ControllerId.RESULT]: result
    };
  }

  setup(questions) {
    model.questions = questions;
  }

  init() {}

  showWelcome() {
    welcome.init();
  }

  showGame() {
    game.init();
  }

  initLocation() {
    const params = this.getJSONHashString(location.hash);
    this.changeController(this.getRawHashString(location.hash), params);
  }

  getRawHashString(hash) {
    const index = hash.indexOf(`=`);
    let returnString = hash.replace(`#`, ``);
    if (index > 0) {
      returnString = returnString.substr(0, index);
    }

    return returnString;
  }

  getJSONHashString(hash) {
    const index = hash.indexOf(`=`);

    let returnString = hash.replace(`#`, ``);
    if (index > 0) {
      returnString = returnString.substr(index + 1);
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
      this.showWelcome();
    }
  }
}

export default new Application();
