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
    const photographerFolder = photographerFolders[photographerId];

    // Check if the folder is found
    if (!photographerFolder) {
        console.error(`Folder not found for photographer ID: ${photographerId}`);
        return;
    }

    // Filter the media items that belong to the current photographer
    let photographerMedia = window.data.media.filter(media => media.photographerId === photographerId);

    // Check if there are any media items for this photographer
    if (photographerMedia.length === 0) {
        console.error('No media found for the photographer with ID:', photographerId);
        return;
    }

    // Calculate the total likes
    function calculateTotalLikes() {
        return photographerMedia.reduce((total, media) => total + media.likes, 0);
    }

    // Get the photographer's price
    const photographer = window.data.photographers.find(p => p.id === photographerId);
    const photographerPrice = photographer ? photographer.price : 0;

    // Update the global counter with total likes and photographer's price
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

    // Function to display the gallery
    function displayGallery() {
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

    // Make the sorting function available globally for dropdownMenu.js
    window.updateGallery = function(sortBy) {
        photographerMedia = sortGallery(photographerMedia, sortBy);
        displayGallery();
    };

    // Call the function to display the gallery
    displayGallery();
});


//---------------

// document.addEventListener('DOMContentLoaded', async () => {
//     // Ensure data is loaded
//     if (!window.data) {
//         await fetchPhotographersData();  // Fetch data if it's not already loaded
//     }

//     // Get the photographer ID from the URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const photographerId = parseInt(urlParams.get('id'), 10);

//     // Check if data is loaded properly
//     if (!window.data || !window.data.media) {
//         console.error('Data not loaded or data.media is undefined');
//         return;
//     }

//     // Filter the media items that belong to the current photographer
//     const photographerMedia = window.data.media.filter(media => media.photographerId === photographerId);

//     // Check if there are any media items for this photographer
//     if (photographerMedia.length === 0) {
//         console.error('No media found for the photographer with ID:', photographerId);
//         return;
//     }

//     // Function to create a gallery item
//     function createGalleryItem(media) {
//         const item = document.createElement('div');
//         item.classList.add('gallery-item');
        
//         // Check if the media is an image or a video
//         if (media.image) {
//             item.innerHTML = `
//                 <img src="assets/images/${folderName}/${media.image}" alt="${media.title}" class="gallery-image">
//                 <h3 class="media-title">${media.title}</h3>
//                 <p class="media-likes"><span class="like-count">${media.likes}</span> <i class="fa fa-heart like-icon"></i></p>
//             `;
//         } else if (media.video) {
//             item.innerHTML = `
//                 <video controls class="gallery-video">
//                     <source src="assets/images/${folderName}/${media.video}" type="video/mp4">
//                 </video>
//                 <h3 class="media-title">${media.title}</h3>
//                 <p class="media-likes"><span class="like-count">${media.likes}</span> <i class="fa fa-heart like-icon"></i></p>
//             `;
//         }
        
//         // Return the gallery item element
//         return item;
//     }

//     // Function to display the gallery
//     function displayGallery() {
//         // Get the gallery section from the DOM
//         const gallerySection = document.querySelector('#gallery');

//         // Check if the gallery section exists
//         if (!gallerySection) {
//             console.error('Gallery section not found');
//             return;
//         }

//         // Clear any existing content in the gallery section
//         gallerySection.innerHTML = '';

//         // Loop through each media item and create a gallery item
//         photographerMedia.forEach(media => {
//             const galleryItem = createGalleryItem(media);
//             gallerySection.appendChild(galleryItem);
//         });
//     }

//     // Call the function to display the gallery
//     displayGallery();
// });


// ----------------
//  import { sortGallery } from "../utils/galleryUtils";

// document.addEventListener('DOMContentLoaded', async () => {
//     // Ensure data is loaded
//     if (!window.data) {
//         await fetchPhotographersData(); // Fetch data if it's not already loaded
//     }

//     // Get the photographer ID from the URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const photographerId = parseInt(urlParams.get('id'), 10);

//     // Check if data is loaded properly
//     if (!window.data || !window.data.media) {
//         console.error('Data not loaded or data.media is undefined');
//         return;
//     }

//     // Define a mapping for photographer IDs to their respective folder names
//     const photographerFolders = {
//         243: "Mimi",
//         930: "Ellie Rose",
//         82: "Tracy",
//         527: "Nabeel",
//         925: "Rhode",
//         195: "Marcel"
//     };

