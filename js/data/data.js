export const initStat = Object.freeze([
  {time: 20, answers: 10},
  {time: 32, answers: 10},
  {time: 44, answers: 10},
  {time: 20, answers: 8},
  {time: 50, answers: 7}
]);

export const initialState = Object.freeze({
  'time': 120,
  'lives': 3,
  'currentIndex': 0,
});

export const gameInfo = Object.freeze({
  'gameName': `Угадай Мелодию`,
  'rules': `Правила просты&nbsp;— за&nbsp;${Math.round(initialState.time / 60)} минуты дать
  максимальное количество правильных ответов.<br>
  Удачи!`
});

export const USERNAME = `evgeniyshchukin273519`;
