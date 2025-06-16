let idEl = document.getElementById("appointmentName");
let dateEl = document.getElementById("startingDate"); // <-- Verborgen input
let timeEl = document.getElementById("startingTime");
let endTimeEl = document.getElementById("endingTime");
let descriptionEl = document.getElementById("description");
const saveAppointmentBtn = document.getElementById("sendDataButton");

let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
let calendarInstance = null; // <-- We slaan de Flatpickr instantie op

saveAppointmentBtn.addEventListener("click", saveAppointment);

initCalendar();

let edit = false;
let value = null;

function checkEdit() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  value = params.edit;

  if(value !== null) {
    edit = true;
    idEl.value = appointments[value].id;
    dateEl.value = appointments[value].date; // Need to set up flatpickr
    timeEl.value = appointments[value].startTime;
    endTimeEl.value = appointments[value].endTime;
    descriptionEl.value = appointments[value].description;
    calendarInstance.setDate(appointments[value].date);
  };
}

checkEdit();

function saveAppointments() {
  localStorage.setItem('appointments', JSON.stringify(appointments));
}

function getFormattedDate(dateObj) {
  return dateObj.toISOString().split('T')[0];
}

function initCalendar() {
  // Vernietig oude instantie als die bestaat
  if (calendarInstance) {
    calendarInstance.destroy();
  }

  calendarInstance = flatpickr("#inline-calendar-form", {
    inline: true,
    dateFormat: "d-m-Y",
    minDate: "today",
    onChange: function (selectedDates, dateStr) {
      if (selectedDates.length > 0) {
        // Zet geselecteerde datum in verborgen input
        const isoDate = selectedDates[0].toISOString().split('T')[0]; // 'YYYY-MM-DD'
        document.getElementById("startingDate").value = isoDate; // Bugged? returns the day before selected?
        document.getElementById("startingDate").value = dateStr; // Returns correct date, 'dd-mm-YY' <- worse formatting tho
      }
    },
    onDayCreate: function (dObj, dStr, fp, dayElem) {
      const date = getFormattedDate(dayElem.dateObj);

      const hasAppointment = appointments.some(appt => {
        const parts = appt.date.split('-');
        const apptDate = new Date(parts[2], parts[1] - 1, parts[0]);
        return getFormattedDate(apptDate) === date;
      });

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
    id: idEl.value,
    date: dateEl.value,
    startTime: timeEl.value,
    endTime: endTimeEl.value,
    description: descriptionEl.value
  };

  if (!appointment.date || !appointment.startTime || !appointment.endTime || !appointment.description || !appointment.id) {
    alert("Vul alle velden in.");
    return;
  }

  if(!edit) {
    appointments.push(appointment);
    saveAppointments();
    initCalendar(); // herinitialiseer om stip toe te voegen

    // Reset formulier
    idEl.value = '';
    dateEl.value = '';
    timeEl.value = '';
    endTimeEl.value = '';
    descriptionEl.value = '';
  } else {
    appointments[value] = appointment;
    saveAppointments();
    window.location.href=`./appointmentOverview.html?date=${appointment.date}`; // need to load to the correct date
  }

}

function delAppointment(index) {
  appointments.splice(index, 1);
  saveAppointments();
  initCalendar();
}

function changeAppointment(index) {
  const appointment = appointments[index];
  idEl.value = appointment.id;
  dateEl.value = appointment.date;
  timeEl.value = appointment.startTime;
  endTimeEl.value = appointment.endTime;
  descriptionEl.value = appointment.description;

  appointments.splice(index, 1);
  saveAppointments();
  initCalendar();
}