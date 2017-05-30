import getElementFromTemplate from '../utils/get-element-from-template';        // Импортируем модуль с отрисовкой шаблона
import renderScreen from '../utils/render-screen';                              // Импортируем модуль с отрисовкой экрана
import welcome from './welcome';                                                  // Импортируем модуль с экраном welcome

// Задаем нужный элемент шаблона в виде строки
const temp = `
<section class="main main--result main--result-fail">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <h2 class="title">Вы проиграли</h2>
  <div class="main-stat">Ничего, вам повезет в следующий раз</div>
  <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
</section>`;

const resultBad = getElementFromTemplate(temp);                                 // Переводим шаблон в DOM элемент

const replay = resultBad.querySelector(`.main-replay`);                         // Определяем кнопку - начать заново

// При нажатии на кнопку начинаем игру заново
const clickOnReplay = function () {
  renderScreen(welcome);
};

// На кнопку "начать заново" навешиваем листенер по клику, который отрисовыет начальный экран
replay.addEventListener(`click`, clickOnReplay);

// Экспортируем экран resultBad
export default resultBad;
