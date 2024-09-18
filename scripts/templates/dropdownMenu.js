// document.addEventListener('DOMContentLoaded', () => {
//     const dropdownMenu = document.getElementById('dropdown-menu');

    
//     dropdownMenu.innerHTML = `
//         <div class="filter">
//             <div class="filter_label">
//                 <label for="sortDropdown">Trier Par</label>
//             </div>
//             <div class="custom-dropdown" id="dropdownArea">

//                 <span id="sortLabel">Popularité</span>                
                
//                 <ul role="listbox" aria-labelledby="caretBtn" class="custom-dropdown-content" id="sortDropdown" aria-hidden="true">
//                     <li role="option" class="filter-border" tabindex="0" data-value="likes">Popularité</li>
//                     <li role="option" class="filter-border" tabindex="0" data-value="date">Date</li>
//                     <li role="option" class="filter-border" tabindex="0" data-value="title">Titre</li>
//                 </ul>

//                 <button id="caretBtn" class="caretBtn" aria-haspopup="listbox" aria-expanded="false" aria-controls="sortDropdown">
                    
//                     <div class="sorting-chevron" id="sorting-chevron">
//                         <i class="fas fa-chevron-down"></i>
//                     </div>
//                 </button>

//             </div>
//         </div>
//     `;

//     const dropdownArea = document.getElementById('dropdownArea');
//     const caretBtn = document.getElementById('caretBtn');
//     const sortDropdown = document.getElementById('sortDropdown');
//     const sortLabel = document.getElementById('sortLabel');

//     // Function to toggle the dropdown visibility
//     function toggleDropdown() {
//         const isExpanded = dropdownArea.getAttribute('aria-expanded') === 'true';
//         dropdownArea.setAttribute('aria-expanded', !isExpanded);
//         sortDropdown.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
//     }

   
//     // Function to update the sort order and the button label
//     function updateSortOrder(sortBy) {
//         console.log('Previous sortOrder:', sortOrder); // Log the previous sortOrder
//         sortOrder = sortBy;  // Update sortOrder variable
//         console.log('Updated sortOrder:', sortOrder); // Log the updated sortOrder value
        
//         // Update button label based on sortOrder
//         const sortLabel = document.getElementById('sortLabel');
//         if (sortLabel) {
//             sortLabel.textContent = {
//                 likes: 'Popularité',
//                 date: 'Date',
//                 title: 'Titre'
//             }[sortBy];
//         } else {
//             console.error('Sort label element not found');
//         }

//         // Directly call displayGallery to refresh the gallery
//         displayGallery();
//     }

    

//     // Event listener for toggling the dropdown
//     dropdownArea.addEventListener('click', (event) => {
//         event.stopPropagation(); // Prevent click event from bubbling up
//         toggleDropdown();
//     });

//     // Close dropdown if clicked outside
//     document.addEventListener('click', (event) => {
//         if (!dropdownMenu.contains(event.target)) {
//             sortDropdown.setAttribute('aria-hidden', 'true');
//             dropdownArea.setAttribute('aria-expanded', 'false');
//         }
//     });

//     // Event listener for each dropdown item to change sorting
//     sortDropdown.querySelectorAll('li').forEach((option) => {
//         option.addEventListener('click', (event) => {
//             const selectedSort = event.target.getAttribute('data-value');
//             updateSortOrder(selectedSort);  // Update sortOrder and refresh gallery
//             toggleDropdown();  // Close dropdown after selection
//         });

//         // Allow keyboard navigation for accessibility
//         option.addEventListener('keydown', (event) => {
//             if (event.key === 'Enter' || event.key === ' ') {
//                 const selectedSort = event.target.getAttribute('data-value');
//                 updateSortOrder(selectedSort);  // Update sortOrder and refresh gallery
//                 toggleDropdown();  // Close dropdown after selection
//             }
//         });
//     });

//     let currentSortDirection = 'desc'; // Set default sort direction

//     // Add an event listener to the chevron to toggle sorting direction
    
//     caretBtn.addEventListener('click', () => {
//         // Toggle the sorting direction
//         currentSortDirection = currentSortDirection === 'desc' ? 'asc' : 'desc';

//         // Toggle chevron rotation
//         caretBtn.classList.toggle('asc', currentSortDirection === 'asc');

