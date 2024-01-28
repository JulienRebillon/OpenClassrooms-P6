document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowLeft':
            showPreviousImage();
            break;
        
        case 'ArrowRight':
            showNextImage();
            break;
        
        case 'Escape':
            closeLightbox();
            closeModal();
            break;

        case 'Enter':
            if (document.activeElement) {
                document.activeElement.click();
            }
            break;
    }
});