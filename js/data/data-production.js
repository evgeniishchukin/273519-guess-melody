const maxQuestions = 10;
const artistsData = [
  {
    name: `Би-2`,
    genre: `Rock`,
    description: `все рок`,
    song: `Молитва`,
    file: `./sound/1.mp3`,
    image: `./img/artists/bi-2.jpg`
  },
  {
    name: `Краски`,
    genre: `Pop`,
    description: `все поп`,
    song: `Оранжевое солнце`,
    file: `./sound/2.mp3`,
    image: `./img/artists/kraski.jpg`
  },
  {
    name: `Мельница`,
    genre: `Folk`,
    description: `все фолк`,
    song: `Анестезия`,
    file: `./sound/3.mp3`,
    image: `./img/artists/melnica.jpg`
  },
  {
    name: `Noize MC`,
    genre: `Rap`,
    description: `все рэп`,
    song: `Вселенная бесконечна`,
    file: `./sound/4.mp3`,
    image: `./img/artists/noize-mc.jpg`
  }
];

const questionType = [1, 2];

const getRandomElement = (array) => {
  const number = Math.round(Math.random() * (array.length - 1));
  return array[number];
};

const createArtistAnswer = (valid, artist) => {
  return {'valid': valid, 'artistName': artist.name, 'image': artist.image};
};

const createGenreAnswer = (valid, song) => {
  return {'valid': valid, 'song': song.song, 'file': song.file};
};

const questions = [];

const createQuestion = (type, data, answers) => {
  questions.push({
    'type': type,
    'data': data,
    'answers': answers
  });
};

let i = 0;
while (i < maxQuestions) {
  let data = {};
  const answers = [];
  const type = getRandomElement(questionType);
  if (type === 1) {
    const artist = getRandomElement(artistsData);
    data = {
      'artistName': artist.name,
      'song': artist.song,
      'file': artist.file,
      'genre': artist.genre
    };
    artistsData.forEach((item) => {
      if (item.name === data.artistName) {
        answers.push(createArtistAnswer(true, item));
      } else {
        if (answers.length !== 3) {
          answers.push(createArtistAnswer(false, item));
        }
      }
    });
  } else {
    const genre = getRandomElement(artistsData);
    data = {
      'genreName': genre.genre,
      'description': genre.description
    };
    artistsData.forEach((item) => {
      if (item.genre === data.genreName) {
        answers.push(createGenreAnswer(true, item));
      } else {
        answers.push(createGenreAnswer(false, item));
      }
    });
  }
  createQuestion(type, data, answers);
  i++;
}

export function getTempData() {
  return questions;
}
