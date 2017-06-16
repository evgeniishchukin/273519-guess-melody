import AbstractView from '../main-view/view.js';
import * as data from '../data/data.js';
import * as state from '../controllers/state.js';

export default class ResultFailView extends AbstractView {
  get template() {
    return `<section class="main main--result">
    <section class="logo" title="${data.gameInfo.gameName}"><h1>${data.gameInfo.gameName}</h1></section>
    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;${this.getTimeString()}<br>вы&nbsp;отгадали ${state.getCorrectAnswers()}&nbsp;мелодии</div>
    <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${data.getPercentHighscore(state.getCorrectAnswers())}&nbsp;игроков</span>
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

    return screenDom;
  }

  getTimeString() {
    const time = state.getGameTime();

    const mins = Math.floor(time / 60);
    const secs = time - (mins * 60);

    if (mins) {
      return mins + ` минуты ` + secs + ` секунды`;
    } else {
      return secs + ` секунды`;
    }
  }
}
