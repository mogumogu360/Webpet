document.getElementById('signupForm').addEventListener('submit', function(event) { 
    event.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    // Check for empty fields
    if( !name || !email || !password || !confirmPassword){
        alert("all fields are required")
    }
    // Validate email format using a regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    } 

    // Check password length (at least 8 characters)
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    
    // Retrieve existing users from localStorage, or initialize an empty array
    const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email is already registered
    const existingUser = registeredUsers.find(user => user.email === email);
    if (existingUser) {
        alert('This email is already registered. Please log in.');
        return;
    }

    // Save user details to localStorage
    const user = {
        name: name,
        email: email,
        password: password
    };

    // Add the new user to the array of registered users
    registeredUsers.push(user);
    localStorage.setItem('users', JSON.stringify(registeredUsers)); // Save the user data

    // Show success message and redirect to login page
    document.getElementById('success-message').style.display = 'block';
     
    setTimeout(function() {
        window.location.href = 'login.html'; // Redirect to login page
    }, 2000);
});
