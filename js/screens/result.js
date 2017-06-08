import getElementFromTemplate from '../utils/get-element-from-template';
import setScreen from '../controllers/set-screen';
const resultObj = {
  Type: ``,
  Header: ``,
  Stat: ``,
  Raring: ``
};

export default (resultType, totalScore) => {
  if (resultType === `bad`) {
    resultObj.Type = `fail`;
    resultObj.Header = `Вы проиграли`;
    resultObj.Stat = `Ничего, вам повезет в следующий раз`;
    resultObj.Rating = ``;
  } else {
    resultObj.Type = `success`;
    resultObj.Header = `Вы настоящий меломан!`;
    resultObj.Stat = `За&nbsp;2&nbsp;минуты<br>вы&nbsp;отгадали ${totalScore}&nbsp;мелодии`;
    resultObj.Rating = `Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков`;
  }

  const template = `
  <section class="main main--result main--result-${resultObj.Type}">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${resultObj.Header}</h2>
    <div class="main-stat">${resultObj.Stat}</div>
    ${resultObj.Rating}
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;

  const result = getElementFromTemplate(template);

  const replayButton = result.querySelector(`.main-replay`);

  const onClickReplayButton = () => {
    setScreen();
  };

  replayButton.addEventListener(`click`, onClickReplayButton);

  return result;
};
