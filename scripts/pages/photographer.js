//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
    try {
        const response = await fetch('Data/photographers.json');
        const data = await response.json();

        // fetch photographer's data under the "photographers" key in the JSON file
        const photographers = data.photographers;
        const media = data.media;

        return { photographers, media };
    } catch (error) {
        console.error('Error fetching photographers data', error);
        return { photographers: [] }; // Return an empty array in case of an error
    }
}

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

// Fetch
function displayUserPhoto(portrait) {
    const userPhotoDiv = document.querySelector('.userPhoto');
    const userPhotoImg = createPhotographerImage(`assets/photographers/${portrait}`);
    userPhotoDiv.appendChild(userPhotoImg);
}

function createPhotoFigure(photoData) {
    const { title, image, video, likes } = photoData;

    // Create figure element
    const figure = document.createElement('figure');

    // Create media element (image or video)
    const mediaElement = video
        ? document.createElement('video')
        : document.createElement('img');

    // Update the image source path to include the photographer's folder
    mediaElement.src = video ? `assets/media/${video}` : `assets/images/${photographerName}/${image}`;
    mediaElement.alt = title;

    // Create title element
    const titleElement = document.createElement('figcaption');
    titleElement.textContent = title;

    // Create likes element with Font Awesome heart icon
    const likesElement = document.createElement('p');
    likesElement.innerHTML = `<i class="fas fa-heart"></i> ${likes}`;

    // Append elements to figure
    figure.appendChild(mediaElement);
    figure.appendChild(titleElement);
    figure.appendChild(likesElement);

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

let photos = []; // Declare photos globally
let sortOrder = {
    date: 'desc', // Default sort order for date
    popularity: 'desc', // Default sort order for popularity
    title: 'asc', // Default sort order for title
};

// Function to toggle sort order
function toggleSortOrder(criteria) {
    sortOrder[criteria] = sortOrder[criteria] === 'asc' ? 'desc' : 'asc';
}

// Function to sort photos based on the selected criteria
function sortPhotos(criteria) {
    toggleSortOrder(criteria); // Toggle sort order

    switch (criteria) {
        case 'date':
            photos.sort((a, b) => {
                const orderFactor = sortOrder.date === 'asc' ? 1 : -1;
                return orderFactor * (new Date(b.date) - new Date(a.date));
            });
            break;
        case 'popularity':
            photos.sort((a, b) => {
                const orderFactor = sortOrder.popularity === 'asc' ? 1 : -1;
                return orderFactor * (b.likes - a.likes);
            });
            break;
        case 'title':
            photos.sort((a, b) => {
                const orderFactor = sortOrder.title === 'asc' ? 1 : -1;
                return orderFactor * a.title.localeCompare(b.title);
            });
            break;
        default:
            break;
    }

    // Call a function to display sorted photos in the album
    displaySortedPhotos(photos);
    updateSortIndicators();
}

// Function to update UI with sort indicators
function updateSortIndicators() {
    const sortIndicators = document.querySelectorAll('.sort-indicator');
    sortIndicators.forEach((indicator) => indicator.remove()); // Clear existing indicators

    Object.keys(sortOrder).forEach((criteria) => {
        const order = sortOrder[criteria];
        const indicator = document.createElement('span');
        indicator.classList.add('sort-indicator');
        indicator.textContent = order === 'asc' ? '▲' : '▼';

        const sortButton = document.querySelector(`#sort-${criteria}`);
        sortButton.appendChild(indicator);
    });
}


// Function to display sorted photos in the album
function displaySortedPhotos(sortedPhotos) {
    const albumSection = document.querySelector('.album');
    albumSection.innerHTML = ''; // Clear existing content

    sortedPhotos.forEach((photo) => {
        const folderName = mapPhotographerFolderName(photographerData.name);
        const photoFigure = createPhotoFigure(photo, folderName);
        albumSection.appendChild(photoFigure);
    });
}

// Event listener for dropdown change
const sortDropdown = document.getElementById('sortDropdown');
sortDropdown.addEventListener('change', function () {
    const selectedOption = this.value;
    sortPhotos(selectedOption);
});


// Functions to add total likes in bottom-right corner
function createPhotographerPrice(price) {
    const pPrice = document.createElement('p');
    pPrice.textContent = `${price}€/jour`;
    pPrice.classList.add('priceStyle');
    return pPrice;
}


function calculateTotalLikes(media) {
    const totalLikes = media.reduce((sum, photo) => sum + photo.likes, 0);
    return totalLikes;
}

function displayTotalLikes(totalLikes, photographerPrice) {
    const likeContainer = document.querySelector('.like_container');
    likeContainer.innerHTML = `
        <p>Total Likes: ${totalLikes} <i class="fas fa-heart"></i></p>
        ${createPhotographerPrice(photographerPrice).outerHTML}
    `;
}





async function init() {
    try {
        // Retrieve photographers' data
        const { photographers, media } = await getPhotographers();

        // Extract photographer's name from the URL
        const urlSearchParams = new URLSearchParams(window.location.search);
        const photographerName = urlSearchParams.get('name');

        // Search array for the photographer's name
        const photographerData = photographers.find(photographer => photographer.name === photographerName);

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


