

// Function to update sortOrder
function updateSortOrder(newSortOrder) {
    sortOrder = newSortOrder; // Update global sortOrder
    displayGallery(); // Refresh gallery
}

// Global function to display the gallery
function displayGallery(sortOrder = 'likes', sortDirection = 'desc') {
    console.log('displayGallery called with sortOrder:', sortOrder, 'sortDirection:', sortDirection);

    // Ensure data is loaded and photographerMedia is available
    if (!window.photographerMedia) {
        console.error('No media data available to display.');
        return;
    }

    // Sort the media items based on the current sort order and direction
    photographerMedia = sortGallery(photographerMedia, sortOrder, sortDirection);

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


// Function to sort the gallery based on the sort order and direction
function sortGallery(mediaItems, sortBy, sortDirection = 'desc') {
    return mediaItems.sort((a, b) => {
        let comparison = 0;
        switch (sortBy) {
            case 'likes':
                comparison = b.likes - a.likes; // Descending order of likes
                break;
            case 'title':
                comparison = a.title.localeCompare(b.title); // Ascending alphabetical order
                break;
            case 'date':
                comparison = new Date(b.date) - new Date(a.date); // Descending order of date
                break;
            default:
                comparison = 0; // No sorting if an unrecognized sort order is provided
                break;
        }

        // If sortDirection is 'asc', reverse the comparison result
        if (sortDirection === 'asc') {
            comparison = -comparison;
        }

        return comparison;
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
            <div class="gallery-card" data-media="${media.id}">
                <img src="${mediaPath}" alt="${media.title}" class="gallery-image">
            </div>
            <div class="mediaContainer">
                <h3 class="media-title">${media.title}</h3>
                <p class="media-likes"><span class="like-count">${media.likes}</span> <i class="fa fa-heart like-icon"></i></p>
            </div>
        `;
    } else if (media.video) {
        mediaPath = `assets/images/${photographerFolder}/${media.video}`;
        item.innerHTML = `
            <div class="gallery-card" data-media="${media.id}">
                <video controls class="gallery-video">
                    <source src="${mediaPath}" type="video/mp4">
                </video>
            </div>
            <div class="mediaContainer">
                <h3 class="media-title">${media.title}</h3>
                <p class="media-likes"><span class="like-count">${media.likes}</span> <i class="fa fa-heart like-icon"></i></p>
            </div>
        `;
    }

    // Attach event listener for the like button
    item.querySelector('.like-icon').addEventListener('click', () => {
        media.likes += 1;
        item.querySelector('.like-count').textContent = media.likes;
        updateGlobalCounter(); // Update total likes counter
    });

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
