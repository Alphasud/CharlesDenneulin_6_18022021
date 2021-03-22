import { sumOfLike, createMediaList, createModal, createForm, filterData } from './generalFunctions.js';
import { selectFilter } from './dropDownFilter.js';
import { cardHeaderContent } from './htmlElements.js';

////DISPLAY PHOTOGRAPHER'S PAGE TEMPLATE AND LOAD NEEDED FUNCTIONS 
export function displayPhotographerPage(photographerID, photographers, media) {

	const photographerItem = photographers.find(element => element.id == photographerID);
	const tagsArray = photographerItem.tags.map(tags => {
		return `<a href="" class="header__nav__link">#${tags}</a>`;
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
                        <button aria-haspopup='modalForm' aria-label='Contactez-moi ${photographerItem.name}' class='button'>Contactez-moi</button>
                    </div>
                </div>

                <div class='photographer-page__header-right'>
                    <img class="card__image--page" src="./images/PhotographersIDPhotos/${photographerItem.portrait}" alt="" aria-label='${photographerItem.name}'>
                </div>
                </section>
                <section class='photographer-page__select-option'>
                    <label id='listboxlabel' role='label' for='select'>Trier par</label>    
                    <div class="custom-select-wrapper">
                        <button aria-labelledby='listboxlabel' id='select' class="custom-select" role='button' aria-haspopup='listbox' aria-activedescendant='listbox' aria-expanded='false'>
                            <div class="custom-select__trigger" aria-selected='true'>
                                <span id='currentFilter'>Popularité</span>
                                <div class="arrow"></div>
                            </div>
                            <div class="custom-options" id='listbox' role='listbox'>
                                <span tabindex='0' role='option' class="custom-option selected" aria-label='Popularité'>Popularité</span>
                                <span tabindex='0' role='option' class="custom-option" aria-label='Date'>Date</span>
                                <span tabindex='0' role='option' class="custom-option" aria-label='Titre'>Titre</span>
                            </div>
                        </button>
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
	filterData(photographers);
	createModal();
	createMediaList(photographerID, media, photographerItem);
	createForm(photographers, photographerID); 
	const likeCounter = document.querySelector('#likeCounter');
	likeCounter.innerHTML = sumOfLike();
	selectFilter();

    
   

    
    
    


    
    
}