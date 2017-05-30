import getElementFromTemplate from '../utils/get-element-from-template';        // Импортируем модуль с отрисовкой шаблона
import renderScreen from '../utils/render-screen';                              // Импортируем модуль с отрисовкой экрана
import welcome from './welcome';                                                  // Импортируем модуль с экраном welcome

// Задаем нужный элемент шаблона в виде строки
const temp = `
<section class="main main--result main--result-success">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <h2 class="title">Вы настоящий меломан!</h2>
  <div class="main-stat">За&nbsp;2&nbsp;минуты<br>вы&nbsp;отгадали 4&nbsp;мелодии</div>
  <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>
  <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
</section>`;

const resultGood = getElementFromTemplate(temp);                                 // Переводим шаблон в DOM элемент

const replay = resultGood.querySelector(`.main-replay`);                         // Определяем кнопку - начать заново

// При нажатии на кнопку начинаем игру заново
const clickOnReplay = function () {
  renderScreen(welcome);
};

// На кнопку "начать заново" навешиваем листенер по клику, который отрисовыет начальный экран
replay.addEventListener(`click`, clickOnReplay);

// Экспортируем экран resultGood
export default resultGood;
