const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
let intervalColor = null;

buttonStop.setAttribute('disabled', '');

buttonStart.addEventListener('click', onButtonStart);
buttonStop.addEventListener('click', onButtonStop);

function onButtonStart() {
  onToggelBtnActivity();
  changeColorBody();

  intervalColor = setInterval(changeColorBody, 1000);
}


function onButtonStop() {
  clearInterval(intervalColor);

  onToggelBtnActivity();
}

function changeColorBody() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function onToggelBtnActivity() {
  buttonStart.toggleAttribute('disabled');
  buttonStop.toggleAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
