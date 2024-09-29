document.addEventListener('DOMContentLoaded', () => {

    const mediaProvider = () => Array.from(document.querySelectorAll('.gallery-card'));

    // Function to wait for the gallery elements to be loaded
    const waitForGallery = () => new Promise((resolve) => {
        const observer = new MutationObserver(() => {
            if (mediaProvider().length > 0) {
                observer.disconnect(); // Stop observing once the gallery is loaded
                resolve(); // Resolve the promise
            }
        });

        // Observe changes in the gallery section
        const gallerySection = document.querySelector('#gallery');
        if (gallerySection) {
            observer.observe(gallerySection, { childList: true, subtree: true });
        } else {
            console.error('Gallery section not found.');
        }
    });

    // Function to wait for data to be loaded
    const waitForData = () => new Promise((resolve) => {
        if (window.data && window.data.photographers && window.data.media) {
            resolve(); // Data is already available, resolve immediately
        } else {
            document.addEventListener('dataLoaded', () => resolve()); // Wait for dataLoaded event
        }
    });

    // Initialize the lightbox once data and gallery are ready
    const initLightbox = async () => {
        // Wait for data and gallery to be available
        await waitForData();
        await waitForGallery();

        const photographerId = getPhotographerIdFromURL();
        const photographer = window.data.photographers.find(p => p.id === photographerId);

        if (!photographer) {
            console.error('Photographer not found.');
            return;
        }

        // Filter the media for the specific photographer
        const mediasList = window.data.media.filter(m => m.photographerId === photographerId);

        displayLightbox(photographer, mediasList);
    };

    // Function to get the photographer ID from the URL
    const getPhotographerIdFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('id'));
    };

    const displayLightbox = (photographer, mediasList) => {
        const lightbox = document.getElementById('lightbox');
        // const lightboxWrapper = document.querySelector('.lightbox_wrapper');
        const btnClose = document.querySelector('.btn_close_lightbox');
        const btnPrevious = document.querySelector('.btn_previous');
        const btnNext = document.querySelector('.btn_next');
        const lightboxMedia = document.querySelector('.lightbox_media');


        // Define a mapping for photographer IDs to folder names
        const photographerFolders = {
            243: "Mimi",
            930: "Ellie Rose",
            82: "Tracy",
            527: "Nabeel",
            925: "Rhode",
            195: "Marcel"
        };

    // Get the correct folder name for the current photographer
        const folderName = photographerFolders[photographer.id] || photographer.name;

        if (mediaProvider().length === 0) {
            console.error('No media elements found in the gallery.');
            return;
        }

        let currentIndex = 0;

        mediaProvider().forEach(media => {
            media.addEventListener('click', (event) => {
                event.preventDefault();
                const mediaId = media.dataset.media;

                const mediaIndex = mediasList.findIndex(media => media.id == mediaId);
                if (mediaIndex === -1) {
                    console.error('Media ID not found in mediasList.');
                    return;
                }

                currentIndex = mediaIndex;
                lightbox.style.display = 'flex';
                btnClose.focus();
                lightboxTemplate();
            });
        });

        const lightboxTemplate = () => {
            const currentMedia = mediasList[currentIndex];

            lightboxMedia.innerHTML = `
                ${currentMedia.image ? `
                <img src="./assets/images/${folderName}/${currentMedia.image}" alt="${currentMedia.alt}">` : 
                `<video controls aria-label="${currentMedia.alt}"><source src="./assets/images/${folderName}/${currentMedia.video}" type="video/mp4"></video>`}

                <figcaption>${currentMedia.title}</figcaption>
            `;
        };

        const closeLightbox = () => {
            lightbox.style.display = 'none';
            lightboxMedia.innerHTML = '';
        };

        const nextMedia = () => {
            currentIndex++;
            if (currentIndex > mediasList.length - 1) currentIndex = 0;
            lightboxTemplate();
        };

        const previousMedia = () => {
            currentIndex--;
            if (currentIndex < 0) currentIndex = mediasList.length - 1;
            lightboxTemplate();
        };

        document.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    previousMedia();
                    break;
                case 'ArrowRight':
                    nextMedia();
                    break;
            }
        });

        btnPrevious.addEventListener('click', () => previousMedia());
        btnNext.addEventListener('click', () => nextMedia());
        btnClose.addEventListener('click', () => closeLightbox());
    };

    // Call initLightbox to start the process
    initLightbox();
});



//...........................

// document.addEventListener('DOMContentLoaded', () => {

//     const mediaProvider = Array.from(document.querySelectorAll('.gallery-card'));

