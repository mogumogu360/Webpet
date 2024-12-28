// Check if the user is logged in by checking localStorage
document.addEventListener('DOMContentLoaded', function() {
    const loggedIn = localStorage.getItem('loggedIn');
    const userName = localStorage.getItem('userName');
    
    if (!loggedIn) {
        // Redirect to login if not logged in
        window.location.href = 'login.html';
    } else {
        // Display user's name on the navbar
        document.getElementById('userNameDisplay').innerText = `Welcome, ${userName}`;
    }
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function(event) {
    event.preventDefault();
    // Clear the user data from localStorage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userName');
    // Redirect to login page
    window.location.href = 'login.html';
});
