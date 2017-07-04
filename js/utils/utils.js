export const getRandomIndexByArrayLength = (length) => {
  return getRandomIndex(length, 1) - 1;
};

export const getRandomIndex = (indexRange, indexStart = 0) => {
  return Math.floor(Math.random() * (indexRange - indexStart + 1)) + indexStart;
};

export const shuffleArray = (array) => {
  const counter = array.length;

  while (counter > 0) {

    const index = Math.floor(Math.random() * counter);

    counter--;

    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
};

export const preloadAudio = (urls) => {
  return Promise.all(urls.map((url) => new Promise((resolve) => {
    const audio = new Audio();
    audio.addEventListener(`canplaythrough`, resolve, false);
    audio.src = url;
  })));
};

export const getRandomElement = (array) => {
  const number = Math.round(Math.random() * (array.length - 1));
  return array[number];
};

export const deepCopy = (object) => {
  return JSON.parse(JSON.stringify(object));
};

export const getTimeString = (timeStat) => {
  const time = timeStat;

  const mins = Math.floor(time / 60);
  const secs = time - (mins * 60);

  if (mins) {
    return `${mins} минуты ${secs} секунды`;
  } else {
    return `${secs} секунды`;
  }
};

export const show = (element) => {
  const mainScreen = document.querySelector(`.main`);
  mainScreen.innerHTML = ``;
  mainScreen.appendChild(element);
};

export const disableItems = (items) => {
  items.forEach((item) => {
    item.style.pointerEvents = `none`;
  });
};
