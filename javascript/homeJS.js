// Laden van afspraken uit localStorage
// let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  // Laad afspraken uit localStorage
  var localData = JSON.parse(localStorage.getItem("appointments")) || []; // Changed const appointments to var localData
  
  function getFormattedDate(dateObj) {
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // maanden zijn 0-gebaseerd
  const year = dateObj.getFullYear();
  return `${day}-${month}-${year}`;
}
   console.log(localStorage.getItem("appointments"));
  flatpickr("#inline-calendar-home", {
    inline: true,
    dateFormat: "d-m-Y",
    minDate: "today",
    onChange: function(selectedDates, dateStr) {
      console.log("Selected date:", dateStr);
    },
    onDayCreate: function(dObj, dStr, fp, dayElem) {
      const date =  dayElem.dateObj || dayElem.date; // Use dateObj or date if available
      if (!date) return; // Check if date is valid   
      const dayDateObj = getFormattedDate(date);
      if(!dayDateObj) return; // Check if dateObj is valid
      console.log(dayDateObj);
     
      const hasAppointment = localData.some(appt => appt.date === dayDateObj);

      if (hasAppointment) {
        const dot = document.createElement('span');
        dot.className = 'dot-indicator';
        dayElem.appendChild(dot);
      }
    }
  });
