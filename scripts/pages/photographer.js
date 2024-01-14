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
        displayData(photographers);
    } catch (error) {
        console.error('Error initializing the page', error);
        // Handle initialization error, e.g., display an error message on the page
    }
}

init();

