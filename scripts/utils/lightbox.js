function displayLightbox(index) {
    currentImageIndex = index;
    showImage(currentImageIndex);
    lightbox.style.display = 'block';
    //Add the show class to change the z-index value
    lightbox.classList.add('show');

    // Append the selected figure to lightbox_content
    const lightboxContent = document.querySelector('.lightbox_content');
    
     // Debugging: Log the content before appending
     console.log('lightboxFigures[index]:', lightboxFigures[index]);
    
    lightboxContent.innerHTML = ''; // Clear existing content
    lightboxContent.appendChild(lightboxFigures[index]);

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