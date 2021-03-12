import { cardHeaderContent } from './htmlElements.js';
import { sumOfLike, createMediaList, likeMedia } from './generalFunctions.js';
import { selectFilter } from './dropDownFilter.js'


export function displayPhotographerPage(photographerID, photographers, media) {

    const photographerItem = photographers.find(element => element.id == photographerID);
    const tagsArray = photographerItem.tags.map(tags => {
        return `<a href="" class="card__tags">#${tags}</a>`;
    }).join('');

    const page = `
                <div class='photographer-page'>
                <section class='photographer-page__header'> 
                <div class='photographer-page__header-left'>
                    <div class='photographer-page__header-left__info'>
                        <h1 class='card__name'>${photographerItem.name}</h1>
                        <p class='card__location'>${photographerItem.city}, ${photographerItem.country}</p>
                        <p class="card__tagline">${photographerItem.tagline}</p>
                        <div class="card__tags-container">${tagsArray}</div>
                    </div>
                    <div class='photographer-page__header-left__contact'>
                        <button class='button'>Contactez-moi</button>
                    </div>
                </div>

                <div class='photographer-page__header-right'>
                    <img class="card__image" src="./images/PhotographersIDPhotos/${photographerItem.portrait}" alt="">
                </div>
                </section>
                <section class='photographer-page__select-option'>
                    <label>Trier par</label>    
                    <div class="custom-select-wrapper">
                        <div class="custom-select">
                            <div class="custom-select__trigger">
                                <span id='currentFilter'>Popularité</span>
                                <div class="arrow"></div>
                            </div>
                            <div class="custom-options">
                                <span class="custom-option selected" data-value="Popularité">Popularité</span>
                                <span class="custom-option" data-value="Date">Date</span>
                                <span class="custom-option" data-value="Titre">Titre</span>
                            </div>
                        </div>
                    </div>
                </section>
                <section class='photographer-page__media'>
                </section>
                
                <section class='photographer-page__static-counter'>
                    <div class='photographer-page__static-counter__like-counter'>
                    <p id='likeCounter'></p>
                    <i class="fas fa-heart"></i>
                    </div>
                    <p>${photographerItem.price}&euro; / jour</p>
                </section>
                </div>`;
   
    
    const header = document.querySelector('.header');
    const app = document.querySelector('.app');
    header.innerHTML = cardHeaderContent;
    app.innerHTML = page;
    createMediaList(photographerID, media, photographerItem);
    const likeCounter = document.querySelector('#likeCounter');
    likeCounter.innerHTML = sumOfLike();
    likeMedia();
    selectFilter();
   

    
    
    


    
    
}