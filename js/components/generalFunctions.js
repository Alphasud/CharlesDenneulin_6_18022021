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
                        return `<a aria-label='Tag' href="" class="header__nav__link">#${tags}</a>`
                    }).join('');
                    return `
                    <article class="card">
                        <a id="${photographers.id}" class="card__general-link" href="" aria-label='${photographers.name}'>
                            <img class="card__image" src="./images/PhotographersIDPhotos/${photographers.portrait}" alt="">
                            <h2 aria='hidden' class="card__name">${photographers.name}</h2>
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
    filterData(photographers);
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
                    return `<span class="card__tags">#${tags}</span>`
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
            createLinksToPages();
                        
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


    ////////OPEN IMAGE ON MODAL/////////
    const mediaLink = document.querySelectorAll('.photographer-page__medium__link');
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.modal');
    const header = document.querySelector('.header__link__page');
    let mediaID = 1;
    
    for (let i = 0; i < mediaLink.length; i++) {
        mediaLink[i].addEventListener('click', function (e) {
            mediaID = 1;
            e.preventDefault();
            modal.classList.add('open');
            overlay.classList.add('open');
            const photographerPage = document.querySelector('.photographer-page');
            photographerPage.style.filter = 'blur(3px)';
            photographerPage.setAttribute('aria-hidden', 'true');
            header.style.filter = 'blur(3px)';
            mediaID += i;
            mediaCarousel(mediaID);
        });
    
    }

    const contactButton = document.querySelector('.button');
    contactButton.addEventListener('click', function () {
        const modalForm = document.querySelector('.modal__form');
        modalForm.classList.add('open');
        overlay.classList.add('open');
        const photographerPage = document.querySelector('.photographer-page');
        photographerPage.setAttribute('aria-hidden', 'true');
        photographerPage.style.filter = 'blur(3px)';
        header.style.filter = 'blur(3px)';

         const keepFocus = () => {
            const closeElement = document.querySelector('.close--white');
            closeElement.focus();
            const sendButton = document.querySelector('.modal__form__form-content__button');
            sendButton.addEventListener('focusout', () => { closeElement.focus(); })
        }
        keepFocus();
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
    const app = document.querySelector('#app');
    
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    app.insertAdjacentElement('afterbegin', overlay);

    const modal = document.createElement('section');
    modal.classList.add('modal');
    modal.setAttribute('role', 'dialog');
    overlay.insertAdjacentElement('afterbegin', modal);

    const closeElement = document.createElement('button');
    closeElement.classList.add('close');
    closeElement.setAttribute('aria-label', 'Fermer la fenêtre');
    closeElement.innerHTML = '&#10005;';
    modal.insertAdjacentElement('afterbegin', closeElement);

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal__content');
    modal.insertAdjacentElement('beforeend', modalContent);

    const arrowLeft = document.createElement('a');
    arrowLeft.classList.add('arrow-left');
    arrowLeft.setAttribute('href', '');
    arrowLeft.setAttribute('aria-label', 'image précédente');
    arrowLeft.innerHTML = '&#10094;';
    modal.insertAdjacentElement('beforeend', arrowLeft);

    const arrowRight = document.createElement('a');
    arrowRight.classList.add('arrow-right');
    arrowRight.setAttribute('href', '');
    arrowRight.setAttribute('aria-label', 'image suivante');
    arrowRight.innerHTML = '&#10095;';
    modal.insertAdjacentElement('beforeend', arrowRight);

    closeElement.addEventListener('click', function () {
        const header = document.querySelector('.header__link__page');
        modal.classList.remove('open');
        overlay.classList.remove('open');
        const photographerPage = document.querySelector('.photographer-page');
       photographerPage.setAttribute('aria-hidden', 'false');
        photographerPage.style.filter = '';
        header.style.filter = '';
    });

}

/////////**CREATE LINKS TO CAROUSEL**/////////
export function mediaCarousel(mediaID) {
    const closeButton = document.querySelector('.close');
    closeButton.focus();

    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    arrowRight.addEventListener('focusout', () => { closeButton.focus();})

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

        slides[slideIndex - 1].style.display = 'block';
        slideContainer[slideIndex - 1].style.display = 'flex';  
        title[slideIndex - 1].style.display = 'block';
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

    arrowLeft.addEventListener('click', function (e) {
        e.preventDefault();
        nextSlide(-1);
    });

    arrowRight.addEventListener('click', function (e) {
        e.preventDefault();
        nextSlide(1);
    });

    window.addEventListener('keydown', function (event) {
        if (event.key == 'ArrowRight') {
          nextSlide(1);  
        }
        if (event.key == 'ArrowLeft') {
            nextSlide(-1);
        }
        
    });
}

////CREATE FORM//////
export function createForm(photographers, photographerID) {
    const photographer = photographers.filter(element => element.id == photographerID);
    const photographerName = photographer.map(element => element.name);
    

    const modal = document.querySelector('.modal');
    const modalForm = document.createElement('section');
    modalForm.classList.add('modal__form');
    modal.insertAdjacentElement('afterend', modalForm);

    const closeElement = document.createElement('button');
    closeElement.classList.add('close--white');
    closeElement.setAttribute('aria-label', 'Fermer la fenêtre');
    closeElement.innerHTML = '&#10005;';
    modalForm.insertAdjacentElement('afterbegin', closeElement);

    const titleElement = document.createElement('h1');
    titleElement.classList.add('modal__form__title');
    titleElement.innerHTML = 'Contactez-moi <br>' + photographerName;
    modalForm.insertAdjacentElement('beforeend', titleElement);

    const formContent = document.createElement('form');
    formContent.classList.add('modal__form__form-content');
    formContent.id = 'form';
    modalForm.insertAdjacentElement('beforeend', formContent);

    const firstName = document.createElement('label');
    firstName.classList.add('modal__form__form-content__label');
    firstName.innerHTML = 'Prénom';
    firstName.setAttribute('for', 'firstNameInput');
    formContent.insertAdjacentElement('beforeend', firstName);

    const firstNameInput = document.createElement('input');
    firstNameInput.classList.add('modal__form__form-content__input');
    firstNameInput.id = 'firstNameInput';
    firstNameInput.setAttribute('name', 'prénom');
    firstNameInput.setAttribute('type', 'text');
    formContent.insertAdjacentElement('beforeend', firstNameInput);
    

    const lastName = document.createElement('label');
    lastName.classList.add('modal__form__form-content__label');
    lastName.innerHTML = 'Nom';
    lastName.setAttribute('for', 'lastNameInput');
    formContent.insertAdjacentElement('beforeend', lastName);

    const lastNameInput = document.createElement('input');
    lastNameInput.classList.add('modal__form__form-content__input');
    lastNameInput.id = 'lastNameInput';
    lastNameInput.setAttribute('name', 'LastName');
    lastNameInput.setAttribute('type', 'text');
    formContent.insertAdjacentElement('beforeend', lastNameInput);

    const email = document.createElement('label');
    email.classList.add('modal__form__form-content__label');
    email.innerHTML = 'Email';
    email.id = 'email';
    email.setAttribute('for', 'emailInput');
    formContent.insertAdjacentElement('beforeend', email);

    const emailInput = document.createElement('input');
    emailInput.classList.add('modal__form__form-content__input');
    emailInput.id = 'emailInput';
    emailInput.setAttribute('name', 'email');
    emailInput.setAttribute('type', 'mail');
    formContent.insertAdjacentElement('beforeend', emailInput);

    const message = document.createElement('label');
    message.classList.add('modal__form__form-content__label');
    message.innerHTML = 'Votre message';
    message.id = 'message';
    message.setAttribute('for', 'messageInput');
    formContent.insertAdjacentElement('beforeend', message);

    const messageInput = document.createElement('textarea');
    messageInput.classList.add('modal__form__form-content__input--message');
    messageInput.id = 'messageInput';
    messageInput.setAttribute('name', 'message');
    messageInput.setAttribute('type', 'text');
    formContent.insertAdjacentElement('beforeend', messageInput);

    const sendButton = document.createElement('button');
    sendButton.classList.add('modal__form__form-content__button');
    sendButton.setAttribute('aria-label', 'Envoyer');
    sendButton.innerHTML = 'Envoyer';
    formContent.insertAdjacentElement('beforeend', sendButton);

    closeElement.addEventListener('click', function () {
        const overlay = document.querySelector('.overlay');
        modalForm.classList.remove('open');
        overlay.classList.remove('open');
        const header = document.querySelector('.header__link__page');
        const photographerPage = document.querySelector('.photographer-page');
        photographerPage.setAttribute('aria-hidden', 'false');
        photographerPage.style.filter = '';
        header.style.filter = '';
        
    });

    sendButton.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Prénom : ' + firstNameInput.value);
        console.log('Nom : ' + lastNameInput.value);
        console.log('Email : ' + emailInput.value);
        console.log('Message : ' + messageInput.value);
        formContent.reset();
         const overlay = document.querySelector('.overlay');
        modalForm.classList.remove('open');
        overlay.classList.remove('open');
        const header = document.querySelector('.header');
        const photographerPage = document.querySelector('.photographer-page');
        photographerPage.setAttribute('aria-hidden', 'false');
        photographerPage.style.filter = '';
        header.style.filter = '';
    });
}
