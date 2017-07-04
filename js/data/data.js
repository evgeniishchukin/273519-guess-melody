export const initialState = Object.freeze({
  'time': 120,
  'lives': 10,
  'currentIndex': 0,
});

export const gameInfo = Object.freeze({
  'gameName': `Угадай Мелодию`,
  'rules': `Правила просты&nbsp;— за&nbsp;${Math.round(initialState.time / 60)} минуты дать
  максимальное количество правильных ответов.<br>
  Удачи!`
});

export const USERNAME = `evgeniyshchukin273519`;
