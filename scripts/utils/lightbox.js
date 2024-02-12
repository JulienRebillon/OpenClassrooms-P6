// function displayLightbox(index) {
//     currentImageIndex = index;
//     showImage(currentImageIndex);
//     lightbox.style.display = 'block';
//     //Add the show class to change the z-index value
//     lightbox.classList.add('show');

//     // Append the selected figure to lightbox_content
//     const lightboxContent = document.querySelector('.lightbox_content');
    
//      // Debugging: Log the content before appending
//      console.log('lightboxFigures[index]:', lightboxFigures[index]);
    
//     lightboxContent.innerHTML = ''; // Clear existing content
//     lightboxContent.appendChild(lightboxFigures[index]);

//     // Event listeners for navigation
//     document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
//     document.querySelector('.arrowLeft').addEventListener('click', showPreviousImage);
//     document.querySelector('.arrowRight').addEventListener('click', showNextImage);
// }

// function displayLightbox(index) {
//     currentImageIndex = index;
//     showImage(currentImageIndex);
//     lightbox.style.display = 'block';
//     // Add the show class to change the z-index value
//     lightbox.classList.add('show');
// }

// function showImage(index) {
//     const lightboxContent = document.querySelector('.lightbox_content');
//     lightboxContent.innerHTML = ''; // Clear existing content

//     if (lightboxFigures.length > 0 && index >= 0 && index < lightboxFigures.length) {
//         lightboxContent.appendChild(lightboxFigures[index]);
//     }

//     // Append the selected figure to lightbox_content
//     // const lightboxContent = document.querySelector('.lightbox_content');
    
//     // Debugging: Log the content before appending
//     console.log('lightboxFigures:', lightboxFigures);
//     console.log('lightboxFigures[index]:', lightboxFigures[index]);
    
//     // if (lightboxFigures[index]) {
//     //     lightboxContent.innerHTML = ''; // Clear existing content
//     //     lightboxContent.appendChild(lightboxFigures[index]);
//     // } else {
//     //     console.error('No figure found at index', index);
//     // }

//     // Event listeners for navigation
//     document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
//     document.querySelector('.arrowLeft').addEventListener('click', showPreviousImage);
//     document.querySelector('.arrowRight').addEventListener('click', showNextImage);
// }



// function closeLightbox() {
//     const lightbox = document.getElementById("lightbox");
//     lightbox.style.display = "none";
// }


// function showPreviousImage() {
//     currentImageIndex = (currentImageIndex - 1 + lightboxFigures.length) % lightboxFigures.length;
//     showImage(currentImageIndex);
// }

// function showNextImage() {
//     currentImageIndex = (currentImageIndex + 1) % lightboxFigures.length;
//     showImage(currentImageIndex);
// }

// function showImage(index) {
//     lightboxFigures.forEach((figure, i) => {
//         figure.style.display = i === index ? 'block' : 'none';
//     });
// }

function displayLightbox(index) {
    currentImageIndex = index;
    updateLightboxContent();
    lightbox.style.display = 'block';
    // Add the show class to change the z-index value
    lightbox.classList.add('show');

    // Event listeners for navigation
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.arrowLeft').addEventListener('click', showPreviousImage);
    document.querySelector('.arrowRight').addEventListener('click', showNextImage);
}

function updateLightboxContent() {
    const lightboxContent = document.querySelector('.lightbox_content');
    lightboxContent.innerHTML = ''; // Clear existing content

    if (lightboxFigures.length > 0 && currentImageIndex >= 0 && currentImageIndex < lightboxFigures.length) {
        lightboxContent.appendChild(lightboxFigures[currentImageIndex]);
    }
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
