import WelcomeView from '../views/welcome-view.js';
import application from '../application/application.js';

class WelcomePresenter {
  constructor() {
    this.view = new WelcomeView();
  }

  show(element) {
    const mainScreen = document.querySelector(`.main`);
    mainScreen.innerHTML = ``;
    mainScreen.appendChild(element);
  }

  init() {
    this.view.getMarkup();
    this.show(this.view.element);
    this.view.onStartClick = () => {
      location.hash = application.ControllerId.GAME;
    };
  }
}

const welcome = new WelcomePresenter();
export default welcome;
