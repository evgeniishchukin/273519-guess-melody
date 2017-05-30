const getElementFromTemplate = (temp) => {
  const container = document.createElement(`div`);
  container.innerHTML = temp;
  return container.children[0];
};

export default getElementFromTemplate;