//         // Refresh the gallery with the updated sort direction
//         updateSortOrder(sortOrder, currentSortDirection);
//     });
    








//     // Initialize with default sort order and label
//     updateSortOrder('likes');  // Set initial sortOrder and label
// });

document.addEventListener('DOMContentLoaded', () => {
    const dropdownMenu = document.getElementById('dropdown-menu');

    dropdownMenu.innerHTML = `
        <div class="filter">
            <div class="filter_label">
                <label for="sortDropdown">Trier Par</label>
            </div>
            <div class="custom-dropdown" id="dropdownArea">

                <span id="sortLabel">Popularité</span>                
                
                <ul role="listbox" aria-labelledby="caretBtn" class="custom-dropdown-content" id="sortDropdown" aria-hidden="true">
                    <li role="option" class="filter-border" tabindex="0" data-value="likes">Popularité</li>
                    <li role="option" class="filter-border" tabindex="0" data-value="date">Date</li>
                    <li role="option" class="filter-border" tabindex="0" data-value="title">Titre</li>
                </ul>

                <button id="caretBtn" class="caretBtn" aria-haspopup="listbox" aria-expanded="false" aria-controls="sortDropdown">
                    <div class="sorting-chevron" id="sorting-chevron">
                        <i class="fas fa-chevron-down"></i>
                    </div>
                </button>

            </div>
        </div>
    `;

    const dropdownArea = document.getElementById('dropdownArea');
    const caretBtn = document.getElementById('caretBtn');
    const sortDropdown = document.getElementById('sortDropdown');
    const sortLabel = document.getElementById('sortLabel');
    const chevronIcon = document.querySelector('.sorting-chevron i');  // Chevron icon

    let currentSortDirection = 'desc'; // Set default sort direction

    // Function to toggle the dropdown visibility
    function toggleDropdown() {
        const isExpanded = dropdownArea.getAttribute('aria-expanded') === 'true';
        dropdownArea.setAttribute('aria-expanded', !isExpanded);
        sortDropdown.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
    }

    // Function to update the sort order and the button label
    function updateSortOrder(sortBy, sortDirection = 'desc') {
        console.log('Previous sortOrder:', sortOrder, 'Direction:', sortDirection); // Log the previous sortOrder and direction
        sortOrder = sortBy;  // Update the global sortOrder variable
        console.log('Updated sortOrder:', sortOrder, 'Updated Direction:', sortDirection); // Log the updated sortOrder and direction

        // Update the button label based on the selected sort order
        const sortLabel = document.getElementById('sortLabel');
        if (sortLabel) {
            sortLabel.textContent = {
                likes: 'Popularité',
                date: 'Date',
                title: 'Titre'
            }[sortBy];
        } else {
            console.error('Sort label element not found');
        }

        // Refresh the gallery with the new sorting parameters
        displayGallery(sortOrder, sortDirection);
    }

    // Event listener for toggling the dropdown
    dropdownArea.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent click event from bubbling up
        toggleDropdown();
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', (event) => {
        if (!dropdownMenu.contains(event.target)) {
            sortDropdown.setAttribute('aria-hidden', 'true');
            dropdownArea.setAttribute('aria-expanded', 'false');
        }
    });

    // Event listener for each dropdown item to change sorting
    sortDropdown.querySelectorAll('li').forEach((option) => {
        option.addEventListener('click', (event) => {
            const selectedSort = event.target.getAttribute('data-value');
            updateSortOrder(selectedSort);  // Update sortOrder and refresh gallery
            toggleDropdown();  // Close dropdown after selection
        });

        // Allow keyboard navigation for accessibility
        option.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                const selectedSort = event.target.getAttribute('data-value');
                updateSortOrder(selectedSort);  // Update sortOrder and refresh gallery
                toggleDropdown();  // Close dropdown after selection
            }
        });
    });

    // Chevron click handler for sorting direction
    chevronIcon.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent it from triggering the dropdown toggle

        // Toggle the sorting direction
        currentSortDirection = currentSortDirection === 'desc' ? 'asc' : 'desc';

        // Toggle chevron rotation
        chevronIcon.classList.toggle('asc', currentSortDirection === 'asc');

        // Refresh the gallery with the updated sort direction
        updateSortOrder(sortOrder, currentSortDirection);
    });

    // Initialize with default sort order and label
    updateSortOrder('likes');  // Set initial sortOrder and label
});
