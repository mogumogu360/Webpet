document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const trackingIndex = urlParams.get('trackingIndex');
    const action = urlParams.get('action');
    const userName = localStorage.getItem('userName');
    const trackingData = JSON.parse(localStorage.getItem(`${userName}_trackingData`)) || [];

    if (!trackingIndex || !trackingData[trackingIndex]) {
        window.location.href = 'diet-exercise.html'; // Redirect if index is invalid
    }

    const record = trackingData[trackingIndex];

    // Pre-fill the form with existing data
    if (action === 'edit') {
        document.getElementById('mealName').value = record.mealName;
        document.getElementById('exerciseName').value = record.exerciseName;
        document.getElementById('trackingDate').value = new Date(record.date).toISOString().slice(0, 16);
    }

    // Handle form submission for updating
    document.getElementById('editTrackingForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const updatedMeal = document.getElementById('mealName').value;
        const updatedExercise = document.getElementById('exerciseName').value;
        const updatedDate = document.getElementById('trackingDate').value;

        // Update the record in the array
        record.mealName = updatedMeal;
        record.exerciseName = updatedExercise;
        record.date = updatedDate;

        // Save updated data in localStorage
        trackingData[trackingIndex] = record;
        localStorage.setItem(`${userName}_trackingData`, JSON.stringify(trackingData));

        // Redirect back to the tracking page
        window.location.href = 'diet-exercise.html';
    });
});
