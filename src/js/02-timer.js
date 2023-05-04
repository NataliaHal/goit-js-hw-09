import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const dataSecs = document.querySelector('[data-seconds]');
const dataMins = document.querySelector('[data-minutes]');
const dataHours = document.querySelector('[data-hours]');
const dataDays = document.querySelector('[data-days]');

let intervalId = null;

button.setAttribute('disabled', 'disabled');

const onPress = () => {
  intervalId = setInterval(() => {
    const currentDate = new Date(input.value);
    const time = currentDate - Date.now();
    const convertTime = convertMs(time);
    updateClockFace(convertTime);
    if (time <= 1000) {
      clearInterval(intervalId);
    }
  }, 1000);

  button.setAttribute('disabled', 'disabled');
};
const options = {
  isActive: false,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
  },

  onChange(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', 'disabled');
    }
  },
};



function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMins.textContent = addLeadingZero(minutes);
  dataSecs.textContent = addLeadingZero(seconds);
}

flatpickr(input, options);

button.addEventListener('click', onPress);

function convertMs(ms) {
 
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const hours = Math.floor((ms % day) / hour);
  const days = Math.floor(ms / day); 
  
 
  
 
  return { days, hours, minutes, seconds };
}