document.getElementById('loginForm').addEventListener('submit', function (e) { 
    e.preventDefault();

    // Get user input
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;
    var message = document.getElementById('message');

    // Check for empty fields
    if (!email || !password) {
        message.className = 'message error';
        message.innerText = 'Both email and password are required.';
        return;
    }

    // Validate email format using a regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        message.className = 'message error';
        message.innerText = 'Please enter a valid email address.';
        return;
    }

    // Retrieve users from localStorage
    var registeredUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user based on email and password
    var user = registeredUsers.find(function(user) {
        return user.email === email && user.password === password;
    });

    // Validate login credentials
    if (user) {
        // Store user's name in localStorage
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('userName', user.name);

        // Success message and redirect
        message.className = 'message success';
        message.innerText = 'Login successful! Redirecting to dashboard...';

        // Redirect after 2 seconds to dashboard.html
        setTimeout(function () {
            window.location.href = 'dashboard.html';
        }, 2000);
    } else {
        // Error message
        message.className = 'message error';
        message.innerText = 'Invalid email or password. Please try again.';
    }
});
