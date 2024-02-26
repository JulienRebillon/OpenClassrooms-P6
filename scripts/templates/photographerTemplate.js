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




