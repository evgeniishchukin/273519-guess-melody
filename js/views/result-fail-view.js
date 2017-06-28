import AbstractView from './abstract-view.js';
import {gameInfo} from '../data/data.js';

export default class ResultFailView extends AbstractView {
  get template() {
    return `<section class="main main--result">
    <section class="logo" title="${gameInfo.gameName}"><h1>${gameInfo.gameName}</h1></section>
    <h2 class="title">Вы проиграли</h2>
    <div class="main-stat">Ничего, вам повезет в следующий раз</div>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  }

  onRestartClick() {

  }

  bind() {
    const screenDom = this.element;

    let button = screenDom.querySelector(`.main-replay`);
    button.onclick = () => {
      this.onRestartClick();
    };
  }
}
