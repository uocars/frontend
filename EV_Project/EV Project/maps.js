// Initialize the map
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
}
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        // Use userLocation to center the map or perform other actions
    });
} else {
    console.error("Geolocation is not supported by this browser.");
}
// Path: frontend/EV_Project/EV%20Project/maps.js