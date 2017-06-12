const getTimeFromScreen = () => {
  const minutes = parseInt(document.querySelector(`.timer-value-mins`).textContent, 10);
  const seconds = parseInt(document.querySelector(`.timer-value-secs`).textContent, 10);

  const timeLeft = minutes * 60 + seconds;

  return timeLeft;
};

export default getTimeFromScreen;
