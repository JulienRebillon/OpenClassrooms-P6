// globalCounter.js

// Function to update the total likes counter
function updateTotalLikes(mediaItems) {
    const totalLikes = mediaItems.reduce((acc, media) => acc + media.likes, 0);
    const likesCounterElement = document.getElementById('totalLikesCounter');
    
    if (likesCounterElement) {
        likesCounterElement.textContent = totalLikes;
    } else {
        console.error('Total likes counter element not found');
    }
}

// Function to initialize the total likes counter when the page loads
function initializeTotalLikes(mediaItems) {
    updateTotalLikes(mediaItems);
}

// Function to refresh the total likes when a like is added
function refreshLikesOnLikeAdded(mediaItems) {
    updateTotalLikes(mediaItems);
}

// Attach these functions to the global window object if you want to access them from other scripts
window.initializeTotalLikes = initializeTotalLikes;
window.refreshLikesOnLikeAdded = refreshLikesOnLikeAdded;
