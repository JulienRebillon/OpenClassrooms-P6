//Mettre le code JavaScript lié à la page photographer.html
let photographers;

async function getPhotographers() {
    try {
        const response = await fetch('Data/photographers.json');
        const data = await response.json();

        // Check if 'photographers' property exists in the data object
        const photographers = data.photographers || [];

        const media = data.media;

        return { photographers, media };
    } catch (error) {
        console.error('Error fetching photographers data', error);
        return { photographers: [] }; // Return an empty array in case of an error
    }
}

// async function getPhotographers() {
//     try {
//         const response = await fetch('Data/photographers.json');
//         const data = await response.json();

//         console.log('Data from JSON:', data);

//         // fetch photographer's data under the "photographers" key in the JSON file
//         const photographers = data.photographers;
//         const media = data.media;

//         return { photographers, media };
//     } catch (error) {
//         console.error('Error fetching photographers data', error);
//         return { photographers: [] }; // Return an empty array in case of an error
//     }
// }

// function getUserDetails(name, city, country, tagline) {
function getUserDetailsData(data) {
    const { name, city, country, tagline } = data;
    return { name, city, country, tagline };
}

// Display data from getUserDetailsData function
function displayUserDetails(data) {
    const userDetailsDiv = document.querySelector('.userDetails');
    userDetailsDiv.innerHTML = `
        <h2>${data.name}</h2>
        <h3>${data.city}, ${data.country}</h3>
        <p class="taglineStyle">${data.tagline}</p>
    `;
}

function createPhotographerImage(picture) {
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.style.borderRadius = '50%';
    img.style.objectFit = 'cover';
    return img;
}

let currentSortCriteria = 'date';

// Fetch
function displayUserPhoto(portrait) {
    const userPhotoDiv = document.querySelector('.userPhoto');
    const userPhotoImg = createPhotographerImage(`assets/photographers/${portrait}`);
    userPhotoDiv.appendChild(userPhotoImg);
}



function createPhotoFigure(photoData, folderName) {
    const { title, image, video, likes, date, price } = photoData;

    // Create figure element
    const figure = document.createElement('figure');

    // Create media element (image or video)
    const mediaElement = video
        ? document.createElement('video')
        : document.createElement('img');

    // Update the media source path to include the photographer's folder
    mediaElement.src = video ? `assets/media/${folderName}/${video}` : `assets/images/${folderName}/${image}`;
    mediaElement.alt = title;

    // Create title element
    const titleElement = document.createElement('figcaption');
    titleElement.textContent = title;

    // Create details element based on sort criteria
    let detailsElement;

    switch (currentSortCriteria) {
        case 'date':
            detailsElement = document.createElement('p');
            detailsElement.textContent = new Date(date).toLocaleDateString();
            break;
        case 'likes':
            detailsElement = document.createElement('p');
            detailsElement.textContent = `${likes} Likes`;
            break;
        case 'price':
            detailsElement = document.createElement('p');
            detailsElement.textContent = `${price}€`;
            break;
        default:
            break;
    }

    // Append elements to figure
    figure.appendChild(mediaElement);
    // Create a container for title and details
    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container'); // Add a class for styling
    textContainer.appendChild(titleElement);
    textContainer.appendChild(detailsElement);

    figure.appendChild(textContainer);

    return figure;
}



function mapPhotographerFolderName(photographerName) {
    // Map photographer names to folder names
    const folderNameMap = {
        'Ellie-Rose Wilkens': 'Ellie Rose',
        'Rhode Dubois': 'Rhode',
        'Marcel Nikolic': 'Marcel',
        'Mimi Keel': 'Mimi',
        'Nabeel Bradford': 'Nabeel',
        'Tracy Galindo': 'Tracy',
        
    };

    // Check if there's a mapping for the given photographer
    const mappedFolderName = folderNameMap[photographerName];
    
    // If a mapping exists, use it; otherwise, use the original photographer name
    return mappedFolderName || photographerName;
}


// Function to update UI with sorted photos

let currentImageIndex = 0;
const lightbox = document.querySelector('.lightbox');
const lightboxFigures = [];

function displaySortedPhotos(sortedPhotos, folderName) {
    const albumSection = document.querySelector('.album');
    albumSection.innerHTML = ''; // Clear existing content

    sortedPhotos.forEach((photo, index) => {
        const photoFigure = createPhotoFigure(photo, folderName);
        lightboxFigures.push(photoFigure); // Add to lightboxFigures array
        photoFigure.addEventListener('click', () => displayLightbox(index)); // Add click event listener
        albumSection.appendChild(photoFigure);
    });
}

