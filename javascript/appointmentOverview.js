function appointmentOverview() {
  const pageDate = document.getElementById('date').getAttribute('date');
  appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  let cardLoaded = false;
  let apptArray = [];

  const monthsArray = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ]

  function dateTitle() {
    const dateEl = document.getElementById('date');
    let newDate = pageDate.replaceAll('-', '/');

    newDate = new Date().toLocaleDateString('en-GB');

    if (pageDate !== '') {
      let dateSplit = document.getElementById('date').getAttribute('date').split('-');
      let month = (parseInt(dateSplit[1]) - 1);

      let dayStr = (dateSplit[0] + " " + monthsArray[month] + " " + dateSplit[2]);

      dateEl.innerHTML = dayStr;

    } else {
      let dateSplit = document.getElementById('date').getAttribute('date').split('-');
      let month = parseInt(dateSplit[1]);

      let dayStr = (dateSplit[0] + " " + monthsArray[month] + " " + dateSplit[2]);

      dateEl.innerHTML = pageDate;
    }
  }

  dateTitle()

  container.innerHTML = '';

  function generateApptArray() {
    // Load the array, based off the page date.
    appointments.forEach((appt, index) => {
      if (appt.date === pageDate) {
        appt.index = index;
        apptArray.push(appt);
      }
    })
  }

  generateApptArray()

  function saveAppointments() {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }

  function delAppointment(index) {
    appointments.splice(index, 1);
    saveAppointments();
  }


  function loadCard(card) {

    if (!cardLoaded) {

      const cardEl = document.createElement('div');
      cardEl.className = "card p-2 position-absolute col-3 z-3";

      // Not the prettiest code, but it works
      const cardElHTML = `
          <div class="card p-2 position-fixed col-3 z-3">
            <div class="row justify-content-end">
              <button class="btn btn-sm btn-danger col-1 position-absolute me-2" type="button" id="closeBtn">x</button>
            </div>
            <div class="card-body">
              <h5 class="card-title text-center">${apptArray[card.id].id}</h5>
              <span class="row justify-content-center">
                  <small class="col-3 text-end">${apptArray[card.id].startTime}</small>
                  <small class="col-1 text-center">-</small>
                  <small class="col-3 text-start">${apptArray[card.id].endTime}</small>
              </span>
              <p class="class-text p-4">${apptArray[card.id].description}</p>
            </div>
            <div class="card-footer">
              <div class="row p-1 justify-content-around">
                <a id="editBtn" href="#" class="btn btn-success col-3">Edit</a>
                <a id="delBtn" href="#" class="btn btn-danger col-3">Del</a>
              </div>
            </div>
          </div>`;

      container.innerHTML += cardElHTML;

      // Load button events
      const closeBtn = document.getElementById('closeBtn');
      const deleteBtn = document.getElementById('delBtn');
      const editBtn = document.getElementById('editBtn');

      closeBtn.addEventListener('click', function () { container.innerHTML = ''; cardLoaded = false; });

      deleteBtn.addEventListener('click', function () {
        container.innerHTML = '';
        cardLoaded = false;
        apptArray.splice(card.id, 1);
        delAppointment(card.id);
        saveAppointments();
        generateAppointments()
      }); // Reload Appointments

      editBtn.addEventListener('click', function () {
        edit = apptArray[card.id].index;
        idEl.value = apptArray[card.id].id;
        dateEl.value = apptArray[card.id].startTime;
        timeEl.value = apptArray[card.id].startTime;
        endTimeEl.value = apptArray[card.id].endTime;
        descriptionEl.value = apptArray[card.id].description;
        switchPage('appointmentPage');
      });

      cardLoaded = true;
    }
  }

  function generateTimeTable() {
    const container = document.getElementById("timeTable");

    // Loop for 48 time slots for the 48 half hours in one day.
    for (let i = 0; i < 24 * 2; i++) {
      const time = document.createElement("div");
      const hour = Math.floor(i / 2); // Every two iterations of half an hour is a full hour
      let minutes;

      if (i % 2 === 0) {
        minutes = "00";
      } else {
        minutes = "30";
      }

      time.className = "timeSlot";
      time.innerText = `${String(hour).padStart(2, "0")}:${minutes}`; // Stringify hour to use padstart adding a 0 at the start.
      time.style.top = `${i * 30}px`; // Per slot giving 30 pixels space
      time.style.height = "30px";
      container.appendChild(time);
    }
  }

  function generateAppointments() {
    const container = document.getElementById("appointmentGrid");

    container.innerHTML = ''; // TEMP for reloading the appointments

    const placedAppt = []; // Keeps track of which appointments are placed

    apptArray.forEach((appt, index) => {
      const card = document.createElement("div");


      card.addEventListener('click', function () { loadCard(this) });
      card.id = index;

      card.className = "appointment-card";
      card.innerHTML = `
                  <strong>${appt.id}</strong><br/>
                  <small>${appt.description}</small>
                  `;

      const startMin = timeToMinutes(appt.startTime);
      const endMin = timeToMinutes(appt.endTime);
      const duration = endMin - startMin;

      let leftOffset = 0; // The index/position of the card being on the left side
      let overlapCount = 1; // Keep track of how many appointments are overlapping

      placedAppt.forEach((placed) => {
        const placedStart = timeToMinutes(placed.startTime);
        const placedEnd = timeToMinutes(placed.endTime);

        if (startMin < placedEnd && endMin > placedStart) {
          leftOffset += 1;
          overlapCount += 1;
        }
      });

      // Starting position of the card
      card.style.top = `${startMin}px`;
      // How long the card will be
      card.style.height = `${duration}px`;

      // Giving correct position for each card, width of 100 divided by how many appointments overlap.
      card.style.left = `${leftOffset * (100 / overlapCount)}%`;

      // Giving the right width for each card, width of 100 divided by how many appointments overlap to give the width to the card.
      card.style.width = `${100 / overlapCount}%`;

      container.appendChild(card);
      placedAppt.push(appt);
    });
  }

  function timeToMinutes(timeString) {
    const [hour, minute] = timeString.split(":").map(Number);
    return hour * 60 + minute;
  }

  generateTimeTable();
  generateAppointments();

}


