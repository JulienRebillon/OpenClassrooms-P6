//Mettre le code JavaScript lié à la page photographer.html
//let photographers = data.photographers;

//let photographers = [];
//let media = [];



async function getPhotographers() {
    try {
        const response = await fetch('Data/photographers.json');
        const data = await response.json();

        // Check if 'photographers' and 'media' properties exist in the data object
    //     photographers = data.photographers || [];
    //     media = data.media || [];

    //     return { photographers, media };
    // } catch (error) {
    //     console.error('Error fetching photographers data', error);
    //     return { photographers: [], media: [] }; // Return empty arrays in case of an error
    // }

        // Check if 'photographers' and 'media' properties exist in the data object
        SharedData.photographers = data.photographers || [];
        SharedData.media = data.media || [];

        return SharedData;
    } catch (error) {
        console.error('Error fetching photographers data', error);
        return SharedData; // Return shared data in case of an error
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

//let currentSortCriteria = 'date';

// Fetch
function displayUserPhoto(portrait) {
    const userPhotoDiv = document.querySelector('.userPhoto');
    const userPhotoImg = createPhotographerImage(`assets/photographers/${portrait}`);
    userPhotoDiv.appendChild(userPhotoImg);
}






function createPhotoFigure(photoData, folderName) {
    const { title, image, video, likes, date } = photoData;

    // Create figure element
    const figure = document.createElement('figure');

    // Create media element (image or video)
    const mediaElement = video
        ? document.createElement('video')
        : document.createElement('img');

    // Update the media source path to include the photographer's folder
    mediaElement.src = video ? `assets/images/${folderName}/${video}` : `assets/images/${folderName}/${image}`;
    mediaElement.alt = title; // Use the title as alt description

    // Create title element
    const titleElement = document.createElement('figcaption');
    titleElement.textContent = title;

    // Create details element to display likes
    const detailsElement = document.createElement('p');

    // Create a container for title, details, and like button
    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container'); // Add a class for styling
    textContainer.appendChild(titleElement);

    // Create a container for likes and like button
    const figureLikes = document.createElement('div');
    figureLikes.classList.add('figure-likes'); // Add a class for styling
    figureLikes.appendChild(detailsElement);

    // Create like button with Font Awesome icon
    const likeButton = document.createElement('button');
    likeButton.innerHTML = `<i class="fas fa-heart"></i>`;
    likeButton.classList.add('figure-button'); //add class to style button
    likeButton.addEventListener('click', (event) => {
        // Stop event propagation to prevent triggering figure click
        event.stopPropagation();

        // Increment the likes and update the text content
        photoData.likes += 1;
        detailsElement.textContent = `${photoData.likes} `;

        // Update total likes
        const photographerId = SharedData.photographerData.id; // Assuming you have photographerId available
        const photographerPrice = SharedData.photographerData.price; // Assuming you have photographerPrice available
        const media = SharedData.media; // Assuming you have access to media array

        const totalLikes = calculateTotalLikes(media, photographerId);
        displayTotalLikes(totalLikes, photographerPrice);
    });

    // Append like button to likes container
    figureLikes.appendChild(likeButton);

    // Set initial likes content
    detailsElement.textContent = `${likes} `;

    // Append likes container to text container
    textContainer.appendChild(figureLikes);

    // Append elements to figure
    figure.appendChild(mediaElement);
    figure.appendChild(textContainer);

    // Add an event listener to the figure
    figure.addEventListener('click', () => displayLightbox(lightboxFigures.indexOf(figure)));

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

    lightboxFigures.length = 0; // Clear the lightboxFigures array

    sortedPhotos.forEach((photo, index) => {
        const photoFigure = createPhotoFigure(photo, folderName);
    
        if (!photoFigure) {
            console.error('Error creating photo figure:', photo);
            return; // Skip this iteration if there's an issue with photoFigure
        }
    
        // Log the type of element before appending
        console.log('Type of photoFigure:', typeof photoFigure);
    
        lightboxFigures.push(photoFigure); // Add to lightboxFigures array
    
        // Add click event listener before appending to the DOM
        photoFigure.addEventListener('click', () => displayLightbox(index));
    
        albumSection.appendChild(photoFigure);
    });
}



//let sortOrder = 'asc'; // Initial sorting order

const sortingChevron = document.querySelector('.sorting-chevron');
const chevronUp = sortingChevron.querySelector('i:first-child');
const chevronDown = sortingChevron.querySelector('i:last-child');

sortingChevron.addEventListener('click', () => {
    if (sortOrder === 'asc') {
        sortOrder = 'desc';
        chevronUp.classList.remove('active');
        chevronDown.classList.add('active');
    } else {
        sortOrder = 'asc';
        chevronUp.classList.add('active');
        chevronDown.classList.remove('active');
    }

    // Here, you can update your sorting logic or trigger any other actions based on the sortOrder
    console.log('Sorting Order:', sortOrder);
});





//Function to sort photos based on the selected criteria

// Function to toggle the sort order
function toggleSortOrder(criteria) {
    // Check if the criteria matches the current sort criteria
    if (criteria === currentSortCriteria) {
        // If matched, toggle the sort order
        sortOrder[criteria] = sortOrder[criteria] === 'asc' ? 'desc' : 'asc';
    } else {
        // If not matched, set the new criteria and default to 'asc' order
        currentSortCriteria = criteria;
        sortOrder[criteria] = 'asc';
    }
}

// Function to sort photos based on the selected criteria
function sortPhotos(criteria) {
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

    console.log(sortOrder);
}

// Event listener for dropdown change
const sortDropdown = document.getElementById('sortDropdown');
sortDropdown.addEventListener('change', function () {
    const selectedOption = this.value;
    sortPhotos(selectedOption);
});

// Initial values
let currentSortCriteria = 'date'; // Initial sort criteria
const sortOrder = {
    date: 'asc',
    likes: 'asc',
    title: 'asc',
};




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
    likeContainer.innerHTML = `<p class="totalLikes">${totalLikes} <i class="fas fa-heart"></i></p>`;    
    // Append photographer's price to the likeContainer
    likeContainer.appendChild(createPhotographerPrice(photographerPrice));
}



async function init() {
    try {
        // Retrieve photographers' data
        const { photographers, media } = await getPhotographers();

        if (!photographers || photographers.length === 0) {
            console.error('No photographers found in the data');
            return;
        }

        // Extract photographer's name from the URL
        const urlSearchParams = new URLSearchParams(window.location.search);
        const photographerName = urlSearchParams.get('name');

        // Search array for the photographer's name
        const photographerData = photographers.find((photographer) => {
            console.log('Current Photographer Name:', photographer.name);
            console.log('Target Photographer Name:', photographerName);
            return photographer.name === photographerName;
        });
        
        console.log('Found Photographer Data:', photographerData);
        //const photographerData = photographers.find(photographer => photographer.name === photographerName);

        if (photographerData) {
            // Assign photographerData to the module
            SharedData.photographerData = photographerData;
            SharedData.media = media;

            const userDetailsData = getUserDetailsData(photographerData);
            //displayUserDetails(userDetailsData);
            //displayUserPhoto(photographerData.portrait);
            console.log('Before displayUserDetails:', photographerData);
            displayUserDetails(userDetailsData);
            console.log('After displayUserDetails');

            console.log('Before displayUserPhoto:', photographerData.portrait);
            displayUserPhoto(photographerData.portrait);
            console.log('After displayUserPhoto');

            const albumSection = document.querySelector('.album');
            const folderName = mapPhotographerFolderName(photographerData.name);

            // Create and store photo figures in lightboxFigures array
            const sortedPhotos = media.filter((photo) => photo.photographerId === photographerData.id);
            lightboxFigures.push(...sortedPhotos.map((photo) => createPhotoFigure(photo, folderName)));

            // Display the sorted photos
            displaySortedPhotos(sortedPhotos, folderName);

            // Calculate and display total likes
            const totalLikes = calculateTotalLikes(media, photographerData.id);
            const photographerPrice = photographerData.price; // Assuming photographerData has a 'price' property
            displayTotalLikes(totalLikes, photographerPrice);

            
        } else {
            console.error('Photographer not found in the data');
        }

        // After getting photographers' data, add this line to hide the photographer_section
        const photographerSection = document.querySelector('.photographer_section');
        photographerSection.style.display = 'none';
    } catch (error) {
        console.error('Error initializing the page', error);
    }
}

// Call the init function
init();
