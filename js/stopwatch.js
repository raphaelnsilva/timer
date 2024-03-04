  document.addEventListener('DOMContentLoaded', () => {
    let stopwatch;
    let stopwatchMinutes = 0;
    let stopwatchSeconds = 0;
    let stopwatchMiliseconds = 99;
    let stopwatchIsCalled = false;
    let timesArr = new Array();

    const saveTime = () => {
      const lastTime = timesArr[timesArr.length - 1];

      const times = document.createElement('div');
      times.classList.add('time');
      
      const timeNumber = document.createElement('p');
      timeNumber.textContent = `Nº${timesArr.length}`;
      times.appendChild(timeNumber);

      const currentTime = document.createElement('p');
      currentTime.classList.add('currentTime')
      currentTime.textContent = lastTime;
      times.appendChild(currentTime);

      const deleteTime = document.createElement('button');
      deleteTime.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteTime.classList.add('deleteTime');
      times.appendChild(deleteTime);

      const stopwatch = document.querySelector('#stopwatch');
      stopwatch.appendChild(times);
    }

  const updateStopwatchDisplay = () => {
    document.querySelector('.stopwatchMinutes').textContent = stopwatchMinutes.toString().padStart(2, '0');
    document.querySelector('.stopwatchSeconds').textContent = stopwatchSeconds.toString().padStart(2, '0');
    document.querySelector('.stopwatchMiliSeconds').textContent = stopwatchMiliseconds.toString().padStart(2, '0');
  };

  document.querySelector('#stopwatch').addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest('button');

    if (targetEl.classList.contains('startStopwatch') || parentEl.classList.contains('startStopwatch')) {
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
      stopwatchIsCalled = false;
    };

    if (targetEl.classList.contains('saveTime') || parentEl.classList.contains('saveTime')) {
      timesArr.push(`${stopwatchMinutes < 10 ? '0' + stopwatchMinutes : stopwatchMinutes} ${stopwatchSeconds < 10 ? '0' + stopwatchSeconds : stopwatchSeconds}.${stopwatchMiliseconds < 10 ? '0' + stopwatchMiliseconds : stopwatchMiliseconds}`);
      
      saveTime();
    }

    if (targetEl.classList.contains('deleteTime') || parentEl.classList.contains('deleteTime')) {
      const timeEl = targetEl.closest('.time');
      const currentTimeEl = timeEl.querySelector('.currentTime');
      const currentTime = currentTimeEl.textContent

      // Encontre o índice do tempo no array
      const indexToRemove = timesArr.indexOf(currentTime);
      const nextIndex = indexToRemove + 1;
      console.log('indexToRemove', indexToRemove)
      console.log('nextIndex', nextIndex)
      timesArr.splice(indexToRemove, 1);
      console.log(timesArr)
      timeEl.remove()

      saveTime();


      // // Remova o tempo do array se encontrado
      // if (indexToRemove !== -1) {
      //   timesArr.splice(indexToRemove, 1);

      //   // Remova o elemento da interface do usuário
      //   timeEl.remove();

      //   // Atualize a exibição na tela, se necessário
      //   // saveTime();
      // } else {
      //   console.log('Tempo não encontrado no array.');
      // }
    }

    // const currentTime = document.querySelector('.currentTime').innerText
    // console.log(currentTime)

    // if (timesElement) {
    //   // Obtenha o número do tempo a ser removido
    //   const timeNumber = timesElement.querySelector('span').textContent;
    //   console.log(timeNumber)
    //   const indexToRemove = parseInt(timeNumber.replace('Nº', '')) - 1;

    //   // Remova o tempo do array
    //   timesArr.splice(indexToRemove, 1);

    //   // Atualize a exibição na tela
    //   saveTime()
    // }
  

  });
})