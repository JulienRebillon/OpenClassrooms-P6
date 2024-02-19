// Get the lightbox element only once
const lightbox = document.getElementById("lightbox");

// Keep track of the current image index
let currentImageIndex = 0;

// Event listeners for navigation
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.arrowLeft').addEventListener('click', showPreviousImage);
document.querySelector('.arrowRight').addEventListener('click', showNextImage);

// Array to store figures in lightbox
const lightboxFigures = [];

// Display lightbox with a specific image index
function displayLightbox(index) {
    currentImageIndex = index;
    updateLightboxContent();
    lightbox.style.display = 'block';
}

// Update lightbox content based on the current image index
function updateLightboxContent() {
    const lightboxContent = document.querySelector('.lightbox_content');
    lightboxContent.innerHTML = ''; // Clear existing content

    if (lightboxFigures.length > 0 && currentImageIndex >= 0 && currentImageIndex < lightboxFigures.length) {
        // Create a clone of the figure to avoid issues with disappearing figures
        const clonedFigure = lightboxFigures[currentImageIndex].cloneNode(true);
        lightboxContent.appendChild(clonedFigure);
    }
}

// Close the lightbox
function closeLightbox() {
    lightbox.style.display = 'none';
}

// Show the previous image in the lightbox
function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + lightboxFigures.length) % lightboxFigures.length;
    updateLightboxContent();
}

// Show the next image in the lightbox
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % lightboxFigures.length;
    updateLightboxContent();
}

// Function to add figures to the lightboxFigures array
function addFiguresToLightbox(sortedPhotos, folderName) {
    lightboxFigures.length = 0; // Clear the lightboxFigures array

    sortedPhotos.forEach((photo, index) => {
        const photoFigure = createPhotoFigure(photo, folderName);

        if (!photoFigure) {
            console.error('Error creating photo figure:', photo);
            return; // Skip this iteration if there's an issue with photoFigure
        }

        lightboxFigures.push(photoFigure);
    });
}

// Additional functions for handling lightbox logic
// ...

// Call addFiguresToLightbox with your sortedPhotos and folderName
// For example, addFiguresToLightbox(sortedPhotos, folderName);
