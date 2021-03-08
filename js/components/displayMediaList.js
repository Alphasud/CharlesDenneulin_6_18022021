import { cardHeaderContent } from './htmlElements.js';
import { sumOfLike, updatedSumOfLike } from './homePageFunctions.js';



export function displayMediaList(photographerID, photographers, media) {

    const photographerItem = photographers.find(element => element.id == photographerID);
    const tagsArray = photographerItem.tags.map(tags => {
        return `<a href="" class="card__tags">#${tags}</a>`;
    }).join('');
                
    
    const mediaByID = media.filter(element => element.photographerId == photographerID);
                
    const mediaImage = mediaByID.filter(element => element.image);
    const mediaVideo = mediaByID.filter(element => element.video);
                
    const mediaImageArray = mediaImage.map(image => {
        const name = ((image.image.split('_').slice(1, 5).toString().replace('.jpg', '')).replace(/([A-Z])/g, ' $1').replace(',', ' ').trim()).replace(',', '');
                    
        return `
                    <article class='photographer-page__medium'>
                        <img class="photographer-page__medium__image" src="./images/${photographerItem.name.split(' ').slice(0, 1)}/${image.image}" alt=""></img>
                        <div class='photographer-page__medium__item'>
                            <p class='photographer-page__medium__item__name'>${name.replace(/(^\w|\s\w)/g, word => word.toUpperCase())}</p>
                            <div class='photographer-page__medium__item__info'>
                                <p class='photographer-page__medium__item__info__price'>${image.price} &euro;</p>
                                <button id='likeButton' class='button--like'>
                                <p id='likeNumber' class='photographer-page__medium__item__info__likes'>${image.likes}</p>
                                <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </article>`;
                    
    }).join('');
                        
    const mediaVideoArray = mediaVideo.map(video => {
        const name = ((((video.video.split('_').slice(1, 8).toString().replace('.mp4', '')).replace(/([A-Z])/g, ' $1').replace(',', ' ').trim()).replace(',', '')).replace(',', '')).replace(',', '');
        return `
                    <article class='photographer-page__medium'>
                    <video class='photographer-page__medium__video' controls>
                        <source src="./images/${photographerItem.name.split(' ').slice(0, 1)}/${video.video}"" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <div class='photographer-page__medium__item__video'>
                            <p class='photographer-page__medium__item__video__name'>${name.replace(/(^\w|\s\w)/g, word => word.toUpperCase())}</p>
                            <div class='photographer-page__medium__item__video__info'>
                                <p class='photographer-page__medium__item__video__info__price'>${video.price} &euro;</p>
                                <button id='likeButton' class='button--like'>
                                <p id='likeNumber' class='photographer-page__medium__item__video__info__likes'>${video.likes}</p>
                                <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </article>`
    }).join('');

    
    const page = `
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
                <section class='photographer-page__media'>${mediaImageArray}${mediaVideoArray}</section>
                
                <section class='photographer-page__static-counter'>
                    <div class='photographer-page__static-counter__like-counter'>
                    <p id='likeCounter'></p>
                    <i class="fas fa-heart"></i>
                    </div>
                    <p>${photographerItem.price}&euro; / jour</p>
                </section>`;
   
                
    const header = document.querySelector('.header');
    header.innerHTML = cardHeaderContent;
    app.innerHTML = page;
    const likeCounter = document.querySelector('#likeCounter');
    likeCounter.innerHTML = sumOfLike();

    
    const likeNum = document.querySelectorAll('#likeNumber');
    for (let i = 0; i < likeNum.length; i++){
        likeNum[i].addEventListener('change', updatedSumOfLike); 
    }
    


    
    
}