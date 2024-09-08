// fetchData.js

// Variable to store fetched data
let data = [];

// // Function to fetch data from the JSON file
// async function fetchPhotographersData() {
//   try {
//     // Fetch the JSON data
//     const response = await fetch('../data/photographers.json');
    
//     // Check if the response is ok (status code 200-299)
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
    
//     // Parse the JSON data
//     data = await response.json();

    
//     // Optionally log the data to the console to verify
//     console.log('Fetched data:', data);
//   } catch (error) {
//     // Log any errors to the console
//     console.error('Error fetching data:', error);
//   }
// }

// // Call the function to fetch data
// fetchPhotographersData();

async function fetchPhotographersData() {
    try {
        const response = await fetch('data/photographers.json'); // Update path if needed
        const jsonData = await response.json();

        // Ensure the data is globally accessible
        window.data = jsonData; // Make the data available globally
        return jsonData; // Return the data as a promise
    } catch (error) {
        console.error('Error fetching photographers data:', error);
    }
}

// // Fetch data on load and log to console
// fetchPhotographersData().then((data) => console.log('Photographers data loaded:', data));

// Fetch data on load
fetchPhotographersData();