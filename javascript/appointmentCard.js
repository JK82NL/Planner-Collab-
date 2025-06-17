let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
const appointmentContainer = document.getElementById('appointments-holder');

const deleteAppointment = (button) => {
    const card = button.parentElement.parentElement;
    const info = {
        id: card.querySelector('#id').innerHTML,
        date: card.querySelector('#date').innerHTML,
        startTime: card.querySelector('#startTime').innerHTML,
        description: card.querySelector('#description').innerHTML,
    }

    appointments.forEach((appointment, index) => {
        if(appointment.id === info.id) {
            console.log(index)
            appointments.splice(index, 1);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            loadAppointments();
        }
    })

    alert(info.id)
}

const createAppointmentCard = (appointment) => {
    let appointmentCard = document.createElement('div');
    appointmentCard.className = "card";
    appointmentCard.style = "width: 18rem";
    
    appointmentCard.innerHTML += `
        <div class="card-body">
            <h5 class="card-title text-center" id="id">${appointment.id}</h5>
            <p class="card-text" id="date">${appointment.date}</p>
            <p class="card-text" id="startTime">${appointment.startTime}</p>
            <p class="card-text" id="description">${appointment.description}</p>
        </div>
        <div class="card-footer text-center">
            <button class="btn btn-sm btn-outline-secondary" type="button" onclick="deleteAppointment(this)">Delete</button>
            <button class="btn btn-sm btn-outline-secondary" type="button" onclick="alert('Need to add')">Edit</button>
        </div>`;

    return appointmentCard;
}

const organiseCards = (array, style) => {
    console.log(array)

    return array;
}

// Create a "card" and load into the "container" element
const loadAppointments = (container) => {
    container.innerHTML = '';
    let appointmentsArray = [];

    appointments.forEach(element => {
        const appointment = {
          id: element.id,
          date: element.date,
          startTime: element.startTime,
          description: element.description
        };

        const appointmentCard = createAppointmentCard(appointment);

        appointmentsArray.push(appointmentCard);
        // container.add(appointmentCard);
    });

    appointmentsArray = organiseCards(appointmentsArray, "time");

    appointmentsArray.forEach(appointment => {
        container.append(appointment);
    })
    
}



loadAppointments(appointmentContainer)