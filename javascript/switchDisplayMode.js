
document.addEventListener('DOMContentLoaded', function () {
    // Put pages into variables
    const appointmentPage = document.getElementById('appointmentPage');
    const monthPage = document.getElementById('monthPage');
    const weekPage = document.getElementById('weekPage');
    const dayPage = document.getElementById('dayPage');
    const fullscreenOverlay = document.getElementById('fullscreenOverlay');

    // Set initial states
    appointmentPage.style.display = "none";
    weekPage.style.display = "none";
    dayPage.style.display = "none";
    fullscreenOverlay.style.display = "none";
    monthPage.style.display = "block"; // Show month page by default
});

// Switch page with buttonclick.
function switchPage(targetPage) {
    // DEBUG LOG
    console.log('switchPage called with:', targetPage);

    // DEBUG LOG to check if elements are found
    console.log('Elements found:', {
        appointmentPage,
        monthPage,
        weekPage,
        dayPage,
        fullscreenOverlay
    });

    // Put page variables into an array and them all.
    const pages = [appointmentPage, monthPage, weekPage, dayPage, fullscreenOverlay];
    pages.forEach(page => page.style.display = "none");

    // Show the target page based on button clicked
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
            appointmentOverview();
            break;
        case 'fullscreenOverlay':
            fullscreenOverlay.style.display = "block";
            break;
        default:
            monthPage.style.display = "block"; // Default to month view
            console.log('Unknown page:', targetPage);
    }
}