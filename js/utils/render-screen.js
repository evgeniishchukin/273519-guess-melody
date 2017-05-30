const appBlock = document.querySelector(`.app`);
let current = null;

const renderScreen = (temp) => {
  current = appBlock.querySelector(`.main`);
  appBlock.replaceChild(temp, current);
};

export default renderScreen;
