const appBlock = document.querySelector(`.app`);
let current = null;

const renderScreen = (template) => {
  current = appBlock.querySelector(`.main`);
  appBlock.replaceChild(template, current);
};

export default renderScreen;
