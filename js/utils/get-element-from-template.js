const getElementFromTemplate = (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template;
  const screen = container.querySelector(`.main`);
  return screen;
};

export default getElementFromTemplate;
