document.addEventListener('DOMContentLoaded', () => {
    const dropdownMenu = document.getElementById('dropdown-menu');

    // Set initial sortOrder and default sorting text
    let sortOrder = 'likes';
    
    dropdownMenu.innerHTML = `
        <div class="filter">
            <div class="filter_label">
                <label for="sortDropdown">Trier Par</label>
            </div>
            <div class="custom-dropdown">                
                <button id="caretBtn" class="caretBtn" aria-haspopup="listbox" aria-expanded="false" aria-controls="sortDropdown">
                    <span id="sortLabel">Popularité</span>
                    <div class="sorting-chevron" id="sorting-chevron">
                        <i class="fas fa-chevron-down"></i>
                    </div>
                </button>
                <ul role="listbox" aria-labelledby="caretBtn" class="custom-dropdown-content" id="sortDropdown" aria-hidden="true">
                    <li role="option" class="filter-border" tabindex="0" data-value="likes">Popularité</li>
                    <li role="option" class="filter-border" tabindex="0" data-value="date">Date</li>
                    <li role="option" class="filter-border" tabindex="0" data-value="title">Titre</li>
                </ul>
            </div>
        </div>
    `;

    const caretBtn = document.getElementById('caretBtn');
    const sortDropdown = document.getElementById('sortDropdown');
    const sortLabel = document.getElementById('sortLabel');

    // Function to toggle the dropdown visibility
    function toggleDropdown() {
        const isExpanded = caretBtn.getAttribute('aria-expanded') === 'true';
        caretBtn.setAttribute('aria-expanded', !isExpanded);
        sortDropdown.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
    }

    //Function to update the sort order and the button label
    function updateSortOrder(sortBy) {
        sortOrder = sortBy;  // Update sortOrder variable
        console.log('Updated sortOrder:', sortOrder); // Log the updated sortOrder value
        sortLabel.textContent = {
            likes: 'Popularité',
            date: 'Date',
            title: 'Titre'
        }[sortBy]; // Update button label based on sortOrder
        if (window.displayGallery) {
            window.displayGallery(); // Call function to refresh the gallery
        }
    }
    

    // Event listener for caret button to toggle dropdown
    caretBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent click event from bubbling up
        toggleDropdown();
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', (event) => {
        if (!dropdownMenu.contains(event.target)) {
            sortDropdown.setAttribute('aria-hidden', 'true');
            caretBtn.setAttribute('aria-expanded', 'false');
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

    // Initialize with default sort order and label
    updateSortOrder('likes');  // Set initial sortOrder and label
});
