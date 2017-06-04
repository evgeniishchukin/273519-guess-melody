import getElementFromTemplate from '../utils/get-element-from-template';
import setScreen from '../controllers/set-screen';
import screenTimer from './timer/screen-timer';

export default (songs, trueSongs) => {
  const templateAnswer = (answer) => `
    <div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="${answer.id}" name="answer" value="${answer.value}" />
      <label class="main-answer" for="${answer.id}">
        <img class="main-answer-preview" src="${answer.img}">
        ${answer.name}
      </label>
    </div>`;

  const templateMain = `
  <section class="main main--level main--level-artist">
    ${screenTimer()}
    <div class="main-wrap">
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper">${trueSongs.mp3File}</div>
      <form class="main-list">
        ${songs.map((answer) => templateAnswer(answer)).join(``)}
      </form>
    </div>
  </section>`;

  const levelArtist = getElementFromTemplate(templateMain);

  const answerCollection = levelArtist.querySelectorAll(`.main-answer-r`);

  const checkAnswer = (element) => {
    const answerID = element.id;
    const currentID = trueSongs.id;
    if (answerID === currentID) {
      setScreen(true);
    } else {
      setScreen(false);
    }
  };
  const onClickAnswer = (event) => {
    checkAnswer(event.target);
  };

  for (const answer of answerCollection) {
    answer.addEventListener(`change`, onClickAnswer);
  }

  return levelArtist;
};
