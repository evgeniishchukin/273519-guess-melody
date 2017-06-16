import * as state from './controllers/state.js';
import * as welcomeScreen from './welcome/welcome.js';
import * as gameScreen from './game/game-screen.js';
import * as resultScreen from './result/result-screen.js';

export const renderState = () => {

  switch (state.getCurrentState()) {
    case state.WELCOME_SCREEN:
      welcomeScreen.show();
      break;
    case state.GAME_SCREEN:
      gameScreen.show();
      break;
    case state.RESULT_SCREEN:
      resultScreen.show();
      break;
  }
};

renderState();
