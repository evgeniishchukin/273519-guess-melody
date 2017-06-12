import getElementFromTemplate from '../utils/get-element-from-template';
import {onQuestionAnswered} from '../controllers/game-controller';
import timerScreen from './timer/timer-screen';
import getTimeFromScreen from '../utils/get-time-from-screen';

export default (songs, trueSong, timeLeft) => {
  const answerTemplate = (answer) => `
    <div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="${answer.id}" name="answer" value="${answer.value}" />
      <label class="main-answer" for="${answer.id}">
        <img class="main-answer-preview" src="${answer.img}">
        ${answer.name}
      </label>
    </div>`;

  const mainTemplate = `
  <section class="main main--level main--level-artist">
    ${timerScreen(timeLeft)}
    <div class="main-wrap">
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper">${trueSong.mp3File}</div>
      <form class="main-list">
        ${songs.map((answer) => answerTemplate(answer)).join(``)}
      </form>
    </div>
  </section>`;

  const levelArtist = getElementFromTemplate(mainTemplate);

  const answersCollection = levelArtist.querySelectorAll(`.main-answer-r`);

  const checkAnswer = (element) => {
    const answerId = element.id;
    const currentId = trueSong.id;

    onQuestionAnswered((answerId === currentId), getTimeFromScreen());
  };

  const onAnswerClick = (event) => {
    checkAnswer(event.target);
  };

  for (const answer of answersCollection) {
    answer.addEventListener(`change`, onAnswerClick);
  }

  return levelArtist;
};
