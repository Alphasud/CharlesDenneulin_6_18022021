import { headerContent } from './htmlElements.js';
import { PageFactory } from './homepageDisplay.js';
import { MediatypeFactory } from './imageVideoFactory.js';

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
export function displayMediaList(photographerID, media, photographerItem) {
    const mediaByID = media.filter(element => element.photographerId == photographerID);
    const mediaList = document.querySelector('.photographer-page__media');
    const mediaListArray = [];
    let mediaListArrayFiltered;
    
        for (let x = 0; x < mediaByID.length; x++) {
            const image = mediaByID.filter(element => element.image)[x];
            const video = mediaByID.filter(element => element.video)[x];
            mediaListArray.push(image);
            mediaListArray.push(video);
            mediaListArrayFiltered = mediaListArray.filter(element => element != undefined);
            mediaListArrayFiltered = mediaListArrayFiltered.sort(function (a, b) { return a.likes - b.likes });
        }
  

    const mediatypeFactory = new MediatypeFactory();

    const blabla = mediaListArrayFiltered.map(mediaListArrayFiltered => {

        if (mediaListArrayFiltered.image != null) {
                const imageMedium = mediatypeFactory.createMediatype('image');
                const singleImage = imageMedium.createPhoto(mediaListArrayFiltered, photographerItem);
                mediaList.insertAdjacentHTML('afterbegin', singleImage);
                
            }
        if (mediaListArrayFiltered.video != null) {
                const videoMedium = mediatypeFactory.createMediatype('video');
                const singleVideo = videoMedium.createVideo(mediaListArrayFiltered, photographerItem);
                mediaList.insertAdjacentHTML('afterbegin', singleVideo);
                

            }
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
