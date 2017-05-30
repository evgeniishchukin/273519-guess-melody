(() => {
  const template = document.querySelector(`#templates`);
  const screensTemplates = template.content.querySelectorAll(`.main`);
  const appBlock = document.querySelector(`.app`);
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;
  const screensArray = [];
  let screenIndex = null;

  const showScreen = (index) => {
    appBlock.removeChild(appBlock.firstChild);
    let newScreen = screensArray[index].cloneNode(true);
    appBlock.insertBefore(newScreen, appBlock.firstChild);
    screenIndex = index;
    return screenIndex;
  };

  [4, 3, 0, 1, 2].map((name) => {
    screensArray.push(screensTemplates[name]);
  });

  showScreen(0);

  document.addEventListener(`keyup`, (event) => {
    if (event.altKey) {
      switch (event.keyCode) {
        case (LEFT_ARROW):
          if (screenIndex !== 0) {
            screenIndex--;
            showScreen(screenIndex);
          }
          break;

        case (RIGHT_ARROW):
          if (screenIndex !== 4) {
            screenIndex++;
            showScreen(screenIndex);
          }
          break;

        default:
          break;
      }
    }
  });
})();
