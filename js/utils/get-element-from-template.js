const getElementFromTemplate = (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template;
  return container.children[0];
};

export default getElementFromTemplate;
