import GameArtistView from './game-artist-view.js';
import GameGenreView from './game-genre-view.js';
import {renderState} from '../main.js';
import * as state from '../controllers/state.js';

const artistView = new GameArtistView();
const genreView = new GameGenreView();

const onAnswer = (...answerIndexes) => {
  state.answer(...answerIndexes);
  renderState();
};

artistView.onAnswer = onAnswer;
genreView.onAnswer = onAnswer;

export const show = () => {

  switch (state.getCurrentQuestion().type) {
    case state.ARTIST_QUESTION_TYPE:
      artistView.create();
      artistView.show();
      window.initializeCountdown();
      break;
    case state.GENRE_QUESTION_TYPE:
      genreView.create();
      genreView.show();
      window.initializeCountdown();
      break;
  }
};
