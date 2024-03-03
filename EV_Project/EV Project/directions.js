google.maps.importLibrary("maps").then(() => {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: -33.95719133500393, lng: 25.600222789050612 },
        // mapId: '4504f8b37365c3d0',
    });  
    // Call Directions Service to get route
const directionsService = new google.maps.DirectionsService();
const directionsRenderer = new google.maps.DirectionsRenderer();
directionsRenderer.setMap(map);

function input(){
    const position = document.getElementById("position")
    const positionInput = position.value;
    const destination = document.getElementById("destination")
    const destinationInput = destination.value;
    const request = {
    origin: positionInput,
    destination: destinationInput,
    travelMode: google.maps.TravelMode.DRIVING
};
}


directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(response);
    } else {
        console.error("Error fetching directions:", status);
    }
});});
