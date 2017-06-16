import WelcomeView from './welcome-view.js';
import {renderState} from '../main.js';
import * as state from '../controllers/state.js';

const view = new WelcomeView();
view.onStartClick = () => {
  state.showGame();
  renderState();
};

export const show = () => {
  view.create();
  view.show();
};
