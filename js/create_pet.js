document.addEventListener('DOMContentLoaded', function () {
    const loggedIn = localStorage.getItem('loggedIn');
    const userName = localStorage.getItem('userName');

    if (!loggedIn) {
        window.location.href = 'login.html';
    } else {
        document.getElementById('userNameDisplay').innerText = `Welcome, ${userName}`;
    }

    // Handle form submission for creating a pet profile
    const createPetForm = document.getElementById('createPetForm');
    createPetForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        const petName = document.getElementById('petName').value;
        const petType = document.getElementById('petType').value;
        const petAge = document.getElementById('petAge').value;
        const petBreed = document.getElementById('petBreed').value || 'N/A';
        const petMedicalHistory = document.getElementById('petMedicalHistory').value || 'No records yet.';
        const petVaccinationRecords = document.getElementById('petVaccinationRecords').value || 'No records yet.';

        // Fetch the user's existing pets from localStorage
        const pets = JSON.parse(localStorage.getItem(`${userName}_pets`)) || [];

        // Add the new pet data to the array
        const newPet = {
            petName,
            petType,
            petAge,
            petBreed,
            petMedicalHistory,
            petVaccinationRecords
        };
        pets.push(newPet);

        // Save the updated pet list back to localStorage
        localStorage.setItem(`${userName}_pets`, JSON.stringify(pets));

        alert("Pet profile created successfully!");

        // Redirect to pets.html to display all pets
        window.location.href = 'pets.html';
    });

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function (event) {
        event.preventDefault();
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userName');
        window.location.href = 'login.html';
    });
});
