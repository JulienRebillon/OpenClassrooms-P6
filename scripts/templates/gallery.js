// Declare global variables and functions at the top
//let sortOrder = "likes"; // Set default sort order globally

// Function to update sortOrder
function updateSortOrder(newSortOrder) {
    sortOrder = newSortOrder; // Update global sortOrder
    displayGallery(); // Refresh gallery
}

// Global function to display the gallery
function displayGallery() {
    // check if the function is properly called
    console.log('displayGallery called with sortOrder:', sortOrder);
    // Ensure data is loaded and photographerMedia is available
    if (!window.photographerMedia) {
        console.error('No media data available to display.');
        return;
    }

    // Sort the media items based on the current sort order
    photographerMedia = sortGallery(photographerMedia, sortOrder);

    // Get the gallery section from the DOM
    const gallerySection = document.querySelector('#gallery');

    // Check if the gallery section exists
    if (!gallerySection) {
        console.error('Gallery section not found');
        return;
    }

    // Clear any existing content in the gallery section
    gallerySection.innerHTML = '';

    // Loop through each media item and create a gallery item
    photographerMedia.forEach(media => {
        const galleryItem = createGalleryItem(media);
        gallerySection.appendChild(galleryItem);
    });

    // Initialize the total likes counter and price
    updateGlobalCounter();
}

// Function to sort the gallery based on the sort order
function sortGallery(mediaItems, sortBy) {
    return mediaItems.sort((a, b) => {
        let orderValue = 'likes';
        switch (sortBy) {
            case 'likes':
                
                orderValue = 'likes';
                return b.likes - a.likes; // Descending order of likes
            case 'title':
                orderValue = 'title';
                return a.title.localeCompare(b.title); // Ascending alphabetical order
            case 'date':
                orderValue = 'date';
                return new Date(b.date) - new Date(a.date); // Descending order of date
            default:
                
                return 0; // No sorting if an unrecognized sort order is provided
        }
    });
}

// Function to create a gallery item
function createGalleryItem(media) {
    const item = document.createElement('div');
    item.classList.add('gallery-item');

    // Construct the media path using the mapped folder name
    let mediaPath;
    if (media.image) {
        mediaPath = `assets/images/${photographerFolder}/${media.image}`;
        item.innerHTML = `
            <img src="${mediaPath}" alt="${media.title}" class="gallery-image">
            <h3 class="media-title">${media.title}</h3>
            <p class="media-likes"><span class="like-count">${media.likes}</span> <i class="fa fa-heart like-icon"></i></p>
        `;
    } else if (media.video) {
        mediaPath = `assets/images/${photographerFolder}/${media.video}`;
        item.innerHTML = `
            <video controls class="gallery-video">
                <source src="${mediaPath}" type="video/mp4">
            </video>
            <h3 class="media-title">${media.title}</h3>
            <p class="media-likes"><span class="like-count">${media.likes}</span> <i class="fa fa-heart like-icon"></i></p>
        `;
    }

    // Attach event listener for the like button
    item.querySelector('.like-icon').addEventListener('click', () => {
        media.likes += 1;
        item.querySelector('.like-count').textContent = media.likes;
        updateGlobalCounter(); // Update total likes counter
    });

    // Return the gallery item element
    return item;
}

// Function to update the global counter with total likes and photographer's price
function updateGlobalCounter() {
    const totalLikes = calculateTotalLikes();
    const totalLikesNumberElement = document.getElementById('total-likes-number');
    const priceAmountElement = document.getElementById('price-amount');

    if (totalLikesNumberElement) {
        totalLikesNumberElement.textContent = totalLikes;
    } else {
        console.error('Total likes number element not found');
    }

    if (priceAmountElement) {
        priceAmountElement.textContent = photographerPrice;
    } else {
        console.error('Price amount element not found');
    }
}

// Calculate the total likes
function calculateTotalLikes() {
    return photographerMedia.reduce((total, media) => total + media.likes, 0);
}

// Get the photographer's price
var photographerPrice = 0;
var photographerMedia = [];
var photographerFolder = '';

document.addEventListener('DOMContentLoaded', async () => {
    // Ensure data is loaded
    if (!window.data) {
        await fetchPhotographersData(); // Fetch data if it's not already loaded
    }

    // Get the photographer ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = parseInt(urlParams.get('id'), 10);

    // Check if data is loaded properly
    if (!window.data || !window.data.media) {
        console.error('Data not loaded or data.media is undefined');
        return;
    }

    // Define a mapping for photographer IDs to their respective folder names
    const photographerFolders = {
        243: "Mimi",
        930: "Ellie Rose",
        82: "Tracy",
        527: "Nabeel",
        925: "Rhode",
        195: "Marcel"
    };

    // Get the folder name for the current photographer
    photographerFolder = photographerFolders[photographerId];

    // Check if the folder is found
    if (!photographerFolder) {
        console.error(`Folder not found for photographer ID: ${photographerId}`);
        return;
    }

    // Filter the media items that belong to the current photographer
    photographerMedia = window.data.media.filter(media => media.photographerId === photographerId);

    // Check if there are any media items for this photographer
    if (photographerMedia.length === 0) {
        console.error('No media found for the photographer with ID:', photographerId);
        return;
    }

    // Get the photographer's price
    const photographer = window.data.photographers.find(p => p.id === photographerId);
    photographerPrice = photographer ? photographer.price : 0;

    // Attach displayGallery to the window object to make it accessible globally
    window.displayGallery = displayGallery;

    // Call the function to display the gallery with default sorting
    displayGallery();
});
