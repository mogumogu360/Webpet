document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const petIndex = urlParams.get('petIndex');
    const userName = localStorage.getItem('userName');
    const pets = JSON.parse(localStorage.getItem(`${userName}_pets`)) || [];

    // If the pet index is invalid, redirect back to the pets list
    if (!petIndex || !pets[petIndex]) {
        window.location.href = 'pets.html';
    }

    // Get the current pet data
    const pet = pets[petIndex];

    // Pre-fill the form with existing pet data
    document.getElementById('petName').value = pet.petName;
    document.getElementById('petType').value = pet.petType;
    document.getElementById('petAge').value = pet.petAge;
    document.getElementById('petBreed').value = pet.petBreed;

    // Handle form submission
    document.getElementById('editPetForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Get updated pet details from the form
        const updatedPet = {
            petName: document.getElementById('petName').value,
            petType: document.getElementById('petType').value,
            petAge: document.getElementById('petAge').value,
            petBreed: document.getElementById('petBreed').value,
        };

        // Update the pet data in localStorage
        pets[petIndex] = updatedPet;
        localStorage.setItem(`${userName}_pets`, JSON.stringify(pets));

        // Redirect back to pets.html
        window.location.href = 'pets.html';
    });
});
