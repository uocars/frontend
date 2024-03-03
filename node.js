const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 5500;

// Middleware to parse JSON bodies
app.use(express.json());

// Handle POST requests to calculate the route
app.post('/calculateRoute', async (req, res) => {
    try {
        // Extract destination and position data from the request body
        const { destination, position } = req.body;
        
        // Make a POST request to the Google Directions API
        const response = await fetch('https://maps.googleapis.com/maps/api/directions/json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                origin: position,
                destination: destination,
                key: 'AIzaSyCpvE1r_G8-HhITGBxNSxT6rSZ6ywb3Q_U' // Directions API key
            })
        });
        
        // Parse the response and send it back to the client
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${5500}`);
});
