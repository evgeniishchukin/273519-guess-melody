import AbstractView from '../views/abstract-view.js';
import * as data from '../data/data.js';
import {getTimeString} from '../utils/utils.js';

export default class ResultFailView extends AbstractView {

  constructor(stats) {
    super();

    this.stats = stats;
  }

  get template() {
    return `<section class="main main--result">
    <section class="logo" title="${data.gameInfo.gameName}"><h1>${data.gameInfo.gameName}</h1></section>
    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;${getTimeString(this.stats.time)}<br>вы&nbsp;отгадали ${this.stats.correctAnswers}&nbsp;мелодии</div>
    <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${this.stats.percentHighscore}&nbsp;игроков</span>
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
