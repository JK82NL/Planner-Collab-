// Variabelen voor inputvelden en knop
let idEl = document.getElementById("appointmentName");
let dateEl = document.getElementById("startingDate"); // verborgen input
let timeEl = document.getElementById("startingTime");
let endTimeEl = document.getElementById("endingTime");
let descriptionEl = document.getElementById("description");
const saveAppointmentBtn = document.getElementById("sendDataButton");

const container = document.getElementById('test-container');

// Afspraken laden of lege array als none
let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
let calendarInstance = null;

let edit = null;

// Event listener
saveAppointmentBtn.addEventListener("click", saveAppointment);

initCalendar();

function saveAppointments() {
  localStorage.setItem('appointments', JSON.stringify(appointments));
}

function getFormattedDate(dateObj) {
  // Retourneert ISO yyyy-mm-dd formaat
  return dateObj.toISOString().split('T')[0];
}

function initCalendar() {
  if (calendarInstance) {
    calendarInstance.destroy();
  }

  calendarInstance = flatpickr("#inline-calendar-form", {
    inline: true,
    dateFormat: "d-m-Y",
    minDate: "today",
    onChange: function (selectedDates, dateStr) {
      if (selectedDates.length > 0) {
        // Sla datum op in ISO-formaat (yyyy-mm-dd)
        // dateEl.value = getFormattedDate(selectedDates[0]); << This formats the date wrong
        dateEl.value = dateStr;
      }
    },
    onDayCreate: function (dObj, dStr, fp, dayElem) {
      const date = getFormattedDate(dayElem.dateObj);

      const hasAppointment = appointments.some(appt => appt.date === date);

      if (hasAppointment) {
        const dot = document.createElement('span');
        dot.className = 'dot-indicator';
        dayElem.appendChild(dot);
      }
    }
  });
}

function saveAppointment() {
  const appointment = {
    id: idEl.value.trim(),
    date: dateEl.value,
    startTime: timeEl.value,
    endTime: endTimeEl.value,
    description: descriptionEl.value.trim(),
    index: appointments.length,
  };

  // Controleer alle velden
  if (!appointment.id || !appointment.date || !appointment.startTime || !appointment.endTime || !appointment.description) {
    alert("Vul alle velden in.");
    return;
  }

  if (edit === null) {
    // Voeg toe aan array
    const pageDate = document.getElementById('date');
    pageDate.setAttribute('date', dateEl.value);
    appointments.push(appointment);
    saveAppointments();
    

    // Reset formulier
    idEl.value = '';
    dateEl.value = '';
    timeEl.value = '';
    endTimeEl.value = '';
    descriptionEl.value = '';

    initCalendar();
    switchPage('dayPage');

  } else {
    appointments[edit].id = idEl.value;
    appointments[edit].date = dateEl.value;
    appointments[edit].startTime = timeEl.value;
    appointments[edit].endTime = endTimeEl.value;
    appointments[edit].description = descriptionEl.value.trim();
    saveAppointments();
    
    edit = null;

    const pageDate = document.getElementById('date');
    pageDate.setAttribute('date', dateEl.value);

    idEl.value = '';
    dateEl.value = '';
    timeEl.value = '';
    endTimeEl.value = '';
    descriptionEl.value = '';

    initCalendar();
    switchPage('dayPage');
  }

}

// Verwijder afspraak op index
function delAppointment(index) {
  appointments.splice(index, 1);
  saveAppointments();
  initCalendar();
}

// Bewerken van afspraak (laadt in formulier, verwijdert oude)
function changeAppointment(index) {
  const appt = appointments[index];
  idEl.value = appt.id;
  dateEl.value = appt.date;
  timeEl.value = appt.startTime;
  endTimeEl.value = appt.endTime;
  descriptionEl.value = appt.description;

  appointments.splice(index, 1);
  saveAppointments();
  initCalendar();
}


// So the day view page loads the current date and the correct appointments
const dateObj = new Date();
      const readableDate = flatpickr.formatDate(dateObj, "F j, Y");
      const useableDate = flatpickr.formatDate(dateObj, "d-m-Y");

      const pageDateAtr = document.getElementById("date");
      pageDateAtr.innerHTML = readableDate;
      pageDateAtr.setAttribute("date", useableDate);
