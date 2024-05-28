import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

function startTimer(elems, milliseconds) {
  const timerId = setInterval(() => {
    if (milliseconds > 0) {
      printTime(elems, convertMs(milliseconds));
      milliseconds -= 1000;
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

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

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

function printTime(elemsList, datetime) {
  for (const element of elemsList) {
    element.data.textContent = addLeadingZero(datetime[element.type]);
  }
}

(() => {
  const daysElem = document.querySelector(".value[data-days]");
  const hoursElem = document.querySelector(".value[data-hours]");
  const minutesElem = document.querySelector(".value[data-minutes]");
  const secondsElem = document.querySelector(".value[data-seconds]");
  const startBtn = document.querySelector("button[data-start]");
  const myInput = document.querySelector("#datetime-picker");
  const elemsList = [
    {
      data: daysElem,
      type: "days",
    },
    {
      data: hoursElem,
      type: "hours",
    },
    {
      data: minutesElem,
      type: "minutes",
    },
    {
      data: secondsElem,
      type: "seconds",
    },
  ];

  let isTimerStarted = false;
  startBtn.disabled = true;

  flatpickr(myInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const diff = selectedDates[0].getTime() - new Date().getTime();

      if (diff > 0 && !isTimerStarted) {
        startBtn.disabled = false;

        startBtn.addEventListener("click", () => {
          startTimer(elemsList, diff);
          isTimerStarted = true;
          startBtn.disabled = true;
        });
      } else {
        startBtn.disabled = true;
        if (isTimerStarted) {
          window.alert("Timer is already started!");
        } else {
          window.alert("Please choose a date in the future");
        }
      }
    },
  });
})();