//let photos = []; // Declare photos globally
let sortOrder = {
    date: 'desc', // Default sort order for date
    popularity: 'desc', // Default sort order for popularity
    title: 'asc', // Default sort order for title
};

// Function to toggle sort order
function toggleSortOrder(criteria) {
    if (currentSortCriteria === criteria) {
        // If the same criteria is clicked again, toggle between 'asc' and 'desc'
        sortOrder[criteria] = sortOrder[criteria] === 'asc' ? 'desc' : 'asc';
    } else {
        // If a new criteria is clicked, set it to 'asc'
        currentSortCriteria = criteria;
        sortOrder[criteria] = 'asc';
    }
}


// Function to sort photos based on the selected criteria
function sortPhotos(criteria, media) {
    toggleSortOrder(criteria);

    // Sort the photos based on the selected criteria
    const sortedPhotos = media.filter((photo) => photo.photographerId === photographerData.id)
        .sort((a, b) => {
            switch (currentSortCriteria) {
                case 'date':
                    return sortOrder.date === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
                case 'likes':
                    return sortOrder.likes === 'asc' ? a.likes - b.likes : b.likes - a.likes;
                    case 'title':
                        return sortOrder.title === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });

    // Display the sorted photos
    displaySortedPhotos(sortedPhotos, folderName);
}


// Event listener for dropdown change
const sortDropdown = document.getElementById('sortDropdown');
sortDropdown.addEventListener('change', function () {
    const selectedOption = this.value;
    sortPhotos(selectedOption, media); // Pass the 'media' array to the function
});








// Functions to add total likes in bottom-right corner
function createPhotographerPrice(price) {
    const pPrice = document.createElement('p');
    pPrice.textContent = `${price}€/jour`;
    pPrice.classList.add('priceStyle');
    return pPrice;
}


function calculateTotalLikes(media, photographerId) {
    const totalLikes = media
        .filter((photo) => photo.photographerId === photographerId)
        .reduce((sum, photo) => sum + photo.likes, 0);
    return totalLikes;
}

function displayTotalLikes(totalLikes, photographerPrice) {
    const likeContainer = document.querySelector('.like_container');
    likeContainer.innerHTML = `
        <p>${totalLikes} <i class="fas fa-heart"></i></p>
        ${createPhotographerPrice(photographerPrice).outerHTML}
    `;
}





async function init() {
    try {
        // Retrieve photographers' data
        const { photographers, media } = await getPhotographers();

        console.log('Photographers:', photographers);

        if (!photographers || photographers.length === 0) {
            console.error('No photographers found in the data');
            return; // Exit the function if no photographers are found
        }

        // Extract photographer's name from the URL
        const urlSearchParams = new URLSearchParams(window.location.search);
        const photographerName = urlSearchParams.get('name');

        // Search array for the photographer's name
        const photographerData = photographers.find(photographer => photographer.name === photographerName);
        
        console.log('photographerName:', photographerName);
        console.log('photographers array:', photographers);
        console.log('photographerData:', photographerData);

        // If found, display details
        if (photographerData) {
            const userDetailsData = getUserDetailsData(photographerData);

            // Display the details in the .userDetails div
            displayUserDetails(userDetailsData);

            // Display the picture in the .userPhoto div
            displayUserPhoto(photographerData.portrait);

            // Display the photos in the .album section
            const albumSection = document.querySelector('.album');
            media
                .filter((photo) => photo.photographerId === photographerData.id)
                .forEach((photo) => {
                    const folderName = mapPhotographerFolderName(photographerData.name);
                    const photoFigure = createPhotoFigure(photo, folderName);
                    albumSection.appendChild(photoFigure);
                });

            // Calculate and display total likes
            const totalLikes = calculateTotalLikes(media);
            const photographerPrice = photographerData.price; // Assuming photographerData has a 'price' property
            displayTotalLikes(totalLikes, photographerPrice);

        } else {
            console.error('Photographer not found in the data');
        }

        // Display other data
        displayData(photographers);
    } catch (error) {
        console.error('Error initializing the page', error);
        // Handle initialization error, e.g., display an error message on the page
    }
}

init();

