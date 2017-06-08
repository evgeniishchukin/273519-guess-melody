import getElementFromTemplate from '../utils/get-element-from-template';
import setScreen from '../controllers/set-screen';

export default (totalScore) => {
  const template = `
  <section class="main main--result main--result-success">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;2&nbsp;минуты<br>вы&nbsp;отгадали ${totalScore}&nbsp;мелодии</div>
    <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;

  const resultGood = getElementFromTemplate(template);

  const replayButton = resultGood.querySelector(`.main-replay`);

  const onClickReplayButton = () => {
    setScreen();
  };

  replayButton.addEventListener(`click`, onClickReplayButton);

  return resultGood;
};
