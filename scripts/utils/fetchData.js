// fetchData.js

// Variable to store fetched data
let data = [];
let sortOrder = 'likes';



async function fetchPhotographersData() {
    try {
        const response = await fetch('data/photographers.json'); // Update path if needed
        const jsonData = await response.json();

        // Ensure the data is globally accessible
        window.data = jsonData; // Make the data available globally

        // Dispatch the custom event to signal that data has been loaded
        document.dispatchEvent(new Event('dataLoaded'));

        return jsonData; // Return the data as a promise
    } catch (error) {
        console.error('Error fetching photographers data:', error);
    }
}

// // Fetch data on load and log to console
// fetchPhotographersData().then((data) => console.log('Photographers data loaded:', data));

// Fetch data on load
fetchPhotographersData();