document.addEventListener('DOMContentLoaded', function () {
    const loggedIn = localStorage.getItem('loggedIn');
    const userName = localStorage.getItem('userName');

    if (!loggedIn) {
        window.location.href = 'login.html';
    } else {
        document.getElementById('userNameDisplay').innerText = `Welcome, ${userName}`;
    }

    const trackingForm = document.getElementById('trackingForm');
    const trackingList = document.getElementById('trackingList');
    const trackingData = JSON.parse(localStorage.getItem(`${userName}_trackingData`)) || [];
 
    function displayTrackingData() {
        trackingList.innerHTML = '';

        if (trackingData.length === 0) {
            trackingList.innerHTML = '<p class="text-center">No diet or exercise data added yet.</p>';
        } else {
            trackingData.forEach((item, index) => {
                const trackingCard = document.createElement('div');
                trackingCard.classList.add('card', 'mb-3');

                trackingCard.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">Diet: ${item.mealName}</h5>
                        <p class="card-text"><strong>Exercise:</strong> ${item.exerciseName}</p>
                        <p class="card-text"><strong>Date:</strong> ${new Date(item.date).toLocaleString()}</p>
                        <button class="btn btn-warning edit-btn" data-index="${index}">Edit</button>
                        <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
                    </div>
                `;

                trackingList.appendChild(trackingCard);
            });
        }

       /* document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                const newMeal = prompt("Edit meal name:", trackingData[index].mealName);
                const newExercise = prompt("Edit exercise routine:", trackingData[index].exerciseName);
                const newDate = prompt("Edit date (format: YYYY-MM-DDTHH:MM):", trackingData[index].date);

                if (newMeal && newExercise && newDate) {
                    trackingData[index].mealName = newMeal;
                    trackingData[index].exerciseName = newExercise;
                    trackingData[index].date = newDate;
                    localStorage.setItem(`${userName}_trackingData`, JSON.stringify(trackingData));
                    displayTrackingData();
                }
            });
        });*/
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                window.location.href = `edit_diet.html?trackingIndex=${index}&action=edit`;
            });
        });
        

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                trackingData.splice(index, 1);
                localStorage.setItem(`${userName}_trackingData`, JSON.stringify(trackingData));
                displayTrackingData();
            });
        });
    }

    trackingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const mealName = document.getElementById('mealName').value;
        const exerciseName = document.getElementById('exerciseName').value;
        const trackingDate = document.getElementById('trackingDate').value;

        const newEntry = {
            mealName: mealName,
            exerciseName: exerciseName,
            date: trackingDate
        };

        trackingData.push(newEntry);
        localStorage.setItem(`${userName}_trackingData`, JSON.stringify(trackingData));
        trackingForm.reset();
        displayTrackingData();
    });

    displayTrackingData();

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function (event) {
        event.preventDefault();
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userName');
        window.location.href = 'login.html';
    });
});