//     // Get the folder name for the current photographer
//     const photographerFolder = photographerFolders[photographerId];

//     // Check if the folder is found
//     if (!photographerFolder) {
//         console.error(`Folder not found for photographer ID: ${photographerId}`);
//         return;
//     }

//     // Filter the media items that belong to the current photographer
//     const photographerMedia = window.data.media.filter(media => media.photographerId === photographerId);

//     // Check if there are any media items for this photographer
//     if (photographerMedia.length === 0) {
//         console.error('No media found for the photographer with ID:', photographerId);
//         return;
//     }

//     // Log data for debugging
//     console.log('Photographer Folder:', photographerFolder);
//     console.log('Photographer Media:', photographerMedia);

//     // Function to create a gallery item
//     function createGalleryItem(media) {
//         const item = document.createElement('div');
//         item.classList.add('gallery-item');
        
//         // Construct the media path using the mapped folder name
//         let mediaPath;
//         if (media.image) {
//             mediaPath = `assets/images/${photographerFolder}/${media.image}`;
//             item.innerHTML = `
//                 <img src="${mediaPath}" alt="${media.title}" class="gallery-image">
//                 <h3 class="media-title">${media.title}</h3>
//                 <p class="media-likes"><span class="like-count">${media.likes}</span> <i class="fa fa-heart like-icon"></i></p>
//             `;
//         } else if (media.video) {
//             mediaPath = `assets/images/${photographerFolder}/${media.video}`;
//             item.innerHTML = `
//                 <video controls class="gallery-video">
//                     <source src="${mediaPath}" type="video/mp4">
//                 </video>
//                 <h3 class="media-title">${media.title}</h3>
//                 <p class="media-likes"><span class="like-count">${media.likes}</span> <i class="fa fa-heart like-icon"></i></p>
//             `;
//         }

//         // Attach event listener for the like button if needed
//         item.querySelector('.like-icon').addEventListener('click', () => {
//             media.likes += 1;
//             item.querySelector('.like-count').textContent = media.likes;
//             window.refreshLikesOnLikeAdded(photographerMedia); // Update total likes counter
//         });


        
//         // Return the gallery item element
//         return item;
//     }

//     // Function to display the gallery
//     function displayGallery() {
//         // Get the gallery section from the DOM
//         const gallerySection = document.querySelector('#gallery');

//         // Check if the gallery section exists
//         if (!gallerySection) {
//             console.error('Gallery section not found');
//             return;
//         }

//         // Clear any existing content in the gallery section
//         gallerySection.innerHTML = '';

//         // Loop through each media item and create a gallery item
//         photographerMedia.forEach(media => {
//             const galleryItem = createGalleryItem(media);
//             gallerySection.appendChild(galleryItem);
//         });
//     }

//     // Make the sorting function available globally for dropdownMenu.js
//     window.updateGallery = function(sortBy) {
//         photographerMedia = sortGallery(photographerMedia, sortBy);
//         displayGallery();
//     };
  
//     // Initialize the total likes counter
//     window.initializeTotalLikes(mediaItems);

//     // Call the function to display the gallery
//     displayGallery();

    
// });


// ----------------------------

// document.addEventListener('DOMContentLoaded', async () => {
//     // Ensure data is loaded
//     if (!window.data) {
//         await fetchPhotographersData(); // Fetch data if it's not already loaded
//     }

//     // Get the photographer ID from the URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const photographerId = parseInt(urlParams.get('id'), 10);

//     // Check if data is loaded properly
//     if (!window.data || !window.data.media) {
//         console.error('Data not loaded or data.media is undefined');
//         return;
//     }

//     // Define a mapping for photographer IDs to their respective folder names
//     const photographerFolders = {
//         243: "Mimi",
//         930: "Ellie Rose",
//         82: "Tracy",
//         527: "Nabeel",
//         925: "Rhode",
//         195: "Marcel"
//     };

//     // Get the folder name for the current photographer
//     const photographerFolder = photographerFolders[photographerId];

//     // Check if the folder is found
//     if (!photographerFolder) {
//         console.error(`Folder not found for photographer ID: ${photographerId}`);
//         return;
//     }

