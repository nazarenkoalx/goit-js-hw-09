import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timeInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const secondsSpan = document.querySelector('span[data-seconds]');
const minutesSpan = document.querySelector('span[data-minutes]');
const hoursSpan = document.querySelector('span[data-hours]');
const daysSpan = document.querySelector('span[data-days]');
let time = null;
startBtn.addEventListener('click', onClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.setAttribute('disabled', true);
    } else {
      startBtn.removeAttribute('disabled');
    }
    time = selectedDates[0];
  },
};

function onClick() {
  timerId = setInterval(() => {
    if (Date.now() >= time) {
      clearInterval(timerId);
      return;
    }

    const calculatedTime = time - Date.now();

    const convertedTime = convertMs(calculatedTime);

    const { days, hours, minutes, seconds } = convertedTime;
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr(timeInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
