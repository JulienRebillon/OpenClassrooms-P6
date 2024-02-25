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
let photographersTest = 'bonjour';
console.log(photographersTest);

function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    //const picture = `assets/photographers/${portrait}`;

    function createPhotographerArticle() {
        return document.createElement('article');
    }

    function createPhotographerImage(picture) {
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.style.borderRadius = '50%';
        img.style.objectFit = 'cover';
        return img;
    }

    function createPhotographerName(name) {
        const h2 = document.createElement('h2');
        h2.textContent = name;
        return h2;
    }

    function createPhotographerLocation(city, country) {
        const h3 = document.createElement('h3');
        h3.textContent = `${city}, ${country}`;
        return h3;
    }

    function createPhotographerTagline(tagline) {
        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;
        pTagline.classList.add('taglineStyle');
        return pTagline;
    }

    function createPhotographerPrice(price) {
        const pPrice = document.createElement('p');
        pPrice.textContent = `${price}€/jour`;
        pPrice.classList.add('priceStyle');
        return pPrice;
    }



    function getUserCardDOM() {
        

        const article = createPhotographerArticle();
        const img = createPhotographerImage(`assets/photographers/${portrait}`);
        const h2 = createPhotographerName(name);
        const h3 = createPhotographerLocation(city, country);
        const pTagline = createPhotographerTagline(tagline);
        const pPrice = createPhotographerPrice(price);

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return article;
    }

    return { getUserCardDOM }; 

    // function getUserPhoto(picture) {
      

    
}








//Extract Photographer's name from the url
const urlSearchParams = new URLSearchParams(window.location.search);
const photographerName = urlSearchParams.get('name');


//find the corresponding data in the photographers array
//const photographerData = photographersTest.find(photographerTest => photographerTest.name === photographerName);
const photographerData = photographersTest.find(photographerTest => photographerTest.name === photographerName);

if (photographerData) {
    const photographer = photographerTemplate(photographerData);
    const userDetails = photographer.getUserCardDOM();
    // Append userDetails to the .userDetails div
    document.querySelector('.userDetails').appendChild(userDetails);
} else {
    console.error('Photographer not found in the data');
}







// const photographerInstance = photographerTemplate(photographerData);

// const userCardDOM = photographerInstance.getUserCardDOM();






    // ---------------------------------------------
    // function getUserCardDOM() {
    //     const article = document.createElement( 'article' );
    //     const img = document.createElement( 'img' );
    //     img.setAttribute("src", picture);
    //     img.style.borderRadius = '50%';
    //     img.style.objectFit = 'cover';
    //     //picture.classList.add('pictureStyle');
    //     const h2 = document.createElement( 'h2' );
    //     h2.textContent = name;
        
    //     const h3 = document.createElement('h3');
    //     h3.textContent = city + ', ' + country; 
        
    //     const pTagline = document.createElement('p');
    //     pTagline.textContent = tagline;
    //     pTagline.classList.add('taglineStyle'); //add class for styling
        
    //     const pPrice = document.createElement('p');
    //     pPrice.textContent = price + '€/jour';
    //     pPrice.classList.add('priceStyle'); //add class for styling

    //     article.appendChild(img);
    //     article.appendChild(h2);
    //     article.appendChild(h3);
    //     article.appendChild(pTagline);
    //     article.appendChild(pPrice);

    //     return (article);
    // }
    

    //-----------------------------------------------------


//     function getUserPhoto() { //add the photographer's picture in the photographer.html page
//         const userPhoto = document.querySelector('.userPhoto');
//         const img = document.createElement( 'img' );
//         img.setAttribute("src", picture);
//         img.style.borderRadius = '50%';
//         img.style.objectFit = 'cover';
//         img.style.width = '100%';
//         img.style.height = '100%';

//         userPhoto.appendChild(img);

//     }


//     function getUserDetails() { //add the photographer's details in the photographer.html page

//         const userDetails = document.querySelector('.userDetails');
//         const h2 = document.createElement( 'h2' );
//         h2.textContent = name;
        
//         const h3 = document.createElement('h3');
//         h3.textContent = city + ', ' + country; 
        
//         const pTagline = document.createElement('p');
//         pTagline.textContent = tagline;
//         pTagline.classList.add('taglineStyle'); //add class for styling

//         userDetails.appendChild(h2);
//         userDetails.appendChild(h3);
//         userDetails.appendChild(pTagline);

//     }

//     return { name, picture, city, country, tagline, price, getUserCardDOM }

// }







// //Search array for the photographer's name.
// const photographerData = photographers.find(photographer => photographer.name === photographerName);

// if (photographerData) {
// const photographer = photographerTemplate(photographerData);
// photographer.getUserPhoto(); //Call function to display the photo
// photographer.getUserDetails(); // Call function to display the details
// } else {
//     console.error('photographer not found in hte data');
// };