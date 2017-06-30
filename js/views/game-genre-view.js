import AbstractView from './abstract-view.js';
import timer from './timer-view';
import {initializePlayer} from '../utils/player.js';

export default class GameGenreView extends AbstractView {

  constructor(question) {
    super();

    this.question = question;
  }

  get template() {
    return (
      `<section class="main main--level main--level-genre">
        ${timer()}
        <div class="main-wrap">
          <h2 class="title">Выберите ${this.question.data}</h2>
          <form class="genre">
            ${[...this.question.answers].map((answer, index) => {
              return this.createSong(index, answer);
            }).join(``)}
            <button class="genre-answer-send" type="submit">Ответить</button>
          </form>
        </div>
      </section>`
    );
  }

  createSong(index, answer) {
    return (
      `<div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-${index}">
        <label class="genre-answer-check" for="a-${index}"></label>
      </div>`
    );
  }

  onAnswer(...indexes) {

  }

  bind() {
    const screenDom = this.element;

    this.answers = screenDom.querySelectorAll(`.genre-answer`);
    this.answerButton = screenDom.querySelector(`.genre-answer-send`);

    const playerWrappers = [...screenDom.querySelectorAll(`.player-wrapper`)];

    let answerListeners = [];

    const removeListeners = () => {
      playerWrappers.forEach((item, index) => {
        item.removeEventListener(`click`, answerListeners[index]);
      });
      this.answers.forEach((item) => {
        item.removeEventListener(`click`, answerClickHandlerListener);
      });

      this.answerButton.removeEventListener(`click`, answerButtonListener);
    };

    playerWrappers.forEach((item, i) => {
      const answerListener = (event) => {
        event.preventDefault();

        if (this.currentAudio) {
          this.currentAudio.pause();
        }

        this.currentAudio = item.querySelectorAll(`audio`)[0];
      };

      answerListeners.push(answerListener);

      item.addEventListener(`click`, answerListener);

      initializePlayer(item, [...this.question.answers][i].file, false, true);
    });

    const answerClickHandlerListener = () => {
      this.answerClickHandler();
    };

    const answerButtonListener = (event) => {
      event.preventDefault();

      const answerIndexes = [];
      [...this.answers].forEach((item, i, array) => {
        if (this.answers[i].querySelector(`input`).checked) {
          answerIndexes.push(i);
        }
      });

      this.onAnswer(...answerIndexes);

      removeListeners();
    };

    this.answers.forEach((item) => {
      item.addEventListener(`click`, answerClickHandlerListener);
    });

    this.answerButton.disabled = true;

    this.answerButton.addEventListener(`click`, answerButtonListener);
  }

  answerClickHandler() {
    this.answerButton.disabled = false;
  }
}
