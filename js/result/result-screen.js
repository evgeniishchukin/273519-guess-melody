import {renderState} from '../main.js';
import * as state from '../controllers/state.js';
import ResultSuccessView from './result-success-view.js';
import ResultFailView from './result-fail-view.js';

const successView = new ResultSuccessView();
const failView = new ResultFailView();

const restart = () => {
  state.resetGame();
  renderState();
};

successView.onRestartClick = restart;
failView.onRestartClick = restart;

export const show = () => {
  if (state.isFail()) {
    failView.create();
    failView.show();
  } else {
    successView.create();
    successView.show();
  }
};
