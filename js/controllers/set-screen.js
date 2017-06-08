import scoring from '../data/scoring';
import getRandomElement from '../utils/get-random-element';
import renderScreen from '../utils/render-screen';
import welcome from '../screens/welcome';
import levelArtist from '../screens/level-artist';
import levelGenre from '../screens/level-genre';
import result from '../screens/result';

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
    songsSet.add(getRandomItem(scoring.songs));
  }
  const songs = [...songsSet];
  return songs;
};

const generateLevelArtist = () => {
  const songs = createStackSong(3);
  const trueSong = choiceCurrentAnswer(songs);
  renderScreen(levelArtist(songs, trueSong));
};

const generateLevelGenre = () => {
  const songs = createStackSong(4);
  const trueSong = choiceCurrentAnswer(songs);
  renderScreen(levelGenre(songs, trueSong));
};

const setScreen = (answer) => {
  if (answer) {
    ++scoring.totalScore;
  }
  if (scoring.curentQuestion === 0) {
    renderScreen(welcome());
    ++scoring.curentQuestion;
    scoring.totalScore = 0;
    return;
  } else if (scoring.curentQuestion > scoring.maxQuestions) {
    if (scoring.totalScore > 0) {
      renderScreen(result(`good`, scoring.totalScore));
    } else {
      renderScreen(result(`bad`));
    }
    scoring.curentQuestion = 0;
  } else {
    const levelQuestion = getRandomElement([generateLevelArtist, generateLevelGenre]);
    levelQuestion();
    ++scoring.curentQuestion;
  }
};

export default setScreen;
