// document.addEventListener('DOMContentLoaded', () => {
//     function createGallery(media) {
//         const gallery = document.getElementById('gallery');
//         gallery.innerHTML = media.map(item => `
//             <div class="media-item">
//                 ${item.image ? `<img src="assets/media/${item.image}" alt="${item.title}"/>` : ''}
//                 ${item.video ? `<video controls src="assets/media/${item.video}" alt="${item.title}"></video>` : ''}
//                 <h3>${item.title}</h3>
//                 <p>${item.likes} likes</p>
//             </div>
//         `).join('');
//     }

//     const urlParams = new URLSearchParams(window.location.search);
//     const photographerId = urlParams.get('id');
//     const photographerMedia = data.media.filter(m => m.photographerId == photographerId);
//     createGallery(photographerMedia);
// });

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
        243: "mimi",          // Example: Mimi Keel
        930: "ellie rose",    // Example: Ellie-Rose Wilkens
        82: "tracy",          // Example: Tracy Galindo
        527: "nabeel",        // Example: Nabeel Bradford
        925: "rhode",         // Example: Rhode Dubois
        195: "marcel"         // Example: Marcel Nikolic
        // Add other photographers and their folder mappings as needed
    };

    // Get the folder name for the current photographer
    const photographerFolder = photographerFolders[photographerId];

    // Check if the folder is found
    if (!photographerFolder) {
        console.error(`Folder not found for photographer ID: ${photographerId}`);
        return;
    }

    // Filter the media items that belong to the current photographer
    const photographerMedia = window.data.media.filter(media => media.photographerId === photographerId);

    // Check if there are any media items for this photographer
    if (photographerMedia.length === 0) {
        console.error('No media found for the photographer with ID:', photographerId);
        return;
    }

    // Function to create a gallery item
    function createGalleryItem(media) {
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        
        // Construct the media path using the mapped folder name
        let mediaPath;
        if (media.image) {
            mediaPath = `assets/media/${photographerFolder}/${media.image}`;
            item.innerHTML = `
                <img src="${mediaPath}" alt="${media.title}" class="gallery-image">
                <h3 class="media-title">${media.title}</h3>
                <p class="media-likes"><span class="like-count">${media.likes}</span> <i class="fa fa-heart like-icon"></i></p>
            `;
        } else if (media.video) {
            mediaPath = `assets/media/${photographerFolder}/${media.video}`;
            item.innerHTML = `
                <video controls class="gallery-video">
                    <source src="${mediaPath}" type="video/mp4">
                </video>
                <h3 class="media-title">${media.title}</h3>
                <p class="media-likes"><span class="like-count">${media.likes}</span> <i class="fa fa-heart like-icon"></i></p>
            `;
        }
        
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
    }

    // Call the function to display the gallery
    displayGallery();
});
