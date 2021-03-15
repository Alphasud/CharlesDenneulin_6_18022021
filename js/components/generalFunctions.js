import { headerContent } from './htmlElements.js';
import { PageFactory } from './homepageDisplay.js';
import { MediatypeFactory } from './imageVideoFactory.js';
import { mediaFilter } from './mediaFilter.js';

////////**CREATE PHOTOGRAPHER CARDS**/////////
export function createPhotographerCard(photographers) {
    const header = document.querySelector('.header');
    const photographerCard = photographers.map(photographers => {
                    const tags = photographers.tags;
                    const tagsArray = tags.map(tags => {
                        return `<a href="" class="card__tags">#${tags}</a>`
                    }).join('');
                    return `
                    <article class="card">
                        <a id="${photographers.id}" class="card__general-link" href="">
                            <img class="card__image" src="./images/PhotographersIDPhotos/${photographers.portrait}" alt="">
                            <h2 class="card__name">${photographers.name}</h2>
                        </a>
                        <p class="card__location">${photographers.city}, ${photographers.country}</p>
                        <p class="card__tagline">${photographers.tagline}</p>
                        <p class="card__price">${photographers.price}&euro;/jour</p>
                        <div class="card__tags-container">${tagsArray}</div>
                    </article>`;
                }).join('');
    header.innerHTML = headerContent;
    const app = document.querySelector('#app');
    app.innerHTML = photographerCard;
}



///////**FILTER DATA BY TAGS**////////
export function filterData(photographers) {
    const app = document.querySelector('#app');
    const navLinks = document.querySelectorAll('.header__nav__link');
    for (let n = 0; n < navLinks.length; n++) {
        navLinks[n].addEventListener('click', function (event) {
            event.preventDefault();
            const navLink = navLinks[n].innerText.slice(1).toLowerCase();
            app.innerHTML = '';
                        
            const filteredCard = photographers.map(photographers => {
                const tags = photographers.tags;
                const tagsArray = tags.map(tags => {
                    return `<a href="" class="card__tags">#${tags}</a>`
                }).join('');

                const ArrayOfTags = tags.map(element => element);
                if (ArrayOfTags.includes(navLink)) {
                    return `
                                <article class="card">
                                    <a id="${photographers.id}" class="card__general-link" href="">
                                        <img class="card__image" src="./images/PhotographersIDPhotos/${photographers.portrait}" alt="">
                                        <h2 class="card__name">${photographers.name}</h2>
                                    </a>
                                    <p class="card__location">${photographers.city}, ${photographers.country}</p>
                                    <p class="card__tagline">${photographers.tagline}</p>
                                    <p class="card__price">${photographers.price}&euro;/jour</p>
                                    <div class="card__tags-container">${tagsArray}</div>
                                </article>`;
                } else {
                    return ``;
                }
            }).join('');

            app.innerHTML = filteredCard;
                        
        })
    }
}

///////**CREATE LINKS TO PHOTOGRAPHER PAGES**////////
export function createLinksToPages() {
    const factory = new PageFactory();
    const app = document.querySelector('#app');
    const link = document.getElementsByClassName('card__general-link');
    for (let i = 0; i < link.length; i++) {
        link[i].addEventListener('click', function (event) {
            event.preventDefault();
            const photographerID = link[i].id;
            const photographerPage = factory.createPage('photographer-page');
            app.innerHTML = '';
            app.innerHTML = photographerPage.createPhotographerPage(photographerID);
        })
    }
}

//////////DISPLAY MEDIA LIST ON PHOTOGRAPHER'S PAGE//////////////////
export function createMediaList(photographerID, media, photographerItem) {
    const mediaByID = media.filter(element => element.photographerId == photographerID);
    const mediaListArray = [];
    let mediaListArrayFiltered;
    
        for (let x = 0; x < mediaByID.length; x++) {
            const image = mediaByID.filter(element => element.image)[x];
            const video = mediaByID.filter(element => element.video)[x];
            mediaListArray.push(image);
            mediaListArray.push(video);
            mediaListArrayFiltered = mediaListArray.filter(element => element != undefined);
        }
    
    const mediaListArrayFilteredByUser = mediaListArrayFiltered.sort(function (a, b) { return a.likes - b.likes });
    displayMedia(mediaListArrayFilteredByUser, photographerItem);
    mediaFilter(mediaListArrayFiltered, photographerItem);
}

