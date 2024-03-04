document.addEventListener('DOMContentLoaded', () => {
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
  
  setInterval(updateClock, 1000);
  
  updateClock();
})