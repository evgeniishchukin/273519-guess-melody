import {startGame} from '../controllers/game-controller';
import getElementFromTemplate from '../utils/get-element-from-template';

export default () => {
  const template = `
  <section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;2 минуты дать
      максимальное количество правильных ответов.<br>
      Удачи!
    </p>
  </section>`;

  const welcome = getElementFromTemplate(template);

  const playGameButton = welcome.querySelector(`.main-play`);

  const onClickButton = () => {
    startGame();
  };

  playGameButton.addEventListener(`click`, onClickButton);

  return welcome;
};
