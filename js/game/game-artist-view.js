import AbstractView from '../main-view/view.js';
import * as state from '../controllers/state.js';
import timer from '../timer/timer-view';

export default class GameArtistView extends AbstractView {
  get template() {
    return `<section class="main main--level main--level-artist">
      ${timer()}

      <div class="main-wrap">
        <div class="main-timer"></div>

        <h2 class="title main-title">Кто исполняет эту песню?</h2>
        <div class="player-wrapper"></div>
        <form class="main-list">
          ${[...state.getCurrentQuestion().answers].map((answer, index) => {
            return this.createAnswer(index, answer);
          })}
        </form>
      </div>
    </section>`;
  }

  createAnswer(index, answer) {
    return `<div class="main-answer-wrapper">
    <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${index}" />
    <label class="main-answer" for="answer-1">
    <img class="main-answer-preview" src="${answer.image}">
    ${answer.artistName}
    </label>
    </div>`;
  }

  onAnswer(...indexes) {

  }

  bind() {
    const currentQuestion = state.getCurrentQuestion();

    const screenDom = this.element;
    const answers = screenDom.querySelectorAll(`.main-answer-wrapper`);
    const player = screenDom.querySelector(`.player-wrapper`);

    const artistSong = currentQuestion.data;
    window.initializePlayer(player, artistSong.file, true, true);

    for (let i = 0; i < answers.length; i++) {
      answers[i].addEventListener(`click`, (event) => {
        event.preventDefault();

        const wrapperElement = event.currentTarget;
        const index = wrapperElement.querySelector(`.main-answer-r`).value;

        this.onAnswer(index);
      });
    }
  }
}
