// Ensure the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', async () => {

    // Wait for data to be loaded
    if (!window.data) {
        await fetchPhotographersData();
    }


    // Function to create a photographer card
    function createPhotographerCard(photographer) {
        // Create the card element
        const card = document.createElement('div');
        card.classList.add('photographer-card');
        
        // Create the card content
        card.innerHTML = `
            <a href="photographer.html?id=${photographer.id}" class="photographer-link">
                <img src="assets/photographers/${photographer.portrait}" alt="${photographer.name}" class="photographer-portrait">
                <h2 class="photographer-name">${photographer.name}</h2>
            </a>
            <p class="photographer-city">${photographer.city}, ${photographer.country}</p>
            <p class="photographer-tagline">${photographer.tagline}</p>
            <p class="photographer-price">${photographer.price}€/jour</p>
        `;
        
        // Return the card element
        return card;
    }
    
    function displayPhotographerCards() {
        // Get the photographer section from the DOM
        const photographerSection = document.querySelector('.photographer_section');
    
        // Check if the photographer section exists
        if (!photographerSection) {
            console.error('Photographer section not found');
            return;
        } else {
            console.log('TEST - Photographer section found');
        }
    
        // Check if data is loaded
        if (!window.data || !window.data.photographers) {
            console.error('Data not loaded or data.photographers is undefined');
            return;
        } else {
            console.log('TEST - Data loaded successfully');
        }
    
        // Loop through each photographer and create a card
        window.data.photographers.forEach(photographer => {
            const card = createPhotographerCard(photographer);
            photographerSection.appendChild(card);
        });
    }
    


    // Call the function to display the photographer cards
    displayPhotographerCards();
});
