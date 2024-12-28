document.addEventListener('DOMContentLoaded', function () {
    const loggedIn = localStorage.getItem('loggedIn');
    const userName = localStorage.getItem('userName');

    if (!loggedIn) {
        window.location.href = 'login.html';
    } else {
        document.getElementById('userNameDisplay').innerText = `Welcome, ${userName}`;
    }
    
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentList = document.getElementById('appointmentList');
    const appointments = JSON.parse(localStorage.getItem(`${userName}_appointments`)) || [];

    function displayAppointments() {
        appointmentList.innerHTML = '';

        if (appointments.length === 0) {
            appointmentList.innerHTML = '<p class="text-center">No appointments added yet.</p>';
        } else {
            appointments.forEach((appointment, index) => {
                const appointmentCard = document.createElement('div');
                appointmentCard.classList.add('card', 'mb-3');

                appointmentCard.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${appointment.name}</h5>
                        <p class="card-text"><strong>Date:</strong> ${new Date(appointment.date).toLocaleString()}</p>
                        <button class="btn btn-warning edit-btn" data-index="${index}">Edit</button>
                        <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
                    </div>
                `;

                appointmentList.appendChild(appointmentCard);
            });
        }

       /* document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                const newName = prompt("Edit appointment name:", appointments[index].name);
                const newDate = prompt("Edit appointment date (format: YYYY-MM-DDTHH:MM):", appointments[index].date);

                if (newName && newDate) {
                    appointments[index].name = newName;
                    appointments[index].date = newDate;
                    localStorage.setItem(`${userName}_appointments`, JSON.stringify(appointments));
                    displayAppointments();
                }
            });
        });*/
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                window.location.href = `edit_app.html?appointmentIndex=${index}&action=edit`;
            });
        });
        

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                appointments.splice(index, 1);
                localStorage.setItem(`${userName}_appointments`, JSON.stringify(appointments));
                displayAppointments();
            });
        });
    }

    appointmentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const appointmentName = document.getElementById('appointmentName').value;
        const appointmentDate = document.getElementById('appointmentDate').value;

        const newAppointment = {
            name: appointmentName,
            date: appointmentDate
        };

        appointments.push(newAppointment);
        localStorage.setItem(`${userName}_appointments`, JSON.stringify(appointments));
        appointmentForm.reset();
        displayAppointments();
    });

    displayAppointments();

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function (event) {
        event.preventDefault();
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userName');
        window.location.href = 'login.html';
    });
});
