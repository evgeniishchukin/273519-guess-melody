export const ARTIST_QUESTION_TYPE = 1;
export const GENRE_QUESTION_TYPE = 2;
export const QUESTION_TYPES = [ARTIST_QUESTION_TYPE, GENRE_QUESTION_TYPE];

export const MAX_QUESTIONS = 4;

export const initStat = Object.freeze([
  {time: 20, answers: 10},
  {time: 32, answers: 10},
  {time: 44, answers: 10},
  {time: 20, answers: 8},
  {time: 50, answers: 7}
]);

export const initialState = Object.freeze({
  'time': 120,
  'lifes': 3,
  'currentIndex': 0,
});

export const gameInfo = Object.freeze({
  'gameName': `Угадай Мелодию`,
  'rules': `Правила просты&nbsp;— за&nbsp;${Math.round(initialState.time / 60)} минуты дать
  максимальное количество правильных ответов.<br>
  Удачи!`
});

export const artistsData = [
  {
    name: `Би-2`,
    genre: `Rock`,
    description: `Rock`,
    song: `Молитва`,
    file: `./sound/1.mp3`,
    image: `./img/artists/bi-2.jpg`
  },
  {
    name: `Краски`,
    genre: `Pop`,
    description: `Pop`,
    song: `Оранжевое солнце`,
    file: `./sound/2.mp3`,
    image: `./img/artists/kraski.jpg`
  },
  {
    name: `Мельница`,
    genre: `Folk`,
    description: `Folk`,
    song: `Огонь`,
    file: `./sound/3.mp3`,
    image: `./img/artists/melnica.jpg`
  },
  {
    name: `Noize MC`,
    genre: `Rap`,
    description: `Rap`,
    song: `Вселенная бесконечна`,
    file: `./sound/4.mp3`,
    image: `./img/artists/noize-mc.jpg`
  }
];
