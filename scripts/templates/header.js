// document.addEventListener('DOMContentLoaded', () => {
//     function createHeader(photographer) {
//         const header = document.getElementById('header');
//         header.innerHTML = `
//             <a href="index.html">
//                 <img src="assets/images/logo.png" class="logo" alt="FishEye logo"/>
//                 <span class="sr-only">Retour à la plage d'accueil</span>
//             </a>
//             <div class="photograph-header">
//                 <h1>${photographer.name}</h1>
//                 <p>${photographer.city}, ${photographer.country}</p>
//                 <p>${photographer.tagline}</p>
//                 <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
//                 <img src="assets/photographers/${photographer.portrait}" class="photographer-portrait" alt="${photographer.name}">
//             </div>
//         `;
//     }

//     // Fetch photographer data and create the header
//     const urlParams = new URLSearchParams(window.location.search);
//     const photographerId = urlParams.get('id');
//     const photographer = data.photographers.find(p => p.id == photographerId);
//     createHeader(photographer);
// });

document.addEventListener('DOMContentLoaded', async () => {
    // Ensure data is loaded
    if (!window.data) {
        await fetchPhotographersData();
    }

    // Get the photographer ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = parseInt(urlParams.get('id'), 10);

    // Check if data is loaded properly
    if (!window.data || !window.data.photographers) {
        console.error('Data not loaded or data.photographers is undefined');
        return;
    }

    // Find the photographer by ID
    const photographer = window.data.photographers.find(p => p.id === photographerId);

    // Check if photographer exists
    if (!photographer) {
        console.error('Photographer not found');
        return;
    }

    // Render the header section with photographer data
    const headerSection = document.querySelector('#header-profile');

    if (headerSection) {
        headerSection.innerHTML = `
            <div class="header-left">
                <h1>${photographer.name}</h1>
                <p class="profile-location">${photographer.city}, ${photographer.country}</p>
                <p>${photographer.tagline}</p>
            </div>
            <div class="header-center">
                <button class="contact-button" onclick="displayModal()">Contactez-moi</button>
            </div>
            <div class="header-right">
                <img src="assets/photographers/${photographer.portrait}" alt="${photographer.name}" class="photographer-header-portrait">
            </div>
        `;
    } else {
        console.error('Header section not found');
    }
});
