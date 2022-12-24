function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let interval = null;

startButton.addEventListener('click', onStartClick);
stopButton.addEventListener('click', onStopClick);
stopButton.setAttribute('disabled', true);

function onStartClick() {
  interval = setInterval(changeBodyColor, 1000);
  startButton.setAttribute('disabled', true);
  stopButton.removeAttribute('disabled');
}

function onStopClick() {
  clearInterval(interval);
  startButton.removeAttribute('disabled');
  stopButton.setAttribute('disabled', true);
}

function changeBodyColor() {
  body.style.backgroundColor = getRandomHexColor();
}
