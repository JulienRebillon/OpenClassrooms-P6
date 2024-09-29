// const displayLightbox = medias => {

//     const lightboxWrapper = document.querySelector('.lightbox_wrapper');
//     const btnClose = document.querySelector('.btn_close_lightbox');
//     const btnPrevious = document.querySelector('.btn_previous');
//     const btnNext = document.querySelector('.btn_next');
//     const lightboxMedia = document.querySelector('.lightbox_media');
//     const mediaProvider = Array.from(document.querySelectorAll('.gallery_card a'));

//     const photographer = medias.photographer;
//     const mediasList = medias.medias;
//     let currentIndex = 0; 

//     mediaProvider.forEach(media => {
//         media.addEventListener('click', () => {
//             const mediaId = media.dataset.media;
//             const mediaIndex = mediasList.findIndex(media => media.id == mediaId);
//             currentIndex = mediaIndex;
//             lightboxWrapper.style.display = 'flex';
//             btnClose.focus();
//             lightboxTemplate();
//         });
//     });
        
//     const lightboxTemplate = () => {
//         const currentMedia = mediasList[currentIndex];
        
//         lightboxMedia.innerHTML = `
//             ${currentMedia.image ? `
//             <img src="./assets/images/photographers/samplePhotos-Medium/${photographer.name}/${currentMedia.image}" alt="${currentMedia.alt}">` : 
//             `<video controls aria-label="${currentMedia.alt}"><source src="./assets/images/photographers/samplePhotos-Medium/${photographer.name}/${currentMedia.video}" type="video/mp4"></video>`}

//             <figcaption>${currentMedia.title}</figcaption>
//         `;
//     };
    
//     const closeLightbox = () => {
//         lightboxWrapper.style.display = 'none';
//         lightboxMedia.innerHTML = '';
//     };

//     const nextMedia = () => {
//         currentIndex++;
//         if (currentIndex > mediasList.length - 1) currentIndex = 0;
//         lightboxTemplate();
//         showActiveBtn(btnNext);
//     };

//     const previousMedia = () => {
//         currentIndex--;
//         if (currentIndex < 0) currentIndex = mediasList.length - 1;
//         lightboxTemplate();
//         showActiveBtn(btnPrevious);
//     };

//     const showActiveBtn = btn => {
//         btn.classList.add('active');
//         setTimeout(() => btn.classList.remove('active'), 100);
//     };        
        
//     document.addEventListener('keyup', e => {
//         switch(e.key) {
//             case 'Escape':
//                 closeLightbox();
//                 break;
//             case 'ArrowLeft':
//                 previousMedia();
//                 break;
//             case 'ArrowRight':
//                 nextMedia();
//                 break;
//         };
//     });

//     btnPrevious.addEventListener('click', () => previousMedia());
//     btnNext.addEventListener('click', () => nextMedia());
//     btnClose.addEventListener('click', () => closeLightbox());
// };

const displayLightbox = medias => {
    const lightboxWrapper = document.querySelector('.lightbox_wrapper');
    const btnClose = document.querySelector('.btn_close_lightbox');
    const btnPrevious = document.querySelector('.btn_previous');
    const btnNext = document.querySelector('.btn_next');
    const lightboxMedia = document.querySelector('.lightbox_media');
    const mediaItems = Array.from(document.querySelectorAll('.gallery_card a'));

    // Extract photographer and media list
    const photographer = medias.photographer;
    const mediasList = medias.medias;
    let currentIndex = 0; 

    // Show the lightbox for a clicked media item
    const showLightbox = mediaIndex => {
        currentIndex = mediaIndex;
        lightboxWrapper.style.display = 'flex';
        renderLightboxMedia();
        btnClose.focus();
    };

    // Render the current media in the lightbox
    const renderLightboxMedia = () => {
        const currentMedia = mediasList[currentIndex];
        const mediaContent = currentMedia.image
            ? `<img src="./assets/images/photographers/samplePhotos-Medium/${photographer.name}/${currentMedia.image}" alt="${currentMedia.alt}">`
            : `<video controls aria-label="${currentMedia.alt}"><source src="./assets/images/photographers/samplePhotos-Medium/${photographer.name}/${currentMedia.video}" type="video/mp4"></video>`;

        lightboxMedia.innerHTML = `
            <figure>
                ${mediaContent}
                <figcaption>${currentMedia.title}</figcaption>
            </figure>
        `;
    };

    // Close the lightbox
    const closeLightbox = () => {
        lightboxWrapper.style.display = 'none';
        lightboxMedia.innerHTML = ''; // Clear the content
    };

    // Navigate to the next media
    const nextMedia = () => {
        currentIndex = (currentIndex + 1) % mediasList.length;
        renderLightboxMedia();
        highlightButton(btnNext);
    };

    // Navigate to the previous media
    const previousMedia = () => {
        currentIndex = (currentIndex - 1 + mediasList.length) % mediasList.length;
        renderLightboxMedia();
        highlightButton(btnPrevious);
    };

    // Highlight the clicked button for a short time
    const highlightButton = btn => {
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 100);
    };

    // Add event listeners for each gallery item
    mediaItems.forEach((media, index) => {
        media.addEventListener('click', event => {
            event.preventDefault();  // Prevent the default anchor click behavior
            showLightbox(index);
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keyup', event => {
        switch (event.key) {
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

    // Add click events for the lightbox buttons
    btnClose.addEventListener('click', closeLightbox);
    btnPrevious.addEventListener('click', previousMedia);
    btnNext.addEventListener('click', nextMedia);
};
