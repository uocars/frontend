// Places API to search for nearby EV charging stations based on the user's current location 
// and vehicle battery percentage.

// used the PlacesService class provided by the Google Maps JavaScript API to perform nearby search requests.
// Initialize PlacesService
var placesService = new google.maps.places.PlacesService(map);

// Define search parameters
var request = {
  location: userLocation,
  radius: 10000, // Search radius in meters
  keyword: 'EV charging station',
};

// Perform nearby search
placesService.nearbySearch(request, callback);

// Callback function to handle search results
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    // Iterate through the results and display them on the map
    for (var i = 0; i < results.length; i++) {
      // Display marker for each charging station
      createMarker(results[i]);
    }
  }
}
// Define battery percentage thresholds and corresponding search radius values
var batteryThresholds = [75, 50]; // Battery percentage thresholds
var searchRadiusValues = [10000, 5000, 2000]; // Corresponding search radius values in meters

// Function to calculate search radius based on battery percentage
function calculateSearchRadius(batteryPercentage) {
  // Determine the appropriate search radius based on battery percentage
  var searchRadius;
  for (var i = 0; i < batteryThresholds.length; i++) {
    if (batteryPercentage >= batteryThresholds[i]) {
      searchRadius = searchRadiusValues[i];
      break;
    }
  }
  // If battery percentage is below the lowest threshold, use the smallest search radius
  if (searchRadius === undefined) {
    searchRadius = searchRadiusValues[searchRadiusValues.length - 1];
  }
  return searchRadius;
}

// Example usage:
var batteryPercentage = 65; // Example battery percentage
var searchRadius = calculateSearchRadius(batteryPercentage);

// Use the calculated search radius in the Places API nearby search request
var request = {
  location: userLocation,
  radius: searchRadius,
  keyword: 'EV charging station',
};

// Perform nearby search with the adjusted search parameters
placesService.nearbySearch(request, callback);
// Initialize the map
var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7128, lng: -74.0060}, // Example center (e.g., New York City)
    zoom: 12, // Adjust the initial zoom level as needed
  });
  
  // Function to create a marker for a charging station
  function createMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name,
    });
  
    // Add click event listener to marker (optional)
    marker.addListener('click', function() {
      // Show additional information about the charging station, if desired
      // For example, you can display the name, address, or other details
      // in an info window or sidebar panel.
    });
  }
  
  // Function to handle search results from Places API nearby search
  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // Iterate through the results and create markers for each charging station
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }
  
  // Example usage:
  // Assume you have performed a nearby search using the Places API
  // and obtained the results in the 'results' variable.
  // Call the callback function to create markers for the charging stations.
  callback(results, google.maps.places.PlacesServiceStatus.OK);
  