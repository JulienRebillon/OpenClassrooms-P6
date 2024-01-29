function displayLightbox(index) {
    currentImageIndex = index;
    showImage(currentImageIndex);
    lightbox.style.display = 'block';

    // Event listeners for navigation
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.arrowLeft').addEventListener('click', showPreviousImage);
    document.querySelector('.arrowRight').addEventListener('click', showNextImage);
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
}


function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + lightboxFigures.length) % lightboxFigures.length;
    showImage(currentImageIndex);
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % lightboxFigures.length;
    showImage(currentImageIndex);
}

function showImage(index) {
    lightboxFigures.forEach((figure, i) => {
        figure.style.display = i === index ? 'block' : 'none';
    });
}