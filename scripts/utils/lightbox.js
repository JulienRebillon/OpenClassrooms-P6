// document.addEventListener("DOMContentLoaded", function() {
//     // wait for the page to be fuly loaded.

    // function displayLightbox(index) {
    //     currentImageIndex = index;
    //     updateLightboxContent();
    //     lightbox.style.display = 'block';
    //     // Add the show class to change the z-index value
    //     lightbox.classList.add('show');

    //     // Event listeners for navigation
    //     document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    //     document.querySelector('.arrowLeft').addEventListener('click', showPreviousImage);
    //     document.querySelector('.arrowRight').addEventListener('click', showNextImage);
    // }

    // function updateLightboxContent() {
    //     const lightboxContent = document.querySelector('.lightbox_content');
    //     lightboxContent.innerHTML = ''; // Clear existing content

    //     if (lightboxFigures.length > 0 && currentImageIndex >= 0 && currentImageIndex < lightboxFigures.length) {
    //         lightboxContent.appendChild(lightboxFigures[currentImageIndex]);
    //     }
    // }

    // function closeLightbox() {
    //     const lightbox = document.getElementById("lightbox");
    //     lightbox.style.display = 'none';
    //     // Repopulate lightboxFigures with the figures you want to display
    //     lightboxFigures.length = 0;
    // }

    // function showPreviousImage() {
    //     currentImageIndex = (currentImageIndex - 1 + lightboxFigures.length) % lightboxFigures.length;
    //     updateLightboxContent();
    // }

    // function showNextImage() {
    //     currentImageIndex = (currentImageIndex + 1) % lightboxFigures.length;
    //     updateLightboxContent();
    // }

    
// });

// document.addEventListener("DOMContentLoaded", function() {
//     // wait for the page to be fully loaded.

function displayLightbox(index) {
    currentImageIndex = index;
    updateLightboxContent();
    lightbox.style.display = 'block';
    // Add the show class to change the z-index value
    lightbox.classList.add('show');
}

function updateLightboxContent() {
    const lightboxContent = document.querySelector('.lightbox_content');
    lightboxContent.innerHTML = ''; // Clear existing content


    if (lightboxFigures.length > 0 && currentImageIndex >= 0 && currentImageIndex < lightboxFigures.length) {
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
    // Repopulate lightboxFigures with the figures you want to display
    lightboxFigures.length = 0;
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + lightboxFigures.length) % lightboxFigures.length;
    updateLightboxContent();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % lightboxFigures.length;
    updateLightboxContent();
}

// Event listeners for navigation
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.arrowLeft').addEventListener('click', showPreviousImage);
document.querySelector('.arrowRight').addEventListener('click', showNextImage);

// });
