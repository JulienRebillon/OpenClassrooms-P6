// Import or define your sorting functions
// import { sortGallery } from './galleryUtils.js';

document.addEventListener('DOMContentLoaded', () => {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.innerHTML = `
        <div class="filter">
            <div class="filter_label">
                <label for="sortDropdown">Trier Par</label>
            </div>
            <div class="custom-dropdown">
                <ul role="listbox" aria-labelledby="custom-DropdownBtn" class="custom-dropdown-content" id="sortDropdown">
                    <li role="option" class="filter-border" data-value="popularity">Popularité</li>
                    <li role="option" class="filter-border" data-value="date">Date</li>
                    <li role="option" class="filter-border" data-value="title">Titre</li>
                </ul>
            </div>
            <button id="caretBtn" class="caretBtn" aria-haspopup="listbox" aria-expanded="false" aria-controls="sortDropdown">
                <div class="sorting-chevron" id="sorting-chevron">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </button>
        </div>
    `;

    



});
