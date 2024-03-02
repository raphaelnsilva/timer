document.addEventListener('DOMContentLoaded', function () {
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
      document.querySelector('#stopwatch').style.display = 'block';
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

  document.querySelector('#stopwatch').style.display = 'block';
  document.querySelector('.stopwatchIcon').classList.add('active');
});