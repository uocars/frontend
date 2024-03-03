document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('routePlan');
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get the form data
        const formData = new FormData(form);
        const originInput = formData.get('position');
        const destinationInput = formData.get('destination');

        // Call a function to handle the directions request
        await handleDirectionsRequest(originInput, destinationInput);
    });
});
