export const action = {
  getAnimation: (step, stepDuration, steps) => ({
    step, stepDuration, steps
  }),

  animate: (animation, callback, callbackEnd) => {
    const interval = setInterval(() => {
      const nextStep = animation.step + 1;
      if (nextStep <= animation.steps) {
        animation = action.getAnimation(nextStep, animation.stepDuration, animation.steps);
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
};
