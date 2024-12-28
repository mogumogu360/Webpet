document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const petIndex = urlParams.get('petIndex');
    const action = urlParams.get('action');
    const userName = localStorage.getItem('userName');
    const pets = JSON.parse(localStorage.getItem(`${userName}_pets`)) || [];

    if (!petIndex || !pets[petIndex]) {
        window.location.href = 'health_records.html'; // Redirect if index is invalid
    }

    const pet = pets[petIndex];

    // If editing, pre-fill the form with existing records
    if (action === 'edit') {
        document.getElementById('formTitle').innerText = `Edit Health Record for ${pet.petName}`;
        document.getElementById('medicalHistory').value = pet.petMedicalHistory || '';
        document.getElementById('vaccinationRecords').value = pet.petVaccinationRecords || '';
    } else {
        document.getElementById('formTitle').innerText = `Add Health Record for ${pet.petName}`;
    }

    // Handle form submission
    document.getElementById('healthRecordForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const medicalHistory = document.getElementById('medicalHistory').value;
        const vaccinationRecords = document.getElementById('vaccinationRecords').value;
        const currentDate = new Date().toLocaleString();

        // Update the pet's health records
        if (action === 'edit') {
            pet.petMedicalHistory = medicalHistory;
            pet.petVaccinationRecords = vaccinationRecords;
        } else {
            pet.petMedicalHistory += `\n[${currentDate}] ${medicalHistory}`;
            pet.petVaccinationRecords += `\n[${currentDate}] ${vaccinationRecords}`;
        }

        // Save the updated pets array in localStorage
        pets[petIndex] = pet;
        localStorage.setItem(`${userName}_pets`, JSON.stringify(pets));

        // Redirect back to health records page
        window.location.href = 'health-records.html';
    });
});
