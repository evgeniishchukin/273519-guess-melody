import AbstractView from './abstract-view.js';
import timer from './timer-view';
import initializePlayer from '../utils/player.js';

export default class GameArtistView extends AbstractView {

  constructor(question) {
    super();

    this._question = question;
  }

  get template() {
    return (
      `<section class="main main--level main--level-artist">
        ${timer()}
        <div class="main-wrap">
          <div class="main-timer"></div>
          <h2 class="title main-title">Кто исполняет эту песню?</h2>
          <div class="player-wrapper"></div>
          <form class="main-list">
            ${[...this._question.answers].map((answer, index) => {
              return this._createAnswer(index, answer);
            })}
          </form>
        </div>
      </section>`
    );
  }

  _createAnswer(index, answer) {
    return (
      `<div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${index}" />
        <label class="main-answer" for="answer-1">
          <img class="main-answer-preview" src="${answer.image}">
          ${answer.artistName}
        </label>
      </div>`
    );
  }

  bind() {
    const screenDom = this.element;
    const answers = screenDom.querySelectorAll(`.main-answer-wrapper`);
    const player = screenDom.querySelector(`.player-wrapper`);

    const artistSong = this._question.data;
    initializePlayer(player, artistSong.file, true, true);

    const answerListener = (event) => {
      event.preventDefault();

      const wrapperElement = event.currentTarget;
      const index = wrapperElement.querySelector(`.main-answer-r`).value;

      this.onAnswer(index);
    };

    answers.forEach((item) => {
      item.addEventListener(`click`, answerListener);
    });
  }

  onAnswer(...indexes) {

  }
}
