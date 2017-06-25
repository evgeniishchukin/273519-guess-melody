import WelcomeView from '../views/welcome-view.js';
import application from '../application/application.js';
import {show} from '../utils/utils.js';

class WelcomePresenter {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    this.view.getMarkup();
    show(this.view.element);
    this.view.onStartClick = () => {
      location.hash = application.ControllerId.GAME;
    };
  }
}

const welcome = new WelcomePresenter();
export default welcome;
