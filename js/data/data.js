import * as gameState from '../controllers/state.js';

const initStatistics = Object.freeze([
  {time: 20, answers: 10},
  {time: 32, answers: 10},
  {time: 44, answers: 10},
  {time: 20, answers: 8},
  {time: 50, answers: 7}
]);

export const gameInfo = Object.freeze({
  'gameName': `Угадай Мелодию`,
  'rules': `Правила просты&nbsp;— за&nbsp;${Math.round(gameState.initState.time / 60)} минуты дать
  максимальное количество правильных ответов.<br>
  Удачи!`
});

export const getPercentHighscore = (correctAnswers) => {
  const stats = Object.assign([], initStatistics);
  stats.push({answers: correctAnswers, time: gameState.getGameTime(), isPlayerResult: true});

  stats.sort((a, b) => {
    return b.answers - a.answers || a.time - b.time;
  });

  const playerIndex = stats.findIndex((item) => {
    if (item.isPlayerResult) {
      return true;
    }

    return false;
  });

  const result = 100 - ((playerIndex + 1) / stats.length) * 100;
  return Math.floor(result) + `%`;
};