//     // Filter the media items that belong to the current photographer
//     let photographerMedia = window.data.media.filter(media => media.photographerId === photographerId);

//     // Check if there are any media items for this photographer
//     if (photographerMedia.length === 0) {
//         console.error('No media found for the photographer with ID:', photographerId);
//         return;
//     }


//     // Calculate the total likes
//     function calculateTotalLikes() {
//         return photographerMedia.reduce((total, media) => total + media.likes, 0);
//     }

//     // Get the photographer's price
//     const photographer = window.data.photographers.find(p => p.id === photographerId);
//     const photographerPrice = photographer ? photographer.price : 0;

//     // Update the global counter with total likes and photographer's price
//     function updateGlobalCounter() {
//         const totalLikes = calculateTotalLikes();
//         const totalLikesNumberElement = document.getElementById('total-likes-number');
//         const priceAmountElement = document.getElementById('price-amount');

//         if (totalLikesNumberElement) {
//             totalLikesNumberElement.textContent = totalLikes;
//         } else {
//             console.error('Total likes number element not found');
//         }

//         if (priceAmountElement) {
//             priceAmountElement.textContent = photographerPrice;
//         } else {
//             console.error('Price amount element not found');
//         }
//     }

//     // Initialize the total likes counter and price
//     updateGlobalCounter();












//     // Function to create a gallery item
//     function createGalleryItem(media) {
//         const item = document.createElement('div');
//         item.classList.add('gallery-item');
        
//         // Construct the media path using the mapped folder name
//         let mediaPath;
//         if (media.image) {
//             mediaPath = `assets/images/${photographerFolder}/${media.image}`;
//             item.innerHTML = `
//                 <img src="${mediaPath}" alt="${media.title}" class="gallery-image">
//                 <h3 class="media-title">${media.title}</h3>
//                 <p class="media-likes"><span class="like-count">${media.likes}</span> <i class="fa fa-heart like-icon"></i></p>
//             `;
//         } else if (media.video) {
//             mediaPath = `assets/images/${photographerFolder}/${media.video}`;
//             item.innerHTML = `
//                 <video controls class="gallery-video">
//                     <source src="${mediaPath}" type="video/mp4">
//                 </video>
//                 <h3 class="media-title">${media.title}</h3>
//                 <p class="media-likes"><span class="like-count">${media.likes}</span> <i class="fa fa-heart like-icon"></i></p>
//             `;
//         }

//         // Attach event listener for the like button if needed
//         item.querySelector('.like-icon').addEventListener('click', () => {
//             media.likes += 1;
//             item.querySelector('.like-count').textContent = media.likes;
//             window.refreshLikesOnLikeAdded(photographerMedia); // Update total likes counter
//         });
        
//         // Return the gallery item element
//         return item;
//     }

//     // Function to display the gallery
//     function displayGallery() {
//         // Get the gallery section from the DOM
//         const gallerySection = document.querySelector('#gallery');

//         // Check if the gallery section exists
//         if (!gallerySection) {
//             console.error('Gallery section not found');
//             return;
//         }

//         // Clear any existing content in the gallery section
//         gallerySection.innerHTML = '';

//         // Loop through each media item and create a gallery item
//         photographerMedia.forEach(media => {
//             const galleryItem = createGalleryItem(media);
//             gallerySection.appendChild(galleryItem);
//         });

//         // Initialize the total likes counter
//         window.initializeTotalLikes(photographerMedia);
//     }

//     // Make the sorting function available globally for dropdownMenu.js
//     window.updateGallery = function(sortBy) {
//         photographerMedia = sortGallery(photographerMedia, sortBy);
//         displayGallery();
//     };

//     // Initialize the total likes counter
//     window.initializeTotalLikes = function(mediaItems) {
//         const totalLikes = mediaItems.reduce((acc, media) => acc + media.likes, 0);
//         const likesCounterElement = document.getElementById('totalLikesCounter');
        
//         if (likesCounterElement) {
//             likesCounterElement.textContent = totalLikes;
//         } else {
//             console.error('Total likes counter element not found');
//         }
//     };

//     // Function to refresh the total likes when a like is added
//     window.refreshLikesOnLikeAdded = function(mediaItems) {
//         window.initializeTotalLikes(mediaItems);
//     };

//     // Call the function to display the gallery
//     displayGallery();
// });
