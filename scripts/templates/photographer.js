// function photographerTemplate(data) {
//     const { name, portrait } = data;

//     const picture = `assets/photographers/${portrait}`;

//     function getUserCardDOM() {
//         const article = document.createElement( 'article' );
//         const img = document.createElement( 'img' );
//         img.setAttribute("src", picture)
//         const h2 = document.createElement( 'h2' );
//         h2.textContent = name;
//         article.appendChild(img);
//         article.appendChild(h2);
//         return (article);
//     }
//     return { name, picture, getUserCardDOM }
// }

function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;
    

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.style.borderRadius = '50%';
        img.style.objectFit = 'cover';
        //picture.classList.add('pictureStyle');
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        
        const h3 = document.createElement('h3');
        h3.textContent = city + ', ' + country; 
        
        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;
        pTagline.classList.add('taglineStyle'); //add class for styling
        
        const pPrice = document.createElement('p');
        pPrice.textContent = price + '€/jour';
        pPrice.classList.add('priceStyle'); //add class for styling

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return (article);
    }
    


    function getUserPhoto() { //add the photographer's picture in the photographer.html page
        const userPhoto = document.querySelector('.userPhoto');
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.style.borderRadius = '50%';
        img.style.objectFit = 'cover';
        img.style.width = '100%';
        img.style.height = '100%';

        userPhoto.appendChild(img);

    }


    function getUserDetails() { //add the photographer's details in the photographer.html page

        const userDetails = document.querySelector('.userDetails');
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        
        const h3 = document.createElement('h3');
        h3.textContent = city + ', ' + country; 
        
        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;
        pTagline.classList.add('taglineStyle'); //add class for styling

        userDetails.appendChild(h2);
        userDetails.appendChild(h3);
        userDetails.appendChild(pTagline);

    }

    return { name, picture, city, country, tagline, price, getUserCardDOM }

}



//Extract Photographer's name from the url
const urlSearchParams = new URLSearchParams(window.location.search);
const photographerName = urlSearchParams.get('name');



//Search array for the photographer's name.
const photographerData = photographers.find(photographer => photographer.name === photographerName);

if (photographerData) {
const photographer = photographerTemplate(photographerData);
photographer.getUserPhoto(); //Call function to display the photo
photographer.getUserDetails(); // Call function to display the details
} else {
    console.error('photographer not found in hte data');
}