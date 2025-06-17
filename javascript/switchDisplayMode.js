
document.addEventListener('DOMContentLoaded', function () {
    // Put pages into variables
    const appointmentPage = document.getElementById('appointmentPage');
    const monthPage = document.getElementById('monthPage');
    const weekPage = document.getElementById('weekPage');
    const dayPage = document.getElementById('dayPage');

    // Set initial states
    appointmentPage.style.display = "none";
    weekPage.style.display = "none";
    dayPage.style.display = "none";
    monthPage.style.display = "block"; // Show month page by default
});

// Switch page with buttonclick.
function switchPage(targetPage) {

    // Put page variables into an array and hide them all.
    const pages = [appointmentPage, monthPage, weekPage, dayPage];
    pages.forEach(page => page.style.display = "none");

    // Show the page based on the button which was clicked.
    switch (targetPage) {
        case 'appointmentPage':
            appointmentPage.style.display = "block";
            break;
        case 'monthPage':
            monthPage.style.display = "block";
            break;
        case 'weekPage':
            weekPage.style.display = "block";
            break;
        case 'dayPage':
            dayPage.style.display = "block";
            break;
        default:
            monthPage.style.display = "block"; // Default to month view
            console.log('Unknown page:', targetPage);
    }
}