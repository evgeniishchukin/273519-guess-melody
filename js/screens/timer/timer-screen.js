export default (timeLeft) => {
  const minutes = () => {
    const parameter = Math.floor(timeLeft / 60);

    if (parameter < 10) {
      return `0${parameter}`;
    }
    return parameter;
  };

  const seconds = () => {
    const parameter = Math.ceil(((timeLeft / 60) - Math.floor(timeLeft / 60)) * 60);
    if (parameter === 0) {
      return `00`;
    }
    return parameter;
  };

  const screenTimer = `
      <div class="main-timer">
        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
          <circle cx="390" cy="390" r="370" class="timer-line" style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
        </svg>
        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">${minutes()}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${seconds()}</span>
        </div>
      </div>`;

  return screenTimer;
};
