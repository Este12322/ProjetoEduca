const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper"),
  addEventCloseBtn = document.querySelector(".close"),
  addEventTitle = document.querySelector(".event-name"),
  addEventFrom = document.querySelector(".event-time-from"),
  addEventTo = document.querySelector(".event-time-to"),
  addEventSubmit = document.querySelector(".add-event-btn");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio",
  "Junho", "Julho", "Agosto", "Setembro", "Outubro",
  "Novembro", "Dezembro",
];

const eventsArr = [];
getEvents();
initCalendar();

function initCalendar() {
  const { firstDay, lastDay, prevDays, lastDate, day, nextDays } = getCalendarDates();
  date.innerHTML = `${months[month]} ${year}`;
  daysContainer.innerHTML = generateDaysHTML(firstDay, lastDate, prevDays, day, nextDays);
  addListener();
}

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

function generateDaysHTML(firstDay, lastDate, prevDays, day, nextDays) {
  let days = "";
  
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    const isToday = i === new Date().getDate() && year === today.getFullYear() && month === today.getMonth();
    const isEventDay = eventsArr.some(eventObj => eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year);
    
    days += `<div class="day ${isToday ? 'today active' : ''} ${isEventDay ? 'event' : ''}">${i}</div>`;
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
      days.forEach(day => day.classList.remove("active"));
      e.target.classList.add("active");
      updateEvents(activeDay);
    });
  });
}

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

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

function updateEvents(date) {
  let events = eventsArr.filter(event => event.day === date && month + 1 === event.month && year === event.year)
                         .flatMap(event => event.events.map(e => `<div class="event">${e.title} - ${e.time}</div>`))
                         .join('') || `<div class="no-event"><h3>Sem Eventos</h3></div>`;
  
  eventsContainer.innerHTML = events;
}

addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

addEventSubmit.addEventListener("click", () => {
  if (validateEventInputs()) {
    const newEvent = { title: addEventTitle.value, time: `${addEventFrom.value} - ${addEventTo.value}` };
    addEventToEventArray(newEvent);
    clearEventInputs();
    updateEvents(activeDay);
  }
});

function validateEventInputs() {
  if (!addEventTitle.value || !addEventFrom.value || !addEventTo.value) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }
  return true;
}

function addEventToEventArray(newEvent) {
  let eventAdded = false;
  eventsArr.forEach(item => {
    if (item.day === activeDay && item.month === month + 1 && item.year === year) {
      item.events.push(newEvent);
      eventAdded = true;
    }
  });

  if (!eventAdded) {
    eventsArr.push({ day: activeDay, month: month + 1, year: year, events: [newEvent] });
  }

  addEventWrapper.classList.remove("active");
}

function clearEventInputs() {
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
}

function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

function getEvents() {
  const storedEvents = localStorage.getItem("events");
  if (storedEvents) {
    eventsArr.push(...JSON.parse(storedEvents));
  }
}

addEventSubmit.addEventListener("click", () => {
  if (validateEventInputs()) {
    const newEvent = {
      title: addEventTitle.value,
      time: `${addEventFrom.value} - ${addEventTo.value}`
    };

    addEventToEventArray(newEvent);
    clearEventInputs();
    updateEvents(activeDay); // Atualiza os eventos após adicionar um novo
  }
});

function addEventToEventArray(newEvent) {
  let eventAdded = false;

  // Verifica se já existe um evento para o dia
  eventsArr.forEach(item => {
    if (item.day === activeDay && item.month === month + 1 && item.year === year) {
      item.events.push(newEvent);
      eventAdded = true;
    }
  });

  // Se não encontrou, cria um novo registro de evento
  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent]
    });
  }

  addEventWrapper.classList.remove("active"); // Fecha o formulário de adicionar evento
  saveEvents(); // Salva os eventos no localStorage
}

addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active"); // Mostra ou oculta o formulário
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active"); // Oculta o formulário
});

  // Função para ajustar o cabe
  function adjustHeader() {
    const header = document.querySelector('header');
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0 = janeiro, ..., 10 = novembro, 11 = dezembro
    const thirtyOneDayMonths = [0, 2, 4, 6, 7, 9, 11]; // Meses com 31 dias: janeiro, março, maio, julho, agosto, outubro, dezembro

    // Verifica se o mês atual está na lista de meses com 31 dias
    if (thirtyOneDayMonths.includes(currentMonth)) {
      header.style.backgroundSize = '110%'; // Ajusta o tamanho da imagem
    } else {
      header.style.backgroundSize = 'cover'; // Tamanho padrão
    }
  }

  window.onload = adjustHeader;