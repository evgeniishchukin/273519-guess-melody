import AbstractView from './abstract-view.js';
import {gameInfo} from '../data/data.js';
import {getTimeString} from '../utils/utils.js';

export default class ResultFailView extends AbstractView {

  constructor(stats) {
    super();

    this._stats = stats;
  }

  get template() {
    return (
      `<section class="main main--result">
        <section class="logo" title="${gameInfo.gameName}">
          <h1>${gameInfo.gameName}</h1>
        </section>
        <h2 class="title">Вы настоящий меломан!</h2>
        <div class="main-stat">
          За&nbsp;${getTimeString(this._stats.time)}<br>вы&nbsp;отгадали ${this._stats.correctAnswers}&nbsp;мелодии.<br>Баллы: ${this._stats.points}
        </div>
        <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${this._stats.percentHighscore}&nbsp;игроков</span>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>`
    );
  }

  bind() {
    const screenDom = this.element;

    const buttonListener = (event) => {
      this.onRestartClick();
    };

    const button = screenDom.querySelector(`.main-replay`);
    button.addEventListener(`click`, buttonListener);
  }

  onRestartClick() {

  }
}
