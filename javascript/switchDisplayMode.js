function switchDisplayMode() {
    const appointmentDisplay = document.getElementById("appointmentDisplay");
    const monthDisplay = document.getElementById("monthDisplay");
    const weekDisplay = document.getElementById("weekDisplay");
    const dayDisplay = document.getElementById("dayDisplay");
    const fullscreenOverlay = document.getElementById("fullscreenOverlay");
}

// CHECK - Display values in log ! REMOVE WHEN DONE!
console.log("display value check");
console.log('appointmentDisplay display:', window.getComputedStyle(appointmentDisplay).display);
console.log('monthDisplay display:', window.getComputedStyle(monthDisplay).display);
console.log('weekDisplay display:', window.getComputedStyle(weekDisplay).display);
console.log('dayDisplay display:', window.getComputedStyle(dayDisplay).display);
console.log('fullscreenOverlay display:', window.getComputedStyle(fullscreenOverlay).display);

// !!! CHANGE CODE TO NOT ROTATE BUT ONLY TO SHOW THE CLICKED DISPLAY PAGE !!!

// Check the display property of each page and switch accordingly
// !== "none" checks for all possible display options not just "block" like with === "block"
if (window.getComputedStyle(appointmentDisplay).display !== "none") {
    appointmentDisplay.style.display = "none";
    page.style.display = "block";
}   // ^^^ Check if appointmentPage is displayed ^^^
else if (window.getComputedStyle(monthDisplay).display !== "none") {
    monthDisplay.style.display = "none";
    page.style.display = "block";
}   // ^^^ Check if monthDisplay is displayed ^^^
else if (window.getComputedStyle(weekDisplay).display !== "none") {
    weekDisplay.style.display = "none";
    page.style.display = "block";
}   // ^^^ Check if weekDisplay is displayed ^^^
else if (window.getComputedStyle(dayDisplay).display !== "none") {
    dayDisplay.style.display = "none";
    page.style.display = "block";
}   // ^^^ Check if dayDisplay is displayed ^^^
else if (window.getComputedStyle(fullscreenOverlay).display !== "none") {
    fullscreenOverlay.style.display = "none";
    page.style.display = "block";
}   // ^^^ Check if fullscreenOverlay is displayed ^^^
else {
    errorMessage.style.display = "block";
}   // ^^^ If no pages are displayed, show error message ^^^