// Doesn't work yet;
function prevNextBtns() {
  const prevBtn = document.getElementById('prevDay');
  const nextBtn = document.getElementById('nextDay');

  prevBtn.addEventListener('click', function () {
    const dateString = document.getElementById('date').getAttribute('date');
    const format = "d-m-Y"; // Day-Month-Year format

    // Convert string to Date object
    const parsedDate = flatpickr.parseDate(dateString, format);
    const dateObj = new Date(parsedDate).fp_incr(-1);
    const readableDate = flatpickr.formatDate(dateObj, "F j, Y");
    const useableDate = flatpickr.formatDate(dateObj, "d-m-Y");

    console.log(dateObj, readableDate, useableDate);

    const pageDateAtr = document.getElementById('date');
    pageDateAtr.innerHTML = readableDate;
    pageDateAtr.setAttribute('date', useableDate);
    switchPage('dayPage');
  })

  nextBtn.addEventListener('click', function () {
    const dateString = document.getElementById('date').getAttribute('date');
    const format = "d-m-Y"; // Day-Month-Year format

    // Convert string to Date object
    const parsedDate = flatpickr.parseDate(dateString, format);
    const dateObj = new Date(parsedDate).fp_incr(1);
    const readableDate = flatpickr.formatDate(dateObj, "F j, Y");
    const useableDate = flatpickr.formatDate(dateObj, "d-m-Y");

    console.log(dateObj, readableDate, useableDate);

    const pageDateAtr = document.getElementById('date');
    pageDateAtr.innerHTML = readableDate;
    pageDateAtr.setAttribute('date', useableDate);
    switchPage('dayPage');
  })
}

prevNextBtns()
