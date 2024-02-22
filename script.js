const appendMinutes = document.querySelector('.minutes');
const appendSeconds = document.querySelector('.seconds');
const appendMiliseconds = document.querySelector('.miliSeconds');
const userSubmitBtn = document.querySelector('.submitBtn');
const userKeyboardDisplay = document.querySelector('.keyboardDisplay');
const userTimerDisplay = document.querySelector('.timerDisplay');
const userKeyboard = document.querySelector('.keyboardContainer')

let stopwatchMinutes = 0;
let stopwatchSeconds = 0;
let stopwatchMiliseconds = 0;

let stopwatch;
let timer;

// STOPWATCH

function startStopwatchtimer() {
  clearInterval(stopwatch);
  stopwatch = setInterval(startTimer, 10);

  function startTimer() {
    stopwatchMiliseconds++;

    if (stopwatchMiliseconds <= 9) appendMiliseconds.innerHTML = "0" + stopwatchMiliseconds;

    if (stopwatchMiliseconds > 9) appendMiliseconds.innerHTML = stopwatchMiliseconds;

    if (stopwatchMiliseconds > 100) {
      stopwatchSeconds++;
      appendSeconds.innerHTML = "0" + stopwatchSeconds;
      stopwatchMiliseconds = 0;
      appendMiliseconds.innerHTML = "0" + 0;
    };

    if (stopwatchSeconds > 9) appendSeconds.innerHTML = stopwatchSeconds;

    if (stopwatchSeconds > 59) {
      stopwatchSeconds = 0;
      appendSeconds.innerHTML = "00";
      stopwatchMinutes++;
      appendMinutes.innerHTML = "0" + stopwatchMinutes;
    };
  };
};

function resetStopwatch() {
  clearInterval(stopwatch);
  stopwatchMiliseconds = 99;
  stopwatchSeconds = 0;
  stopwatchMinutes = 0;
  appendMiliseconds.innerHTML = '00';
  appendSeconds.innerHTML = '00';
  appendMinutes.innerHTML = '00';
}

function stopStopwatch() {
  clearInterval(stopwatch);
};

// TIMER 

function createTimer(hours, minutes, seconds) {
  document.querySelector('.keyboardContainer').style.display = 'none';

  const timerContainer = document.createElement('article');
  timerContainer.classList.add('timerContainer');

  const timerHeader = document.createElement('div');
  timerHeader.classList.add('timerHeader');
  timerContainer.appendChild(timerHeader);

  const timerTitle = document.createElement('p');
  timerTitle.classList.add('timerTitle');
  timerTitle.innerHTML = `Timer ${hours !== 0 ? `de ${hours}hrs e` : 'de'} ${minutes}m`;
  timerHeader.appendChild(timerTitle);

  const closeTimerBtn = document.createElement('button');
  closeTimerBtn.classList.add('closeTimerBtn');
  closeTimerBtn.innerHTML = '<i class="fa-solid fa-circle-xmark">';
  closeTimerBtn.addEventListener('click', closeTimer)
  timerHeader.appendChild(closeTimerBtn);

  const timerDisplay = document.createElement('div');
  timerDisplay.classList.add('timerDisplay');
  timerDisplay.innerHTML = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  timerContainer.appendChild(timerDisplay);

  const resetTimerBtn = document.createElement('button');
  resetTimerBtn.classList.add('resetTimer');
  resetTimerBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i>';
  resetTimerBtn.addEventListener('click', closeTimer);
  timerContainer.appendChild(resetTimerBtn);

  const toolbar = document.createElement('div');
  toolbar.classList.add('toolbar');
  timerContainer.appendChild(toolbar);

  const accTimerBtn = document.createElement('button');
  accTimerBtn.classList.add('accTimerBtn');
  accTimerBtn.classList.add('myButton');
  accTimerBtn.innerHTML = '+1:00';
  accTimerBtn.addEventListener('click', timerAddMinute);
  toolbar.appendChild(accTimerBtn);

  const startTimerBtn = document.createElement('button');
  startTimerBtn.classList.add('startTimer');
  startTimerBtn.classList.add('myButton');
  startTimerBtn.innerHTML = '<i class="fa-solid fa-play">';
  toolbar.appendChild(startTimerBtn);

  const stopTimer = document.createElement('button');
  stopTimer.classList.add('stopTimer');
  stopTimer.classList.add('myButton');
  stopTimer.innerHTML = '<i class="fa-solid fa-pause">';
  stopTimer.addEventListener('click', pauseTimer);
  toolbar.appendChild(stopTimer);

  const timerSection = document.querySelector('#timer');

  timerSection.appendChild(timerContainer);

  let userTimerDisplay = document.querySelector('.timerDisplay')

  function updateTimer() {
    userTimerDisplay.innerText = `${String(timerHours).padStart(2, '0')}:${String(timerMinutes).padStart(2, '0')}:${String(timerSeconds).padStart(2, '0')}`;
  };

  function timerAddMinute() {
    timerMinutes = parseInt(timerMinutes);
    
    timerMinutes += 1;

    updateTimer();
  };


  function pauseTimer() {
    clearInterval(timer);
    timer = null;
  };

  function closeTimer(e) {
    const targetEl = e.target;
    const parentEl = targetEl.closest('article');

    parentEl.remove();

    userKeyboard.style.display = 'block';
  };

  userArrayDisplay = ['0', '0', '0', '0', '0', '0'];

  userArrayDigitsCount = 0;

  updateUserDisplay();

  userSubmitBtn.style.display = 'none';
};