//     const waitForDataAndGallery = (callback) => {
//         const checkInterval = setInterval(() => {
//             // const mediaProvider = document.querySelectorAll('.gallery-card');
//             const isDataAvailable = window.data && window.data.photographers && window.data.media;
//             const isGalleryAvailable = mediaProvider.length > 0;

//             // Log the status of data and gallery
//             if (isDataAvailable) {
//                 console.log('Data is available:', window.data); // Log the actual data
//             } else {
//                 console.log('Data is not available yet.');
//             }

//             console.log(`Gallery available: ${isGalleryAvailable}`);

//             if (isGalleryAvailable) {
//                 clearInterval(checkInterval); // Stop checking when both data and gallery elements are available
//                 callback();
//             } else {
//                 console.log('Waiting for data and gallery elements to load...');
//             }
//         }, 1000); // Check every 1000ms (1 second)
//     };

//     const initLightbox = () => {
//         // Function to get the photographer ID from the URL
//         const getPhotographerIdFromURL = () => {
//             const params = new URLSearchParams(window.location.search);
//             return parseInt(params.get('id'));
//         };

//         const displayLightbox = (photographer, mediasList) => {
//             const lightbox = document.getElementById('lightbox');
//             const lightboxWrapper = document.querySelector('.lightbox_wrapper');
//             const btnClose = document.querySelector('.btn_close_lightbox');
//             const btnPrevious = document.querySelector('.btn_previous');
//             const btnNext = document.querySelector('.btn_next');
//             const lightboxMedia = document.querySelector('.lightbox_media');
//             // const mediaProvider = Array.from(document.querySelectorAll('.gallery-card'));

            

//             if (mediaProvider.length === 0) {
//                 console.error('No media elements found in the gallery.');
//                 return;
//             }

//             let currentIndex = 0;

//             mediaProvider.forEach(media => {
//                 media.addEventListener('click', (event) => {
//                     event.preventDefault(); // Prevent default anchor behavior
//                     const mediaId = media.dataset.media;

//                     const mediaIndex = mediasList.findIndex(media => media.id == mediaId);
//                     if (mediaIndex === -1) {
//                         console.error('Media ID not found in mediasList.');
//                         return;
//                     }

//                     currentIndex = mediaIndex;
//                     lightbox.style.display = 'flex';
//                     btnClose.focus();
//                     lightboxTemplate();
//                 });
//             });

//             const lightboxTemplate = () => {
//                 const currentMedia = mediasList[currentIndex];

//                 lightboxMedia.innerHTML = `
//                     ${currentMedia.image ? `
//                     <img src="./assets/images/${photographer.name}/${currentMedia.image}" alt="${currentMedia.alt}">` : 
//                     `<video controls aria-label="${currentMedia.alt}"><source src="./assets/images/${photographer.name}/${currentMedia.video}" type="video/mp4"></video>`}

//                     <figcaption>${currentMedia.title}</figcaption>
//                 `;
//             };

//             const closeLightbox = () => {
//                 lightbox.style.display = 'none';
//                 lightboxMedia.innerHTML = '';
//             };

//             const nextMedia = () => {
//                 currentIndex++;
//                 if (currentIndex > mediasList.length - 1) currentIndex = 0;
//                 lightboxTemplate();
//             };

//             const previousMedia = () => {
//                 currentIndex--;
//                 if (currentIndex < 0) currentIndex = mediasList.length - 1;
//                 lightboxTemplate();
//             };

//             document.addEventListener('keyup', (e) => {
//                 switch (e.key) {
//                     case 'Escape':
//                         closeLightbox();
//                         break;
//                     case 'ArrowLeft':
//                         previousMedia();
//                         break;
//                     case 'ArrowRight':
//                         nextMedia();
//                         break;
//                 }
//             });

//             btnPrevious.addEventListener('click', () => previousMedia());
//             btnNext.addEventListener('click', () => nextMedia());
//             btnClose.addEventListener('click', () => closeLightbox());
//         };

//         // Fetch photographer ID from the URL
//         const photographerId = getPhotographerIdFromURL();
//         const photographer = window.data.photographers.find(p => p.id === photographerId);

//         if (!photographer) {
//             console.error('Photographer not found.');
//             return;
//         }

//         // Filter the media for the specific photographer
//         const mediasList = window.data.media.filter(m => m.photographerId === photographerId);
//         displayLightbox(photographer, mediasList);
//     };

//     // Wait for data and gallery elements to be available before initializing the lightbox
//     waitForDataAndGallery(initLightbox);
// });
