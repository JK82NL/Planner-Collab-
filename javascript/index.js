
let dateEl = document.getElementById("startingDate");
let timeEl = document.getElementById("startingTime");
let descriptionEl = document.getElementById("description");

let appointments = JSON.parse(localStorage.getItem('appointments')) || [];// Initialize appointments from localStorage or an empty array

function saveAppointments() {
  localStorage.setItem('appointments', JSON.stringify(appointments)); // Save the appointments array to localStorage
}

function showAppointments() {
  const appointmentsListEl = document.getElementById('appointmentList');// Get the list element where appointments will be displayed  
  appointmentsListEl.innerHTML = ''; // Clear the list before displaying new appointments
  appointments.forEach((appointment, index) => { // Loop through each appointment and create a list item
    if (!appointment.date || !appointment.startTime || !appointment.description) return; // Skip if any required field is empty
    const item = document.createElement('li'); // Create a new list item element
// Set the inner HTML of the list item with appointment details and buttons for actions
    item.innerHTML = `
      ${appointment.date} ${appointment.startTime} <br>
      ${appointment.description} <br>
      <button onclick="delAppointment(${index})">Delete</button>
      <button onclick="changeAppointment(${index})">Change</button>
    `;
    appointmentsListEl.appendChild(item);
  });
}

function saveAppointment(){
    document.getElementById('appointmentForm').addEventListener('submit', function (e) {
  e.preventDefault();// Prevent the default form submission behavior

  const appointment = {// Create a new appointment object with values from the form
    id: Date.now().toString(),
    date: dateEl.value,
    startTime: timeEl.value,
    description: descriptionEl.value
  };

  appointments.push(appointment);// Add the new appointment to the afspraken array
  saveAppointments();// Save the updated afspraken array to localStorage
  showAppointments(); // Display the updated list of appointments
  this.reset(); // Reset the form fields after submission
});
}

function delAppointment(index) {
  appointments.splice(index, 1); // Remove the appointment from the appointments array
  saveAppointments();
  showAppointments();
}

function changeAppointment(index) {// Function to load an appointment into the form for editing
  const appointment = appointments[index]; // Get the appointment object from the appointments array
  dateEl.value = appointment.date; // Load the appointment date
  timeEl.value = appointment.startTime; // Load the appointment start time
  descriptionEl.value = appointment.description; // Load the appointment description
  // Remove the appointment from the list after loading it into the form
  appointments.splice(index, 1);
  saveAppointments();
  showAppointments();
}