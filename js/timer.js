import animationObj from './animate';
import formatTime from './time-format';
import initialData from './data/initial-data';
import {stopGame} from './controllers/game-controller';

const redrawCircle = (circle, radius, animation) => {
  const length = 2 * Math.PI * radius;
  const stepLength = length / animation.steps;
  const lengthToClear = stepLength * animation.step;

  circle.setAttributeNS(null, `r`, radius);
  circle.setAttributeNS(null, `stroke-dasharray`, length.toString());
  circle.setAttributeNS(null, `stroke-dashoffset`, lengthToClear.toString());

  return circle;
};

const addLeadingZero = (val) => val < 10 ? `0${val}` : val;

const redrawTimer = (timer, animation) => {
  const total = animation.stepDuration * animation.steps;
  const passed = animation.stepDuration * animation.step;
  const timeLeft = formatTime(total, passed);

  timer.querySelector(`.timer-value-mins`).textContent = addLeadingZero(timeLeft.minutes);
  timer.querySelector(`.timer-value-secs`).textContent = addLeadingZero(timeLeft.seconds);

  return timer;
};

const initializeCountdown = (timeLeft) => {
  const element = document.querySelector(`.timer-line`);
  const radius = parseInt(element.getAttributeNS(null, `r`), 10);
  const timer = document.querySelector(`.timer-value`);

  const step = initialData.time - timeLeft;

  return animationObj.animate(animationObj.getAnimation(step, 1000, initialData.time), (animation) => {
    redrawCircle(element, radius, animation);
    redrawTimer(timer, animation);
  }, () => {
    timer.classList.add(`timer-value--finished`);
    stopGame();
  });
};

export default initializeCountdown;
