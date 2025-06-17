// Laden van afspraken uit localStorage
// let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  // Laad afspraken uit localStorage
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  function getFormattedDate(dateObj) {
    return dateObj.toISOString().split('T')[0];
  }

  flatpickr("#inline-calendar-home", {
    inline: true,
    dateFormat: "d-m-Y",
    minDate: "today",
    onChange: function(selectedDates, dateStr) {
      console.log("Selected date:", dateStr);
    },
    onDayCreate: function(dObj, dStr, fp, dayElem) {
      const date = getFormattedDate(dayElem.dateObj);

      const hasAppointment = appointments.some(appt => {
        // appt.date = 'YYYY-MM-DD' formaat
        const parts = appt.date.split('-');
        const apptDate = new Date(parts[0], parts[1] - 1, parts[2]);
        return getFormattedDate(apptDate) === date;
      });

      if (hasAppointment) {
        const dot = document.createElement('span');
        dot.className = 'dot-indicator';
        dayElem.appendChild(dot);
      }
    }
  });
