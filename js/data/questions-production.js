import {getRandomElement} from '../utils/utils.js';
import * as dataInit from './data.js';

const createArtistAnswer = (valid, artist) => {
  return {'valid': valid, 'artistName': artist.name, 'image': artist.image};
};

const createGenreAnswer = (valid, song) => {
  return {'valid': valid, 'song': song.song, 'file': song.file};
};

const questions = [];

const createQuestion = (type, data, answers) => {
  questions.push({
    'type': type,
    'data': data,
    'answers': answers
  });
};

let i = 0;
while (i < dataInit.MAX_QUESTIONS) {
  let data = {};
  let answers = [];
  let answerValue;
  const type = getRandomElement(dataInit.QUESTION_TYPES);
  if (type === 1) {
    const artist = getRandomElement(dataInit.artistsData);
    data = {
      'artistName': artist.name,
      'song': artist.song,
      'file': artist.file,
      'genre': artist.genre
    };
    answers = dataInit.artistsData.map((item, index) => {
      if (item.name === data.artistName) {
        answerValue = true;
      } else {
        answerValue = false;
      }
      return createArtistAnswer(answerValue, item);
    });
  } else {
    const genre = getRandomElement(dataInit.artistsData);
    data = {
      'genreName': genre.genre,
      'description': genre.description
    };
    answers = dataInit.artistsData.map((item) => {
      if (item.genre === data.genreName) {
        answerValue = true;
      } else {
        answerValue = false;
      }
      return createGenreAnswer(answerValue, item);
    });
  }
  createQuestion(type, data, answers);
  i++;
}

export function getTempData() {
  return questions;
}
