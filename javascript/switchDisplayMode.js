function switchPage() {
    const appointmentPage = document.getElementById("appointmentPage");
    const monthPage = document.getElementById("monthPage");
    const weekPage = document.getElementById("weekPage");
    const dayPage = document.getElementById("dayPage");
    const fullscreenOverlay = document.getElementById("fullscreenOverlay");

    let displayPage = [appointmentPage, monthPage, weekPage, dayPage, fullscreenOverlay];

    for (let i = 0; i < displayPage.length; i++) {
        // Check if the page is already displayed
        if (window.getComputedStyle(displayPage[i]).display !== "none") {
            page.style.display = "none";
        } else {
            page.style.display = "block";
            break; // Stop after displaying the first page
        }
    }
}

// !!! CHANGE CODE TO NOT ROTATE BUT ONLY TO SHOW THE CLICKED DISPLAY PAGE !!!



// // Check the display property of each page and switch accordingly
// // !== "none" checks for all possible display options not just "block" like with === "block"
// if (window.getComputedStyle(appointmentPage).display !== "none") {
//     appointmentPage.style.display = "none";
//     page.style.display = "block";
// }   // ^^^ Check if appointmentPage is displayed ^^^
// else if (window.getComputedStyle(monthPage).display !== "none") {
//     monthPage.style.display = "none";
//     page.style.display = "block";
// }   // ^^^ Check if monthPage is displayed ^^^
// else if (window.getComputedStyle(weekPage).display !== "none") {
//     weekPage.style.display = "none";
//     page.style.display = "block";
// }   // ^^^ Check if weekPage is displayed ^^^
// else if (window.getComputedStyle(dayPage).display !== "none") {
//     dayPage.style.display = "none";
//     page.style.display = "block";
// }   // ^^^ Check if dayPage is displayed ^^^
// else if (window.getComputedStyle(fullscreenOverlay).display !== "none") {
//     fullscreenOverlay.style.display = "none";
//     page.style.display = "block";
// }   // ^^^ Check if fullscreenOverlay is displayed ^^^
// else {
//     errorMessage.style.display = "block";
// }   // ^^^ If no pages are displayed, show error message ^^^