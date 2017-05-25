window.main = (function () {
  const template = document.querySelector(`#templates`);                        // Находим template в DOM
  const screensTemplate = template.content.querySelectorAll(`.main`);           // Находим экраны в template
  const main = document.querySelector(`.main`);                                 // Находим элемент в DOM, в который будем вставлять экраны
  const LEFT_ARROW = 37;                                                        // Определяем keyCode левой клавиши
  const RIGHT_ARROW = 39;                                                       // Определяем keyCode правой клавиши
  const screenOrder = [];                                                       // Создаем массим, в котором будут идти экраны по порядку
  let newScreen;                                                                // Создаем элемент куда будем клонировать экраны

  // Создаем функцию которая упакует экраны в массив в правильном порядке
  const addOrederScreensInArray = (orderArray) => {
    orderArray.forEach((item) => {
      screenOrder.push(screensTemplate[item]);
    });
  };

  // Создаем функция вставки экранов в DOM
  const addScreen = (index) => {
    if (main.querySelector(`.main`)) {
      main.querySelector(`.main`).remove();
    }
    newScreen = screenOrder[index].cloneNode(true);
    main.appendChild(newScreen);
  };

  // Запускаем ранее созданные функции
  addOrederScreensInArray([4, 3, 0, 1, 2]);
  addScreen(0);

  // Навешиваем отслеживание нажатия клавиш на document
  document.addEventListener(`keydown`, (event) => {
    if (event.altKey) {
      if (event.keyCode === LEFT_ARROW) {
        for (let i = 0; i < screenOrder.length; i++) {
          if (`${main.querySelector(`.main`).classList}` === `${screenOrder[i].classList}`) {
            i = i - 1;
            if (i < 0) {
              addScreen(4);
              return;
            } else {
              addScreen(i);
              return;
            }
          }
        }
      } else if (event.keyCode === RIGHT_ARROW) {
        for (let i = 0; i < screenOrder.length; i++) {
          if (`${main.querySelector(`.main`).classList}` === `${screenOrder[i].classList}`) {
            i = i + 1;
            if (i > 4) {
              addScreen(0);
              return;
            } else {
              addScreen(i);
              return;
            }
          }
        }
      }
    }
  });


})();
