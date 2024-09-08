// Global variables for DOM elements
const userDetailsDiv = document.querySelector('.userDetails');
const userPhotoDiv = document.querySelector('.userPhoto');
const albumSection = document.querySelector('.album');
const likeContainer = document.querySelector('.like_container');
const caretBtn = document.getElementById('caretBtn');
const sortDropdown = document.getElementById('sortDropdown');
const dropdownButton = document.querySelector(".custom-dropdown-btn");
const dropdownOptions = document.querySelectorAll("#sortDropdown li");
const titleOption = document.querySelector("#sortDropdown li[data-value='title']");
const likesOption = document.querySelector("#sortDropdown li[data-value='likes']");
const dateOption = document.querySelector("#sortDropdown li[data-value='date']");
const lightbox = document.querySelector('.lightbox');


// RECUPARATION DES DONNEES PHOTOGRAPHERS/MEDIA

// Global variable for shared data
const SharedData = {
    photographers: [],
    media: [],
    photographerData: null,
};

// Function to fetch data and initialize SharedData
async function getPhotographers() {
    try {
        const response = await fetch('Data/photographers.json');
        const data = await response.json();

        // Extract photographers and media from the data
        SharedData.photographers = data.photographers || [];
        SharedData.media = data.media || [];

        // Extract photographer's name from the URL
        const urlSearchParams = new URLSearchParams(window.location.search);
        const photographerName = urlSearchParams.get('name');

        // Find the photographer's data based on the name
        SharedData.photographerData = SharedData.photographers.find(photographer => photographer.name === photographerName);

        return SharedData;
    } catch (error) {
        console.error('Error fetching photographers data', error);
        return SharedData; // Return shared data in case of an error
    }
}


// FILTER ET TRI

// Function to sort figures by likes
function sortFiguresByLikes() {
    const figures = Array.from(albumSection.querySelectorAll('figure'));

    figures.sort((figureA, figureB) => {
        const likesA = parseInt(figureA.querySelector('.figure-likes p').textContent);
        const likesB = parseInt(figureB.querySelector('.figure-likes p').textContent);
        return likesB - likesA; // Descending order
    });

    // Clear existing content and append sorted figures
    albumSection.innerHTML = '';
    figures.forEach(figure => albumSection.appendChild(figure));
}

// Function to sort figures by date
function sortFiguresByDate() {
    const figures = Array.from(albumSection.querySelectorAll('figure'));

    figures.sort((figureA, figureB) => {
        const dateA = new Date(figureA.getAttribute('data-date'));
        const dateB = new Date(figureB.getAttribute('data-date'));
        return dateB - dateA; // Descending order
    });

    // Clear existing content and append sorted figures
    albumSection.innerHTML = '';
    figures.forEach(figure => albumSection.appendChild(figure));
}

// Function to sort figures by title
function sortFiguresByTitle() {
    const figures = Array.from(albumSection.querySelectorAll('figure'));

    figures.sort((figureA, figureB) => {
        const titleA = figureA.querySelector('figcaption').textContent;
        const titleB = figureB.querySelector('figcaption').textContent;
        return titleA.localeCompare(titleB); // Ascending order
    });

    // Clear existing content and append sorted figures
    albumSection.innerHTML = '';
    figures.forEach(figure => albumSection.appendChild(figure));
}






// MENU DROPDOWN

// Function to manage the dropdown menu
function setupDropdownMenu() {
    const caretBtn = document.getElementById('caretBtn');
    const sortDropdown = document.getElementById('sortDropdown');
    const dropdownOptions = document.querySelectorAll('#sortDropdown li');

    // Event listener for caret button
    caretBtn.addEventListener('click', function () {
        sortDropdown.classList.toggle('active');
        caretBtn.setAttribute('aria-expanded', sortDropdown.classList.contains('active'));
    });

    // Event listeners for dropdown options
    dropdownOptions.forEach(option => {
        option.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            console.log('Sorting by:', value);

            // Perform sorting based on the selected option
            switch (value) {
                case 'popularity':
                    sortFiguresByLikes();
                    break;
                case 'date':
                    sortFiguresByDate();
                    break;
                case 'title':
                    sortFiguresByTitle();
                    break;
                default:
                    console.error('Invalid sorting option:', value);
            }

            // Hide dropdown after selection
            sortDropdown.classList.remove('active');
            caretBtn.setAttribute('aria-expanded', false);
        });
    });
}

// Call the setupDropdownMenu function
setupDropdownMenu();




    //logic for sorting in ascending or descending order with the caret.

    
    console.log("caretBtn:", caretBtn);
    console.log("sortDropdown:", sortDropdown);

    caretBtn.addEventListener('click', function () {
        //sortDropdown.classList.toggle('active');
        caretBtn.classList.toggle('active');
    });

    dropdownOptions.forEach(option => {
        option.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            console.log('Sorting by (asc or des):', value);
            // Toggle 'active' class for the dropdown menu
            sortDropdown.classList.toggle('active');
        });
    });













// Initialize data
async function init() {
    await getPhotographers();
}

// Call the init function
init();
