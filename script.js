document.addEventListener('DOMContentLoaded', function () {
  let arr = ['0', '0', '0', '0', '0', '0'];
  let digitsCount = 0;
  let stopwatch;
  let timer
  let stopwatchMinutes = 0;
  let stopwatchSeconds = 0;
  let stopwatchMiliseconds = 99;
  let timerHours;
  let timerMinutes;
  let timerSeconds;
  let timerIsCalled = false;
  let stopwatchIsCalled = false;

  // Relógio

  const updateClock = () => {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let daysOfWeek = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
    let dayOfWeek = daysOfWeek[now.getDay() - 1];
    let monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    let monthName = monthNames[now.getMonth()];
    
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    document.querySelector(".clock").innerHTML = hours + ":" + minutes;
    document.querySelector(".date").innerHTML = dayOfWeek + ", " + now.getDate() + " de " + monthName;;
  }

  // Cronômetro

  const updateStopwatchDisplay = () => {
    document.querySelector('.stopwatchMinutes').textContent = stopwatchMinutes.toString().padStart(2, '0');
    document.querySelector('.stopwatchSeconds').textContent = stopwatchSeconds.toString().padStart(2, '0');
    document.querySelector('.stopwatchMiliSeconds').textContent = stopwatchMiliseconds.toString().padStart(2, '0');
  }

  const startStopwatch = () => {
    if(stopwatchIsCalled) return;

    stopwatchIsCalled = true;

    if(!stopwatchIsCalled) return;

    stopwatch = setInterval(function () {
      stopwatchMiliseconds++;

      if (stopwatchMiliseconds > 99) {
        stopwatchSeconds++;
        stopwatchMiliseconds = 0;
      }

      if (stopwatchSeconds > 59) {
        stopwatchMinutes++;
        stopwatchSeconds = 0
      }

      if (stopwatchMinutes > 59) {
        clearInterval(stopwatch)
        alert('Timer complete!')
        stopwatchIsCalled = false;
      }
      updateStopwatchDisplay()
    }, 10);
  };

  const resetStopwatch = () => {
    clearInterval(stopwatch);
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMiliseconds = 99;
    document.querySelector('.stopwatchMiliSeconds').innerHTML = '00';
    document.querySelector('.stopwatchSeconds').innerHTML = '00';
    document.querySelector('.stopwatchMinutes').innerHTML = '00';
  }

  // Timer

  const updateKeyboardDisplay = () => {
    document.querySelector('.keyboardDisplay').innerText =
      arr.slice(0, 2).join('') + 'h ' +
      arr.slice(2, 4).join('') + 'm ' +
      arr.slice(4, 6).join('') + 's';
  };

  const updateTimerDisplay = () => {
    document.querySelector('.timerHours').textContent = timerHours.toString().padStart(2, '0');
    document.querySelector('.timerMinutes').textContent = timerMinutes.toString().padStart(2, '0');
    document.querySelector('.timerSeconds').textContent = timerSeconds.toString().padStart(2, '0');
  };

  const createTimer = () => {
    document.querySelector('.keyboardContainer').style.display = 'none';

    const timerContainer = document.createElement('article');
    timerContainer.classList.add('timerContainer');

    const timerHeader = document.createElement('div');
    timerHeader.classList.add('timerHeader');
    timerContainer.appendChild(timerHeader);

    const timerTitle = document.createElement('p');
    timerTitle.classList.add('timerTitle');
    timerTitle.innerHTML = `Timer ${timerHours !== 0 ? `de ${timerHours}hrs e` : 'de'} ${timerMinutes}m`;
    timerHeader.appendChild(timerTitle);

    const closeTimerBtn = document.createElement('button');
    closeTimerBtn.classList.add('closeTimerBtn');
    closeTimerBtn.innerHTML = '<i class="fa-solid fa-circle-xmark">';
    timerHeader.appendChild(closeTimerBtn);

    const timerDisplay = document.createElement('div');
    timerDisplay.classList.add('timerDisplay');
    timerDisplay.innerHTML = `
      <span class="timerHours">${timerHours}</span>:
      <span class="timerMinutes">${timerMinutes}</span>:
      <span class="timerSeconds">${timerSeconds}</span>
    `;
    timerContainer.appendChild(timerDisplay);

    const resetTimerBtn = document.createElement('button');
    resetTimerBtn.classList.add('resetTimer');
    resetTimerBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i>';
    timerContainer.appendChild(resetTimerBtn);

    const toolbar = document.createElement('div');
    toolbar.classList.add('toolbar');
    timerContainer.appendChild(toolbar);

    const accTimerBtn = document.createElement('button');
    accTimerBtn.classList.add('accTimer');
    accTimerBtn.innerHTML = '+1:00';
    toolbar.appendChild(accTimerBtn);

    const startTimerBtn = document.createElement('button');
    startTimerBtn.classList.add('startTimer');
    startTimerBtn.innerHTML = '<i class="fa-solid fa-play">';
    toolbar.appendChild(startTimerBtn);

    const stopTimer = document.createElement('button');
    stopTimer.classList.add('stopTimer');
    stopTimer.innerHTML = '<i class="fa-solid fa-pause">';
    toolbar.appendChild(stopTimer);

    const timerSection = document.querySelector('#timer');
    timerSection.appendChild(timerContainer);

    updateKeyboardDisplay();

    document.querySelector('.submitBtn').style.display = 'none';
  };

  const startTimer = () => {
    if(!timerIsCalled) return;
    timer = setInterval(function () {
      timerSeconds--;

      if (timerSeconds < 0) {
        timerMinutes--;
        timerSeconds = 59;
      }

      if (timerMinutes < 0) {
        timerHours--;
        timerMinutes = 59;
      }

      if (timerHours < 0) {
        timerIsCalled = false;
        clearInterval(timer);
        timerHours = 0;
        timerMinutes = 0;
        timerSeconds = 0;
        alert("Timer complete!");
      }
      updateTimerDisplay();
    }, 1000);
  };

  // Eventos
  
  document.querySelector('.nav').addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest('button');

    if (targetEl.classList.contains('clockNavBtn') || parentEl.classList.contains('clockNavBtn')) {
      document.querySelector('#clock').style.display = 'flex';
      document.querySelector('#stopwatch').style.display = 'none';
      document.querySelector('#timer').style.display = 'none';
      
      document.querySelector('.clockIcon').classList.add('active');
      document.querySelector('.stopwatchIcon').classList.remove('active');
      document.querySelector('.timerIcon').classList.remove('active');
    };

    if (targetEl.classList.contains('stopwatchNavBtn') || parentEl.classList.contains('stopwatchNavBtn')) {
      document.querySelector('#clock').style.display = 'none';
      document.querySelector('#stopwatch').style.display = 'flex';
      document.querySelector('#timer').style.display = 'none';
      
      document.querySelector('.clockIcon').classList.remove('active');
      document.querySelector('.stopwatchIcon').classList.add('active');
      document.querySelector('.timerIcon').classList.remove('active');
    };

    if (targetEl.classList.contains('timerNavBtn') || parentEl.classList.contains('timerNavBtn')) {
      document.querySelector('#clock').style.display = 'none';
      document.querySelector('#stopwatch').style.display = 'none';
      document.querySelector('#timer').style.display = 'flex';

      document.querySelector('.clockIcon').classList.remove('active');
      document.querySelector('.stopwatchIcon').classList.remove('active');
      document.querySelector('.timerIcon').classList.add('active');
    };
  });

  document.querySelector('#stopwatch').addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest('button');

    if (targetEl.classList.contains('startStopwatch') || parentEl.classList.contains('startStopwatch')) return startStopwatch();

    if (targetEl.classList.contains('stopStopwatch') || parentEl.classList.contains('stopStopwatch')) return clearInterval(stopwatch);

    if (targetEl.classList.contains('stopStopwatch') || parentEl.classList.contains('stopStopwatch')) {
      clearInterval(stopwatch)
      stopwatchIsCalled = false;
    };

    if (targetEl.classList.contains('resetStopwatch') || parentEl.classList.contains('resetStopwatch')){
      resetStopwatch();
      stopwatchIsCalled = false;
    }
  });

  document.querySelector('#timer').addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest('button');

    if (targetEl.classList.contains('key')) {
      if (targetEl.value === '0' && arr.every(num => num === '0')) return;

      if (digitsCount < 6) {
        arr.shift();
        arr.push(targetEl.value);
        digitsCount++;
        updateKeyboardDisplay()
      };

      if (digitsCount > 0) return document.querySelector('.submitBtn').style.display = 'block';

      document.querySelector('.submitBtn').style.display = 'none';
    };

    if (targetEl.classList.contains('submitBtn') || parentEl.classList.contains('submitBtn')) {
      let timerValue = arr.join('');
      timerHours = Math.floor(timerValue / 10000);
      timerMinutes = Math.floor((timerValue % 10000) / 100);
      timerSeconds = timerValue % 100;

      if (timerSeconds >= 60) {
        timerMinutes += Math.floor(timerSeconds / 60);
        timerSeconds %= 60;
      };

      if (timerMinutes >= 60) {
        timerHours += Math.floor(timerMinutes / 60);
        timerMinutes %= 60;
      };

      timerHours = timerHours < 10 ? "0" + timerHours : timerHours;
      timerMinutes = timerMinutes < 10 ? "0" + timerMinutes : timerMinutes;
      timerSeconds = timerSeconds < 10 ? "0" + timerSeconds : timerSeconds;

      createTimer();
    };

    if (targetEl.classList.contains('deleteBtn') || parentEl.classList.contains('deleteBtn')) {
      arr.pop();

      arr.unshift('0');

      digitsCount--;

      updateKeyboardDisplay();

      if (digitsCount > 0) return document.querySelector('.submitBtn').style.display = 'block';

      document.querySelector('.submitBtn').style.display = 'none';
    };

    if (targetEl.classList.contains('resetTimer') || parentEl.classList.contains('resetTimer')) {
      clearInterval(timer);
      timerIsCalled = false;
      arr = ['0', '0', '0', '0', '0', '0'];
      digitsCount = 0;
      const parentEl = targetEl.closest('article');
      parentEl.remove();
      updateKeyboardDisplay();
      document.querySelector('.keyboardContainer').style.display = 'block';
    };

    if (targetEl.classList.contains('startTimer') || parentEl.classList.contains('startTimer')) {
      document.querySelector('.accTimer').style.display = 'block';
      if (timerIsCalled) return;
      timerIsCalled = true;
      startTimer()
    };

    if (targetEl.classList.contains('closeTimerBtn') || parentEl.classList.contains('closeTimerBtn')) {
      clearInterval(timer);
      timerIsCalled = false;
      arr = ['0', '0', '0', '0', '0', '0'];
      digitsCount = 0;
      const parentEl = targetEl.closest('article');
      parentEl.remove();
      updateKeyboardDisplay();
      document.querySelector('.keyboardContainer').style.display = 'block';
    };

    if (targetEl.classList.contains('accTimer') || parentEl.classList.contains('accTimer')) {
      timerMinutes = parseInt(timerMinutes);

      timerMinutes += 1;

      updateTimerDisplay()
    };

    if (targetEl.classList.contains('stopTimer') || parentEl.classList.contains('stopTimer')) {
      clearInterval(timer);
      timerIsCalled = false;
    }
  });

  document.querySelector('#stopwatch').style.display = 'flex';
  document.querySelector('.stopwatchIcon').classList.add('active');

  setInterval(updateClock, 1000);

  updateClock();
  updateKeyboardDisplay();
});