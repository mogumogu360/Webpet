document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const appointmentIndex = urlParams.get('appointmentIndex');
    const action = urlParams.get('action');
    const userName = localStorage.getItem('userName');
    const appointments = JSON.parse(localStorage.getItem(`${userName}_appointments`)) || [];

    if (!appointmentIndex || !appointments[appointmentIndex]) {
        window.location.href = 'appointment.html'; // Redirect if index is invalid
    }

    const appointment = appointments[appointmentIndex];

    // Pre-fill the form with existing appointment data for editing
    if (action === 'edit') {
        document.getElementById('appointmentName').value = appointment.name;
        document.getElementById('appointmentDate').value = new Date(appointment.date).toISOString().slice(0, 16);
    }

    // Handle form submission for updating appointment
    document.getElementById('editAppointmentForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const updatedName = document.getElementById('appointmentName').value;
        const updatedDate = document.getElementById('appointmentDate').value;

        // Update the appointment in the array
        appointment.name = updatedName;
        appointment.date = updatedDate;

        // Save the updated appointments array in localStorage
        appointments[appointmentIndex] = appointment;
        localStorage.setItem(`${userName}_appointments`, JSON.stringify(appointments));

        // Redirect back to appointments page
        window.location.href = 'appointment.html';
    });
});