let arr = ['0', '0', '0', '0', '0', '0'];
let digitsCount = 0;

document.addEventListener('click', (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest('button')
    
  if (targetEl.classList.contains('key')) {
    const keyValue = targetEl.value;

    if (keyValue === '0' && arr.every(num => num === '0')) return;

    if (digitsCount < 6) {
      arr.shift();
      arr.push(keyValue);
      digitsCount++;
      updateUserDisplay()
    };

    if (digitsCount > 0) return userSubmitBtn.style.display = 'block';

    userSubmitBtn.style.display = 'none';
  };
  
  if (targetEl.classList.contains('submitBtn') || parentEl.classList.contains('submitBtn')) {
    let timerValue = arr.join('');
    let timerHours = Math.floor(timerValue / 10000);
    let timerMinutes = Math.floor((timerValue % 10000) / 100);
    let timerSeconds = timerValue % 100;

    if (timerSeconds >= 60) {
      timerMinutes += Math.floor(timerSeconds / 60);
      timerSeconds %= 60;
    };

    if (timerMinutes >= 60) {
      timerHours += Math.floor(timerMinutes / 60);
      timerMinutes %= 60;
    };

    timerMinutes = timerMinutes < 10 ? "0" + timerMinutes : timerMinutes;
    timerSeconds = timerSeconds < 10 ? "0" + timerSeconds : timerSeconds;

    createTimer(timerHours, timerMinutes, timerSeconds)
  };

  if (targetEl.classList.contains('deleteBtn') || parentEl.classList.contains('deleteBtn')) {
    arr.pop();

    arr.unshift('0');

    digitsCount--;

    updateUserDisplay();

    if (digitsCount > 0) return userSubmitBtn.style.display = 'block';

    userSubmitBtn.style.display = 'none';
  };

  if (targetEl.classList.contains('resetBtn') || parentEl.classList.contains('deleteBtn')) {
    arr = ['0', '0', '0', '0', '0', '0'];

    digitsCount = 0;

    updateUserDisplay();

    userSubmitBtn.style.display = 'none';
  };

  if (targetEl.classList.contains('startTimer') || parentEl.classList.contains('startTimer')) {
    document.querySelector('.accTimerBtn').style.display = 'block';

    if (!timer) {
      timer = setInterval(function () {
        updateTimer();

        if (timerSeconds <= 0 && timerMinutes <= 0 && timerHours <= 0) {
          clearInterval(timer);
          timer = null;
          alert("Tempo esgotado!");
        } else if (timerSeconds <= 0) {
          if (timerMinutes > 0) {
            timerMinutes--;
            timerSeconds = 59;
          } else if (timerHours > 0) {
            timerHours--;
            timerMinutes = 59;
            timerSeconds = 59;
          }
        } else {
          timerSeconds--;
        }
      }, 1000);
    };
  }
})

function updateUserDisplay() {
  userKeyboardDisplay.innerText =
  arr.slice(0, 2).join('') + 'h ' +
  arr.slice(2, 4).join('') + 'm ' +
  arr.slice(4, 6).join('') + 's';
};

updateUserDisplay();

// MENU TOGGLE

function showPage(pageNumber) {
  document.getElementById('stopwatch').style.display = pageNumber === 1 ? 'flex' : 'none';
  document.getElementById('timer').style.display = pageNumber === 2 ? 'flex' : 'none';
  document.getElementById('button1').classList.remove('active');
  document.getElementById('button2').classList.remove('active');
  document.getElementById('button' + pageNumber).classList.add('active');
};

showPage(1);