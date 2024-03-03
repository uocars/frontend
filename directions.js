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

async function handleDirectionsRequest(origin, destination) {
    try {
        // Initialize the map
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: { lat: -33.95719133500393, lng: 25.600222789050612 },
            // mapId: '4504f8b37365c3d0', // Uncomment if needed
        });

        // Call Directions Service to get route
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);

        const request = {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
            } else {
                console.error("Error fetching directions:", status);
                // Display a user-friendly error message here if needed
            }
        });
    } catch (error) {
        console.error("Error initializing map:", error);
        // Handle any additional error scenarios
    }
}