// chargingstations method in the Main class is responsible for determining the # of charging 
//stations a user should visit based on their ev model, current position, and destination. 
//It calculates the number of stations needed to reach the destination without running out of battery.
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
//you can use the Haversine formula.
function calculateDistance(position, destination) {
    const R = 6371; // Radius of the Earth in kilometers

    const lat1 = position.lat; // Latitude of position in degrees
    const lon1 = position.lng; // Longitude of position in degrees

    const lat2 = destination.lat; // Latitude of destination in degrees
    const lon2 = destination.lng; // Longitude of destination in degrees

    const dLat = (lat2 - lat1) * (Math.PI / 180); // Difference in latitude in radians
    const dLon = (lon2 - lon1) * (Math.PI / 180); // Difference in longitude in radians

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers

    return distance;
}
async function submitForm(event) {
    event.preventDefault();
    const form = document.getElementById("routePlan");
    const data = new FormData(form);
    const model = data.get("model");
    const position = data.get("position");
    const destination = data.get("destination");
    console.log(model, position, destination);
    // Call the API
    await calculateRoute(model, position, destination);
}

async function getRoute(model, position, destination) {
    try {
        const response = await fetch('/calculateRoute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ model, position, destination })
        });
        const data = await response.json();
        // Handle the response data as needed (e.g., display the route on the map)
        console.log(data);
    } catch (error) {
        console.error('Error calculating route:', error);
        // Handle errors appropriately
    }
}