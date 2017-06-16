import AbstractView from '../main-view/view.js';
import * as state from '../controllers/state.js';
import timer from '../timer/timer-view';

export default class GameGenreView extends AbstractView {
  get template() {
    return `<section class="main main--level main--level-genre">
    ${timer()}
    <div class="main-wrap">
      <h2 class="title">Выберите ${state.getCurrentQuestion().data.description.toLowerCase()} треки</h2>
      <form class="genre">
        ${[...state.getCurrentQuestion().answers].map((answer, index) => {
          return this.createSong(index, answer);
        })}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`;
  }

  createSong(index, answer) {
    return `<div class="genre-answer">
            <div class="player-wrapper"></div>
            <input type="checkbox" name="answer" value="answer-1" id="a-${index}">
            <label class="genre-answer-check" for="a-${index}"></label>
          </div>`;
  }

  onAnswer(...indexes) {

  }

  bind() {
    const currentQuestion = state.getCurrentQuestion();
    const screenDom = this.element;

    this.answers = screenDom.querySelectorAll(`.genre-answer`);
    this.answerButton = screenDom.querySelector(`.genre-answer-send`);

    const playerWrappers = [...screenDom.querySelectorAll(`.player-wrapper`)];

    for (let i = 0; i < playerWrappers.length; i++) {
      playerWrappers[i].addEventListener(`click`, (event) => {
        event.preventDefault();

        if (this.currentAudio) {
          this.currentAudio.pause();
        }

        this.currentAudio = playerWrappers[i].querySelectorAll(`audio`)[0];
      });

      window.initializePlayer(playerWrappers[i], [...currentQuestion.answers][i].file, false, true);
    }

    for (let i = 0; i < this.answers.length; i++) {
      this.answers[i].addEventListener(`click`, () => {
        this.answerClickHandler();
      });
    }

    this.answerButton.disabled = true;

    this.answerButton.onclick = (event) => {
      event.preventDefault();

      const answerIndexes = [];
      [...this.answers].forEach((item, i, array) => {
        if (this.answers[i].querySelector(`input`).checked) {
          answerIndexes.push(i);
        }
      });

      this.onAnswer(...answerIndexes);
    };
  }

  answerClickHandler() {
    this.answerButton.disabled = false;
  }
}
