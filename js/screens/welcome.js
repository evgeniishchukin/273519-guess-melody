import getElementFromTemplate from '../utils/get-element-from-template';        // Импортируем модуль с отрисовкой шаблона
import renderScreen from '../utils/render-screen';                              // Импортируем модуль с отрисовкой экрана
import levelArtist from './level-artist';                                       // Импортируем модуль с экраном Artist

// Задаем нужный элемент шаблона в виде строки
const template = `<section class="main main--welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;2 минуты дать
    максимальное количество правильных ответов.<br>
    Удачи!
  </p>
</section>`;

const welcome = getElementFromTemplate(template);                                   // Переводим шаблон в DOM элемент

const playButton = welcome.querySelector(`.main-play`);                         // Определяем кнопку старта игры

// Создаем функцию отрсовки следующего по порядку экрана при нажатии на кнопку play
const handlePaintScreen = () => {
  renderScreen(levelArtist);
};

// Навешиваем листенер по клику на кнопку с вызовом функции отрисовки
playButton.addEventListener(`click`, handlePaintScreen);

// Экспортируем экран приветствия
export default welcome;
