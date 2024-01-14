    async function getPhotographers() {
       
        
        try {
            const response = await fetch('Data/photographers.json'); 
            const data = await response.json();
    
            // fetch photographers's data under the "photographers" key in the JSON file
            const photographers = data.photographers;
    
            return { photographers };
        } catch (error) {
            console.error('Error fetching photographers data', error);
            return { photographers: [] }; // Return an empty array in case of an error
        }
    }


    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();

            userCardDOM.addEventListener('click', () => {
                window.location.href = `photographer.html?name=${photographer.name}`;
            })

            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
