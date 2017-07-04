import AbstractView from './abstract-view.js';
import {gameInfo} from '../data/data.js';

class PreloaderView extends AbstractView {

  get template() {
    return (
      `<section class="main main--welcome">
        <section class="logo" title="${gameInfo.gameName}">
          <h1>${gameInfo.gameName}</h1>
        </section>
        <p style="color: black;">Ожидайте загрузки песен</p>
        <h2 class="title main-title">Правила игры</h2>
        <p class="text main-text">
          ${gameInfo.rules}
        </p>
      </section>`
    );
  }
}

export default new PreloaderView();
