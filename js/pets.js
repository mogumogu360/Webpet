document.addEventListener('DOMContentLoaded', function () {
    const loggedIn = localStorage.getItem('loggedIn');
    const userName = localStorage.getItem('userName');

    if (!loggedIn) {
        // Redirect to login if not logged in
        window.location.href = 'login.html';
    } else {
        // Display user's name on the navbar
        document.getElementById('userNameDisplay').innerText = `Welcome, ${userName}`;
    }

    // Load pets specific to the logged-in user from localStorage
    const pets = JSON.parse(localStorage.getItem(`${userName}_pets`)) || [];
    const petsList = document.getElementById('petsList');

    if (pets.length === 0) {
        petsList.innerHTML = '<p class="text-center">No pets found. Please create a new pet profile.</p>';
    } else {
        pets.forEach((pet, index) => {
            petsList.innerHTML += `
                <div class="card pet-card">
                    <div class="card-body">
                        <h5 class="card-title">${pet.petName} (${pet.petType})</h5>
                        <p class="card-text"><strong>Age:</strong> ${pet.petAge} years</p>
                        <p class="card-text"><strong>Breed:</strong> ${pet.petBreed || 'N/A'}</p>
                        <a href="health-records.html?petIndex=${index}" class="btn btn-primary">View Health Records</a>
                        <button class="btn btn-warning edit-pet-btn" data-index="${index}">Edit</button>
                        <button class="btn btn-danger delete-pet-btn" data-index="${index}">Delete</button>
                    </div>
                </div>
            `;
        });
    }

    // Edit pet information
   /* document.querySelectorAll('.edit-pet-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            const pet = pets[index];
            const newPetName = prompt("Edit Pet Name:", pet.petName);
            const newPetType = prompt("Edit Pet Type:", pet.petType);
            const newPetAge = prompt("Edit Pet Age:", pet.petAge);
            const newPetBreed = prompt("Edit Pet Breed:", pet.petBreed);

            if (newPetName && newPetType && newPetAge) {
                pets[index] = {
                    ...pet,
                    petName: newPetName,
                    petType: newPetType,
                    petAge: newPetAge,
                    petBreed: newPetBreed
                };
                localStorage.setItem(`${userName}_pets`, JSON.stringify(pets));
                alert('Pet profile updated successfully!');
                window.location.reload();
            } else {
                alert('Please fill all fields.');
            }
        });
    });*/
    // Edit pet information
    document.querySelectorAll('.edit-pet-btn').forEach(button => {
    button.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        window.location.href = `edit_pet.html?petIndex=${index}`;
    });
});


    // Delete pet
    document.querySelectorAll('.delete-pet-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            if (confirm('Are you sure you want to delete this pet?')) {
                pets.splice(index, 1);
                localStorage.setItem(`${userName}_pets`, JSON.stringify(pets));
                alert('Pet profile deleted successfully!');
                window.location.reload();
            }
        });
    });

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function (event) {
        event.preventDefault();
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userName');
        window.location.href = 'login.html';
    });
});
