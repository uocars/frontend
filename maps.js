// Initialize the map
window.initMap = function () {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
};

// Call the initMap function when the window loads
window.onload = function () {
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
        initMap();
    } else {
        console.error('Google Maps API is not loaded.');
    }
};


// Check if geolocation is supported
if (navigator.geolocation) {
    // Get the user's current position
    navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        // // Use userLocation to center the map or perform other actions
        // map.setCenter(userLocation);

        // // add a marker at the user's location:
        // const userMarker = new google.maps.Marker({
        //     position: userLocation,
        //     map: map,
        //     title: "Your Location"
        // });
    });
} else {
    console.error("Geolocation is not supported by this browser.");
}