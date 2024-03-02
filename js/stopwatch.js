document.addEventListener('DOMContentLoaded', () => {
  let stopwatch;
  let stopwatchMinutes = 0;
  let stopwatchSeconds = 0;
  let stopwatchMiliseconds = 99;
  let stopwatchIsCalled = false;

  const updateStopwatchDisplay = () => {
    document.querySelector('.stopwatchMinutes').textContent = stopwatchMinutes.toString().padStart(2, '0');
    document.querySelector('.stopwatchSeconds').textContent = stopwatchSeconds.toString().padStart(2, '0');
    document.querySelector('.stopwatchMiliSeconds').textContent = stopwatchMiliseconds.toString().padStart(2, '0');
  };

  const startStopwatch = () => {
    if(stopwatchIsCalled) return;

    stopwatchIsCalled = true;

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
    clearInterval(flashingInterval)
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMiliseconds = 99;
    document.querySelector('.stopwatchMiliSeconds').innerHTML = '00';
    document.querySelector('.stopwatchSeconds').innerHTML = '00';
    document.querySelector('.stopwatchMinutes').innerHTML = '00';
    document.querySelector('.stopwatchDisplay').style.visibility = 'visible';
    stopwatchIsCalled = false;
  };

  const pauseStopwatch = () => {
    if (!stopwatchIsCalled) return;

    clearInterval(stopwatch);

    flashingInterval = setInterval(() => {
      const display = document.querySelector('.stopwatchDisplay');
      display.style.visibility = (display.style.visibility === 'hidden') ? 'visible' : 'hidden';
    }, 500);
  }

  document.querySelector('#stopwatch').addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest('button');

    if (targetEl.classList.contains('startStopwatch') || parentEl.classList.contains('startStopwatch')) { 
      startStopwatch();
      clearInterval(flashingInterval);
      document.querySelector('.stopwatchDisplay').style.visibility = 'visible';
    };

    if (targetEl.classList.contains('stopStopwatch') || parentEl.classList.contains('stopStopwatch')) {
      pauseStopwatch();
      stopwatchIsCalled = false
    }

    if (targetEl.classList.contains('resetStopwatch') || parentEl.classList.contains('resetStopwatch')) return resetStopwatch();

    if (targetEl.classList.contains('saveTime') || parentEl.classList.contains('saveTime')) {
      console.log('apertou')
    }
  });
})