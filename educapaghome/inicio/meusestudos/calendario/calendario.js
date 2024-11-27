const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

// Função para inicializar o calendário
function initCalendar() {
  const { firstDay, lastDay, prevDays, lastDate, day, nextDays } = getCalendarDates();
  date.innerHTML = `${months[month]} ${year}`;
  daysContainer.innerHTML = generateDaysHTML(firstDay, lastDate, prevDays, day, nextDays);
  addListener();
}

// Função para obter as datas do calendário
function getCalendarDates() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  return { firstDay, lastDay, prevDays, lastDate, day, nextDays };
}

// Gerar os dias do calendário
function generateDaysHTML(firstDay, lastDate, prevDays, day, nextDays) {
  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    const isToday = i === today.getDate() && year === today.getFullYear() && month === today.getMonth();
    days += `<div class="day ${isToday ? 'today active' : ''}" data-day="${i}">${i}</div>`;
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }

  return days;
}

function addListener() {
  const days = document.querySelectorAll(".day");
  days.forEach(day => {
    day.addEventListener("click", (e) => {
      activeDay = Number(e.target.innerHTML);
    });
  });
}

// Navegação do calendário
prev.addEventListener("click", () => {
  month = (month > 0) ? month - 1 : 11;
  year = (month === 11) ? year - 1 : year;
  initCalendar();
});

next.addEventListener("click", () => {
  month = (month < 11) ? month + 1 : 0;
  year = (month === 0) ? year + 1 : year;
  initCalendar();
});

initCalendar(); // Inicializar o calendário quando a página for carregada
