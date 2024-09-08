// Lightbox logic
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');

    // Initialize lightbox when a gallery item is clicked
    document.querySelectorAll('.media-item img, .media-item video').forEach(item => {
        item.addEventListener('click', (event) => {
            const src = event.target.src;
            lightbox.style.display = 'block';
            lightbox.innerHTML = `<img src="${src}" alt=""/>`;
        });
    });

    // Close lightbox
    lightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
});
