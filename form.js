// chargingstations method in the Main class is responsible for determining the # of charging 
// stations a user should visit based on their ev model, current position, and destination. 
// It calculates the number of stations needed to reach the destination without running out of battery.
class Main {
    chargingstations(model, distance) {
        let stationsAmount = 0;
        if (model === "Mach-E") {
            const maxRange = 402;
            const rangeUse = 320;
            stationsAmount = Math.floor(distance / rangeUse);
            console.log(stationsAmount);
        } else if (model === "F-150 Lightning") {
            const maxRange = 386;
            const rangeUse = 306;
            stationsAmount = Math.floor(distance / rangeUse);
            console.log(stationsAmount);
        }
        return stationsAmount;
    }
}

//To calculate the distance between two points on Earth given their latitude and longitude coordinates
//the Haversine formula.
function calculateDistance(position, destination) {
    const R = 6371e3; // metres Earth radius
    const φ1 = position.lat * Math.PI / 180; // φ, λ in radians (laritude, longitude in radians)
    const φ2 = destination.lat * Math.PI / 180;
    const Δφ = (destination.lat - position.lat) * Math.PI / 180;
    const Δλ = (destination.lng - position.lng) * Math.PI / 180;
    
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in metres, the distance
    return distance;
}

// Modify your existing fetch request to include the CSRF token in the headers
async function submitForm(event) {
    event.preventDefault();
    const form = document.getElementById("routePlan");
    const data = new FormData(form);
    const model = data.get("model");
    const position = data.get("position");
    const destination = data.get("destination");
    console.log(model, position, destination);

    // Retrieve CSRF token from cookie
    const csrfToken = getCSRFToken();

    try {
        const response = await fetch('http://127.0.0.1:8000/calculate-route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken, // Include CSRF token in the headers
            },
            body: JSON.stringify({ model, position, destination }), // Send data as JSON
        });

        if (response.ok) {
            const data = await response.json();
            // Process the route data returned from the server
            console.log(routeData);
        } else {
            console.error('Error fetching route data:', response.statusText);
        }
    } catch (error) {
        // Handle any errors that occur during the fetch request
        console.error('Error fetching route data:', error);
    }
}
// Function to retrieve CSRF token from cookie
function getCSRFToken() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; csrftoken=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');



// Add an event listener to the form submit event
window.addEventListener("DOMContentLoaded", (event) => {
    const form = document.getElementById("routePlan");
    if (form) {
        form.addEventListener("submit", submitForm);
    }
});