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

export const deepCopy = (object) => {
  return JSON.parse(JSON.stringify(object));
};
