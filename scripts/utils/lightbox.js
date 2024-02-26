// document.addEventListener("DOMContentLoaded", function() {
//     // wait for the page to be fuly loaded.






function updateLightboxContent() {
    const lightboxContent = document.querySelector('.lightbox_content');
    lightboxContent.innerHTML = ''; // Clear existing content


    if (lightboxFigures.length > 0 && currentImageIndex >= 0 && currentImageIndex < lightboxFigures.length) {
        //create a clone of the figure, fixes the issue with disappearing figures. 
        const clonedFigure = lightboxFigures[currentImageIndex].cloneNode(true);
        lightboxContent.appendChild(clonedFigure);
    }

    // if (lightboxFigures.length > 0 && currentImageIndex >= 0 && currentImageIndex < lightboxFigures.length) {
    //     lightboxContent.appendChild(lightboxFigures[currentImageIndex]);
    // }
}


function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = 'none';

    // Access photographerData and media from SharedData
    const photographerData = SharedData.photographerData;
    const media = SharedData.media;

    // Check if photographerData and media are defined before using them
    if (photographerData && media) {
        // Repopulate lightboxFigures with the figures to be displayed
        const folderName = mapPhotographerFolderName(photographerData.name);
        const sortedPhotos = media.filter((photo) => photo.photographerId === photographerData.id);
        lightboxFigures.length = 0; // Clear the LightboxFigures array
        lightboxFigures.push(...sortedPhotos.map((photo) => createPhotoFigure(photo, folderName)));

        console.log('lightboxFigures:', lightboxFigures);
        console.log('currentImageIndex:', currentImageIndex);
    }

    // Clear the LightboxFigures array
    lightboxFigures.length = 0;
}

// function closeLightbox() {
//     const lightbox = document.getElementById("lightbox");
//     lightbox.style.display = 'none';

//     // Access photographerData and media from SharedData
//     const photographerData = SharedData.photographerData;
//     const media = SharedData.media;

//     // Check if photographerData and media are defined before using them
//     if (photographerData && media) {
//         // Repopulate lightboxFigures with the figures to be displayed
//         const folderName = mapPhotographerFolderName(photographerData.name);
//         const sortedPhotos = media.filter((photo) => photo.photographerId === photographerData.id);
//         lightboxFigures.length = 0; // Clear the LightboxFigures array
//         lightboxFigures.push(...sortedPhotos.map((photo) => createPhotoFigure(photo, folderName)));

//         console.log('lightboxFigures:', lightboxFigures);
//         console.log('currentImageIndex:', currentImageIndex);
//     }

//     // Clear the LightboxFigures array
//     lightboxFigures.length = 0;
// }


function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + lightboxFigures.length) % lightboxFigures.length;
    updateLightboxContent();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % lightboxFigures.length;
    updateLightboxContent();
}

function displayLightbox(index, photographerData) {
    currentImageIndex = index;
    updateLightboxContent();
    lightbox.style.display = 'block';
    // Add the show class to change the z-index value
    lightbox.classList.add('show');

    // Pass photographerData to closeLightbox function
    const lightboxCloseButton = document.querySelector('.lightbox-close');
    if (lightboxCloseButton) {
        lightboxCloseButton.addEventListener('click', () => closeLightbox(photographerData));
    }

    // Assuming photographerData is available where you are calling displayLightbox
    SharedData.photographerData = photographerData; 
}


// Event listeners for navigation
//document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
// Event listener for closing the lightbox
const lightboxCloseButton = document.querySelector('.lightbox-close');
if (lightboxCloseButton) {
    lightboxCloseButton.addEventListener('click', closeLightbox);
};
document.querySelector('.arrowLeft').addEventListener('click', showPreviousImage);
document.querySelector('.arrowRight').addEventListener('click', showNextImage);

// });
