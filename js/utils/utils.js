export const getRandomIndexByArrayLength = (length) => {
  return getRandomIndex(length, 1) - 1;
};

export const getRandomIndex = (indexRange, indexStart = 0) => {
  return Math.floor(Math.random() * (indexRange - indexStart + 1)) + indexStart;
};

export const shuffleArray = (array) => {
  let counter = array.length;

  while (counter > 0) {

    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
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
