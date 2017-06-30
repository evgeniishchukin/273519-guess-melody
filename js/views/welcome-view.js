import AbstractView from './abstract-view.js';
import {gameInfo} from '../data/data.js';

export default class WelcomeView extends AbstractView {

  get template() {
    return (
      `<section class="main main--welcome">
        <section class="logo" title="${gameInfo.gameName}">
          <h1>${gameInfo.gameName}</h1>
        </section>
        <button class="main-play">Начать игру</button>
        <h2 class="title main-title">Правила игры</h2>
        <p class="text main-text">
          ${gameInfo.rules}
        </p>
      </section>`
    );
  }

  bind() {
    const buttonListener = (event) => {
      this.onStartClick();
      removeListeners();
    };

    const removeListeners = () => {
      button.removeEventListener(`click`, buttonListener);
    };

    const button = this.element.querySelector(`.main-play`);
    button.addEventListener(`click`, buttonListener);
  }

  onStartClick() {

  }
}
