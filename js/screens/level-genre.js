import getElementFromTemplate from '../utils/get-element-from-template';        // Импортируем модуль с отрисовкой шаблона
import renderScreen from '../utils/render-screen';                              // Импортируем модуль с отрисовкой экрана
import getRandomElement from '../utils/get-random-element';                     // Импортируем модуль с выбором рандомного итога
import resultGood from './result-good';                                         // Импортируем модуль с экраном выигрыша
import resultBad from './result-bad';                                           // Импортируем модуль с экраном проигрыша

// Задаем нужный элемент шаблона в виде строки
const temp = `
<section class="main main--level main--level-genre">
  <h2 class="title">Выберите инди-рок треки</h2>
  <form class="genre">
    <div class="genre-answer">
      <div class="player-wrapper"></div>
      <input type="checkbox" name="answer" value="answer-1" id="a-1">
      <label class="genre-answer-check" for="a-1"></label>
    </div>
    <div class="genre-answer">
      <div class="player-wrapper"></div>
      <input type="checkbox" name="answer" value="answer-1" id="a-2">
      <label class="genre-answer-check" for="a-2"></label>
    </div>
    <div class="genre-answer">
      <div class="player-wrapper"></div>
      <input type="checkbox" name="answer" value="answer-1" id="a-3">
      <label class="genre-answer-check" for="a-3"></label>
    </div>
    <div class="genre-answer">
      <div class="player-wrapper"></div>
      <input type="checkbox" name="answer" value="answer-1" id="a-4">
      <label class="genre-answer-check" for="a-4"></label>
    </div>
    <button class="genre-answer-send" type="submit" disabled>Ответить</button>
  </form>
</section>`;

const levelGenre = getElementFromTemplate(temp);                                // Переводим шаблон в DOM элемент
const sendAnswer = levelGenre.querySelector(`.genre-answer-send`);              // Определяем кнопку отправки ответа
const possibleAnswers = levelGenre.querySelectorAll(`input[type="checkbox"]`);  // Определяем массив возможных ответов

// Определяем состояние кнопки с отправкой ответов (если хоть один не выбран, то она отключена)
const sendAnswerState = function (state) {
  if (state) {
    sendAnswer.disabled = false;
  } else {
    sendAnswer.disabled = true;
  }
};

// Устанвливаем начальное состояние возможных ответов (ни один не выбран)
const setAnswerInitial = function () {
  for (let answer of possibleAnswers) {
    answer.checked = false;
  }
  // Отключаем кнопку
  sendAnswerState(false);
};


// Проверяем, выбран ли хоть один ответ и если выбран, то включаем кнопку
const checkAnswers = function () {
  let answerState = false;
  for (const answer of possibleAnswers) {
    if (answer.checked) {
      answerState = true;
      break;
    }
  }
  // Включаем кнопку
  sendAnswerState(answerState);
};

// Каждому ответу навешиваем листенер изменения с вызвом функции проверки состояния ответов
for (let answer of possibleAnswers) {
  answer.addEventListener(`change`, checkAnswers);
}

// Отрисовываем результат
const clickOnSendAnswer = (event) => {
  event.stopPropagation();
  const result = getRandomElement([resultGood, resultBad]);                     // Выбираем рандомный результат
  renderScreen(result);
  setAnswerInitial();
};

// На кнопку отправки ответа навешиваем листенер по клику, который отрисовыет результат
sendAnswer.addEventListener(`click`, clickOnSendAnswer);

// Экспортируем экран genre
export default levelGenre;
