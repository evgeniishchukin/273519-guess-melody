const getRandomElement = (array) => {
  let number = Math.round(Math.random() * (array.length - 1));
  return array[number];
};

export default getRandomElement;
