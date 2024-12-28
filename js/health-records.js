document.addEventListener('DOMContentLoaded', function () {
    const loggedIn = localStorage.getItem('loggedIn');
    const userName = localStorage.getItem('userName');

    if (!loggedIn) {
        
        window.location.href = 'login.html';
    } else {
        document.getElementById('userNameDisplay').innerText = `Welcome, ${userName}`;
    }

    // Fetch pets for the logged-in user
    const pets = JSON.parse(localStorage.getItem(`${userName}_pets`)) || [];
    const healthRecordsList = document.getElementById('healthRecordsList');

    if (pets.length === 0) {
        healthRecordsList.innerHTML = '<p class="text-center">No pets found. Please create a pet profile first.</p>';
    } else {
        pets.forEach((pet, index) => {
            const card = document.createElement('div');
            card.classList.add('col-md-6', 'mb-3');

            // Create card HTML for each pet
            card.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${pet.petName} (${pet.petType})</h5>
                        <p class="card-text"><strong>Age:</strong> ${pet.petAge}</p>
                        <p class="card-text"><strong>Breed:</strong> ${pet.petBreed || 'N/A'}</p>
                        <p class="card-text"><strong>Medical History:</strong> ${formatRecords(pet.petMedicalHistory)}</p>
                        <p class="card-text"><strong>Vaccination Records:</strong> ${formatRecords(pet.petVaccinationRecords)}</p>
                        <button class="btn btn-primary add-record-btn" data-index="${index}">Add New Health Record</button>
                        <button class="btn btn-warning edit-record-btn" data-index="${index}">Edit Health Record</button>
                        <button class="btn btn-danger delete-record-btn" data-index="${index}">Delete Health Record</button>
                    </div>
                </div>
            `;

            healthRecordsList.appendChild(card);
        });
    }

    /*Add new health record
    document.querySelectorAll('.add-record-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            const pet = pets[index];

            const newMedicalHistory = prompt("Enter new medical condition:");
            const newVaccinationRecord = prompt("Enter new vaccination record:");
            const currentDate = new Date().toLocaleString();

            if (newMedicalHistory || newVaccinationRecord) {              
                pet.petMedicalHistory += `\n[${currentDate}] ${newMedicalHistory || ''}`;
                pet.petVaccinationRecords += `\n[${currentDate}] ${newVaccinationRecord || ''}`;
-
                // Update localStorage with new records
                localStorage.setItem(`${userName}_pets`, JSON.stringify(pets));

                alert("New health record added successfully!");
                window.location.reload(); // Reload the page to display updated records
            } else {
                alert("No new record added.");
            }
        });
    });

    // Edit existing health record
    document.querySelectorAll('.edit-record-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            const pet = pets[index];

            const updatedMedicalHistory = prompt("Update medical history:", pet.petMedicalHistory);
            const updatedVaccinationRecord = prompt("Update vaccination record:", pet.petVaccinationRecords);

            if (updatedMedicalHistory !== null) pet.petMedicalHistory = updatedMedicalHistory;
            if (updatedVaccinationRecord !== null) pet.petVaccinationRecords = updatedVaccinationRecord;

            // Update localStorage with edited records
            localStorage.setItem(`${userName}_pets`, JSON.stringify(pets));

            alert("Health record updated successfully!");
            window.location.reload(); // Reload the page to display updated records
        });
    });*/
    // Add new health record
    document.querySelectorAll('.add-record-btn').forEach(button => {
    button.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        window.location.href = `add_edit_health_record.html?petIndex=${index}&action=add`;
    });
});

// Edit existing health record
    document.querySelectorAll('.edit-record-btn').forEach(button => {
    button.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        window.location.href = `add_edit_health_record.html?petIndex=${index}&action=edit`;
    });
});


    // Delete existing health record
    document.querySelectorAll('.delete-record-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            const pet = pets[index];

            if (confirm(`Are you sure you want to delete the health records for ${pet.petName}?`)) {
                pet.petMedicalHistory = ''; // Clear the medical history
                pet.petVaccinationRecords = ''; // Clear the vaccination records

                // Update localStorage with cleared records
                localStorage.setItem(`${userName}_pets`, JSON.stringify(pets));

                alert("Health record deleted successfully!");
                window.location.reload(); // Reload the page to display updated records
            }
        });
    });

    // Function to format records with line breaks
    function formatRecords(records) {
        return records ? records.replace(/\n/g, '<br>') : 'No records yet.';
    }

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function (event) {
        event.preventDefault();
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userName');
        window.location.href = 'login.html';
    });
});
