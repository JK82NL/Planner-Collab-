let titleEl = document.getElementById("title");//
let dateEl = document.getElementById("date");
let beginEl = document.getElementById("begin");
let endEl = document.getElementById("end");
let descriptionEl = document.getElementById("description");
let locationEl = document.getElementById("location");

let appointments = JSON.parse(localStorage.getItem('appointments')) || [];// Initialize appointments from localStorage or an empty array

function saveAppointments() {
  localStorage.setItem('appointments', JSON.stringify(appointments)); // Save the appointments array to localStorage
}

function showAppointments() {
  const appointmentsListEl = document.getElementById('appointmentList');// Get the list element where appointments will be displayed  
  appointmentsListEl.innerHTML = ''; // Clear the list before displaying new appointments
  appointments.forEach((appointment, index) => { // Loop through each appointment and create a list item
    if (!appointment.name || !appointment.date || !appointment.beginTime || !appointment.endTime || !appointment.location) return; // Skip if any required field is empty
    const item = document.createElement('li'); // Create a new list item element
// Set the inner HTML of the list item with appointment details and buttons for actions
    item.innerHTML = `
      <strong>${appointment.name}</strong> - ${appointment.date} ${appointment.beginTime} - ${appointment.endTime}<br>
      ${appointment.description} - ${appointment.location}<br>
      <button onclick="delAppointment(${index})">Delete</button>
      <button onclick="changeAppointment(${index})">Change</button>
    `;
    appointmentsListEl.appendChild(item);
  });
}
document.getElementById('appointmentForm').addEventListener('submit', function (e) {
  e.preventDefault();// Prevent the default form submission behavior

  const appointment = {// Create a new appointment object with values from the form
    id: Date.now().toString(),
    title: titleEl.value, 
    date: dateEl.value,
    startTime: beginEl.value,
    endTime: endEl.value,
    location: locationEl.value,
    description: descriptionEl.value
  };

  appointments.push(appointment);// Add the new appointment to the afspraken array
  saveAppointments();// Save the updated afspraken array to localStorage
  showAppointments(); // Display the updated list of appointments
  this.reset(); // Reset the form fields after submission
});

function delAppointment(index) {
  appointments.splice(index, 1);
  saveAppointments();
  showAppointments();
}