/////////**DISPLAY MEDIA BY CALLING THE IMAGE/VIDEO FACTORY **////////////
export function displayMedia(mediaListArrayFilteredByUser, photographerItem) {
    const mediaList = document.querySelector('.photographer-page__media');
    const mediatypeFactory = new MediatypeFactory();

    const modalContent = document.querySelector('.modal__content');
    modalContent.innerHTML = '';

    mediaListArrayFilteredByUser.map(mediaListArrayFilteredByUser => {
                const ArrayList = mediaListArrayFilteredByUser;
                
                if (ArrayList.image != null) {
                const imageMedium = mediatypeFactory.createMediatype('photo');
                const singleImage = imageMedium.createPhoto(ArrayList, photographerItem);
                mediaList.insertAdjacentHTML('afterbegin', singleImage);  
                    
                const ImageMediumCarousel = mediatypeFactory.createMediatype('photo-carousel');
                const singleCarouselImage = ImageMediumCarousel.createPhotoCarousel(ArrayList, photographerItem);
                modalContent.insertAdjacentHTML('afterbegin', singleCarouselImage);
                }
        
                if (ArrayList.video != null) {
                const videoMedium = mediatypeFactory.createMediatype('video');
                const singleVideo = videoMedium.createVideo(ArrayList, photographerItem);
                mediaList.insertAdjacentHTML('afterbegin', singleVideo);

                const ImageMediumCarousel = mediatypeFactory.createMediatype('video-carousel');
                const singleCarouselVideo = ImageMediumCarousel.createVideoCarousel(ArrayList, photographerItem);
                modalContent.insertAdjacentHTML('afterbegin', singleCarouselVideo);
                }
    });
    likeMedia();

    const header = document.querySelector('.header');
    const mediaElement = document.querySelectorAll('.photographer-page__medium__element');
    const photographerElement = document.querySelector('.photographer-page');
    const modal = document.querySelector('.modal');
    let mediaID;
    
    for (let i = 0; i < mediaElement.length; i++) {
        mediaElement[i].addEventListener('click', function () {
            console.log('You clicked an image/video');
            modal.classList.add('open');
            photographerElement.classList.add('blur');
            header.style.filter = 'blur(3px)' 
            mediaID = i+1;
            console.log(mediaID);
            mediaCarousel(mediaID);
        });
    }

    const contactButton = document.querySelector('.button');
    contactButton.addEventListener('click', function () {
        openForm(); 
    });
}

/////////**INITIAL SUM OF TOTAL LIKES**/////////
export function sumOfLike() {
    const likeNum = document.querySelectorAll('#likeNumber');
    const likeNumArray = Array.from(likeNum, e => parseFloat(e.innerText));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sumOfLikes = likeNumArray.reduce(reducer);
    return sumOfLikes;
}

////////**UPDATED SUM OF TOTAL LIKES**/////////
export function updatedSumOfLike() {
    const likeNum = document.querySelectorAll('#likeNumber');
    const likeNumArray = Array.from(likeNum, e => parseFloat(e.innerText));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const updatedSumOfLikes = likeNumArray.reduce(reducer);
    return updatedSumOfLikes;

}

/////////**LIKE/UNLIKE BUTTON**///////
export function likeMedia() {
    const likeButton = document.querySelectorAll('#likeButton');
    const likeCounter = document.querySelector('#likeCounter');
                for (let i = 0; i < likeButton.length; i++) {
                    likeButton[i].addEventListener('click', function () {
                        const classList = likeButton[i].classList;
                        const liked = classList.toggle('liked');
                        const oldValue = document.querySelectorAll('#likeNumber');
                        if (liked) {
                            const newValue = parseFloat(oldValue[i].innerText) + 1;
                            oldValue[i].innerText = newValue;
                            likeCounter.innerHTML = updatedSumOfLike();
                        } else {
                            const newValue = parseFloat(oldValue[i].innerText) - 1;
                            oldValue[i].innerText = newValue;
                            likeCounter.innerHTML = updatedSumOfLike();
                        }                        
                    })
                }
}

/////////**CREATE MODAL **/////////
export function createModal() {
    const photographerElement = document.querySelector('.photographer-page');
    const header = document.querySelector('.header');
    
    const modal = document.createElement('section');
    modal.classList.add('modal');

    const closeElement = document.createElement('span');
    closeElement.classList.add('close');
    closeElement.innerHTML = '&#10005;';

    modal.insertAdjacentElement('afterbegin', closeElement);
    photographerElement.insertAdjacentElement('afterend', modal);

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal__content');
    modal.insertAdjacentElement('beforeend', modalContent);

    const arrowLeft = document.createElement('a');
    arrowLeft.classList.add('arrow-left');
    arrowLeft.innerHTML = '&#10094;';
    modal.insertAdjacentElement('beforeend', arrowLeft);

    const arrowRight = document.createElement('a');
    arrowRight.classList.add('arrow-right');
    arrowRight.innerHTML = '&#10095;';
    modal.insertAdjacentElement('beforeend', arrowRight);



    closeElement.addEventListener('click', function () {
        modal.classList.remove('open');
        photographerElement.classList.remove('blur');
        header.style.filter = 'none';
    });

}

/////////**CREATE LINKS TO CAROUSEL**/////////
export function mediaCarousel(mediaID) {
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    let slideIndex = 1;
    
    function showSlides(n) {
        const slides = document.querySelectorAll('.photographer-page__medium__modal__element');
        const title = document.querySelectorAll('.photographer-page__medium__modal__title');
        const slideContainer = document.querySelectorAll('.photographer-page__medium__modal');
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
            title[i].style.display = 'none';
            slideContainer[i].style.display = 'none';
        }
        console.log(slideIndex - 1);
        slides[slideIndex - 1].style.display = 'block';
        title[slideIndex - 1].style.display = 'block';
        slideContainer[slideIndex - 1].style.display = 'block';
        
    }

    ///////SHOW CLICKED SLIDE
    function currentSlide(n) {
       showSlides(slideIndex = n);
     }
    
    currentSlide(mediaID);

    //////NEXT OR PREVIOUS SLIDE
    function nextSlide(n) {
        showSlides(slideIndex += n);
    }

    arrowLeft.addEventListener('click', function () {
        nextSlide(-1);
        
    });
    arrowRight.addEventListener('click', function () {
        nextSlide(1);
        
    });
}

////OPEN FORM//////

