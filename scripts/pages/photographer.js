// //Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
       
        
    try {
        const response = await fetch('Data/photographers.json'); 
        const data = await response.json();

        // fetch photographer's data under the "photographers" key in the JSON file
        const photographers = data.photographers;
        const media = data.media;

        return { photographers, media };

        
        
    } catch (error) {
        console.error('Error fetching photographers data', error);
        return { photographers: [] }; // Return an empty array in case of an error
        
    }
    
}


async function init() {
    try {
        // Retrieve photographers' data
        const { photographers } = await getPhotographers();

        // Extract photographer's name from the URL
        const urlSearchParams = new URLSearchParams(window.location.search);
        const photographerName = urlSearchParams.get('name');

        // Search array for the photographer's name
        const photographerData = photographers.find(photographer => photographer.name === photographerName);

        // If found, display details
        if (photographerData) {
            const photographer = photographerTemplate(photographerData);
            const userDetails = photographer.getUserCardDOM();
            document.querySelector('.userDetails').appendChild(userDetails);
        } else {
            console.error('Photographer not found in the data');
        }

        // Display other data
        displayData(photographers);
    } catch (error) {
        console.error('Error initializing the page', error);
        // Handle initialization error, e.g., display an error message on the page
    }
}

init();


// async function init() {
//     try {
//         // Retrieve photographers' data
//         const { photographers } = await getPhotographers();
//         displayData(photographers);
//     } catch (error) {
//         console.error('Error initializing the page', error);
//         // Handle initialization error, e.g., display an error message on the page
//     }
// }

// init();

