import {animate, getAnimation} from '../utils/animate.js';

const redrawCircle = (circle, radius, animation) => {
  const length = 2 * Math.PI * radius;
  const stepLength = length / animation.steps;
  const lengthToClear = stepLength * animation.step;

  circle.setAttributeNS(null, `r`, radius.toString());
  circle.setAttributeNS(null, `stroke-dasharray`, length.toString());
  circle.setAttributeNS(null, `stroke-dashoffset`, lengthToClear.toString());

  return circle;
};

export default function initializeCountdown(timeLeft) {
  const element = document.querySelector(`.timer-line`);
  const radius = parseInt(element.getAttributeNS(null, `r`), 10);
  const timer = document.querySelector(`.timer-value`);

  return animate(getAnimation(120 - timeLeft, 1000, 120), (animation) => {
    redrawCircle(element, radius, animation);
  }, () => {
    return timer.classList.add(`timer-value--finished`);
  });
}
