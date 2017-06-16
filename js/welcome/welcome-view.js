import AbstractView from '../main-view/view.js';
import {gameInfo} from '../data/data.js';

export default class WelcomeView extends AbstractView {
  get template() {
    return `<section class="main main--welcome">
    <section class="logo" title="${gameInfo.gameName}"><h1>${gameInfo.gameName}</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      ${gameInfo.rules}
    </p>
    </section>`;
  }

  bind() {
    const button = this.element.querySelector(`.main-play`);
    button.onclick = () => {
      this.onStartClick();
    };
  }

  onStartClick() {

  }
}
