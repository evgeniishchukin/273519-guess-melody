import getElementFromTemplate from '../utils/get-element-from-template';
import {onRepeatGame} from '../controllers/game-controller';

export default (totalScore, timeLeft, statistics) => {
  const template = `
  <section class="main main--result main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">Итоговые результаты</h2>
    <div class="main-stat">Рейтинг игрока</div>
    Всего секунд: ${timeLeft} <br>Мелодий отгадано ${totalScore}<br>
    Это&nbsp;лучше чем у&nbsp;${statistics}%&nbsp;игроков
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;

  const result = getElementFromTemplate(template);

  const replayButton = result.querySelector(`.main-replay`);

  const onClickReplayButton = () => {
    onRepeatGame();
  };

  replayButton.addEventListener(`click`, onClickReplayButton);

  return result;
};
