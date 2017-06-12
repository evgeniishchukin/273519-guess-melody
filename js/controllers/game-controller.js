import initialData from '../data/initial-data';
import songsData from '../data/songs-data';
import statistics from '../data/statistics';
import getRandomElement from '../utils/get-random-element';
import renderScreen from '../utils/render-screen';
import welcome from '../screens/welcome';
import levelArtist from '../screens/level-artist';
import levelGenre from '../screens/level-genre';
import result from '../screens/result';
import initializeCountdown from '../timer';

let actualGameData = {};

const getRandomItem = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const choiceCurrentAnswer = (songs) => {
  return getRandomItem(songs);
};

const createStackSong = (quantity) => {
  const songsSet = new Set();
  for (; songsSet.size < quantity;) {
    songsSet.add(getRandomItem(songsData));
  }
  const songs = [...songsSet];
  return songs;
};

const generateLevelArtist = (timeLeft) => {
  const songs = createStackSong(3);
  const trueSong = choiceCurrentAnswer(songs);
  renderScreen(levelArtist(songs, trueSong, timeLeft));
};

const generateLevelGenre = (timeLeft) => {
  const songs = createStackSong(4);
  const trueSong = choiceCurrentAnswer(songs);
  renderScreen(levelGenre(songs, trueSong, timeLeft));
};

const setWelcomeScreen = () => {
  renderScreen(welcome());
};

const setGameScreen = (timeLeft) => {
  const screenLevelQuest = getRandomElement([generateLevelArtist, generateLevelGenre]);
  screenLevelQuest(timeLeft);
};

const statisticsResult = (time, score) => {
  const myStatistics = {time, score};
  const newStatistics = statistics.slice();
  newStatistics.push(myStatistics);
  newStatistics.sort((a, b) => {
    return b.score - a.score || a.time - b.time;
  });
  return Math.trunc(((newStatistics.length - newStatistics.indexOf(myStatistics)) / newStatistics.length) * 100);
};

const setResultScreen = () => {
  renderScreen(result(actualGameData.score, actualGameData.time, statisticsResult(actualGameData.time, actualGameData.score)));
};

const switchScreen = (timeLeft) => {
  if (timeLeft) {
    actualGameData.time = timeLeft;
  }

  switch (actualGameData.screen) {
    case `window`:
      setWelcomeScreen();
      break;
    case `level`:
      setGameScreen(actualGameData.time);
      initializeCountdown(actualGameData.time);
      break;
    case `result`:
      setResultScreen();
      break;
  }
};

const stopGame = () => {
  actualGameData.screen = `result`;
  switchScreen();
};

const startGame = () => {
  actualGameData = {
    screen: initialData.screen,
    maxQuestions: initialData.maxQuestions,
    time: initialData.time,
    lives: initialData.lives,
    score: initialData.score,
  };
  actualGameData.screen = `level`;
  switchScreen();
};

const onQuestionAnswered = (answer, timeLeft) => {
  actualGameData.maxQuestions--;
  if (answer) {
    actualGameData.score++;
  } else {
    actualGameData.lives--;
  }
  if (actualGameData.lives === 0 || actualGameData.maxQuestions === 0) {
    stopGame();
    return;
  }
  switchScreen(timeLeft);
};

const onRepeatGame = () => {
  actualGameData.screen = `window`;
  switchScreen();
};

export {setWelcomeScreen};
export {startGame};
export {onQuestionAnswered};
export {onRepeatGame};
export {stopGame};
