document.addEventListener('DOMContentLoaded', () => {
  let stopwatch;
  let stopwatchMinutes = 0;
  let stopwatchSeconds = 0;
  let stopwatchMiliseconds = 99;
  let stopwatchIsCalled = false;
  let timesArr = new Array();
  let flashingInterval;

  const deleteTime = (index) => {
    timesArr.splice(index, 1);
    updateList();
  }

  const updateList = () => {
    const timesContainer = document.querySelector('.times');
    // limpa o conteudo antes de executar o forEach
    timesContainer.innerHTML = '';

    timesArr.forEach((time, index) => {
      // cria o elemento para guardar o tempo
      const timeEl = document.createElement('li');
      timeEl.classList.add('timeElement');
      timesContainer.appendChild(timeEl);

      // cria o elemento do numero do timer
      const timeNumber = document.createElement('p');
      timeNumber.textContent = `N°${index + 1}`;
      timeEl.appendChild(timeNumber);

      // cria o elemento com o tempo
      const currentTime = document.createElement('p');
      currentTime.textContent = `${time}`;
      timeEl.appendChild(currentTime);

      // cria o botão de deletar
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      timeEl.appendChild(deleteBtn);
      deleteBtn.addEventListener('click', () => deleteTime(index));
    });
  };

  const updateStopwatchDisplay = () => {
    document.querySelector('.stopwatchMinutes').textContent = stopwatchMinutes.toString().padStart(2, '0');
    document.querySelector('.stopwatchSeconds').textContent = stopwatchSeconds.toString().padStart(2, '0');
    document.querySelector('.stopwatchMiliSeconds').textContent = stopwatchMiliseconds.toString().padStart(2, '0');
  };

  document.querySelector('#stopwatch').addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest('button');

    if (targetEl.classList.contains('startStopwatch') || parentEl.classList.contains('startStopwatch')) {
      document.querySelector('.saveTime').style.display = 'block';

      if (stopwatchIsCalled) return;

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

      clearInterval(flashingInterval);
      document.querySelector('.stopwatchDisplay').style.visibility = 'visible';
    };

    if (targetEl.classList.contains('stopStopwatch') || parentEl.classList.contains('stopStopwatch')) {
      document.querySelector('.saveTime').style.display = 'none';

      if (!stopwatchIsCalled) return;

      stopwatchIsCalled = false;

      clearInterval(stopwatch);

      flashingInterval = setInterval(() => {
        const display = document.querySelector('.stopwatchDisplay');
        display.style.visibility = (display.style.visibility === 'hidden') ? 'visible' : 'hidden';
      }, 500);
    };

    if (targetEl.classList.contains('resetStopwatch') || parentEl.classList.contains('resetStopwatch')) {
      clearInterval(stopwatch);
      clearInterval(flashingInterval);
      stopwatchMinutes = 0;
      stopwatchSeconds = 0;
      stopwatchMiliseconds = 99;
      document.querySelector('.stopwatchMiliSeconds').innerHTML = '00';
      document.querySelector('.stopwatchSeconds').innerHTML = '00';
      document.querySelector('.stopwatchMinutes').innerHTML = '00';
      document.querySelector('.stopwatchDisplay').style.visibility = 'visible';
      document.querySelector('.times').innerHTML = '';
      document.querySelector('.saveTime').style.display = 'none';
      timesArr = []
      stopwatchIsCalled = false;
    };

    if (targetEl.classList.contains('saveTime') || parentEl.classList.contains('saveTime')) {
      if (timesArr.length < 100) {
        timesArr.push(`${stopwatchMinutes < 10 ? '0' + stopwatchMinutes : stopwatchMinutes} ${stopwatchSeconds < 10 ? '0' + stopwatchSeconds : stopwatchSeconds}.${stopwatchMiliseconds < 10 ? '0' + stopwatchMiliseconds : stopwatchMiliseconds}`);
        updateList();
      } else {
        return
      }
    }
  });
})