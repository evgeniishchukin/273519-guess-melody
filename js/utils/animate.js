export function getAnimation(step, stepDuration, steps) {
  return {
    step,
    stepDuration,
    steps
  };
}

export function animate(animation, callback, callbackEnd) {
  const interval = setInterval(() => {
    const nextStep = animation.step + 1;
    if (nextStep <= animation.steps) {
      animation = getAnimation(nextStep, animation.stepDuration, animation.steps);
      callback(animation);
    } else {
      stopFn();
      if (typeof callbackEnd === `function`) {
        callbackEnd();
      }
    }
  }, animation.stepDuration);

  const stopFn = () => {
    return clearInterval(interval);
  };

  return stopFn;
}
