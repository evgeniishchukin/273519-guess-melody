import AbstractView from './abstract-view.js';
import timer from './timer-view';

export default class GameGenreView extends AbstractView {

  constructor(question) {
    super();

    this.question = question;
  }

  get template() {
    return `<section class="main main--level main--level-genre">
    ${timer()}
    <div class="main-wrap">
      <h2 class="title">Выберите ${this.question.data}</h2>
      <form class="genre">
        ${[...this.question.answers].map((answer, index) =>
           this.createSong(index, answer)
        ).join(``)}
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
    const screenDom = this.element;

    this.answers = screenDom.querySelectorAll(`.genre-answer`);
    this.answerButton = screenDom.querySelector(`.genre-answer-send`);

    const playerWrappers = [...screenDom.querySelectorAll(`.player-wrapper`)];

    playerWrappers.forEach((item, i) => {
      item.addEventListener(`click`, (event) => {
        event.preventDefault();

        if (this.currentAudio) {
          this.currentAudio.pause();
        }

        this.currentAudio = item.querySelectorAll(`audio`)[0];
      });

      window.initializePlayer(item, [...this.question.answers][i].file, false, true);
    });

    this.answers.forEach((item) => {
      item.addEventListener(`click`, () => {
        this.answerClickHandler();
      });
    });

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
