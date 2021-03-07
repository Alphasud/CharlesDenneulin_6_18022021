import { getData } from './fetchData.js';

class PageFactory {
    constructor() {
        this.createPage = function (type) {
            let page;
            if (type === 'homepage') page = new BuildHomepage();
            else if (type === 'photographer-page') page = new BuildPhotographerPage();

            return page;
        };
    }
}

class BuildHomepage {
    constructor() {
        this.type = 'homepage';
        this.createHomepage = function () {
            getData().then(data => {
                const photographers = data.photographers;
                const app = document.querySelector('#app');
                const header = document.querySelector('.header');
                const headerContent = `
                <a href="/index.html" class="header__link">
                    <img src="images/logo.png" alt="Logo de FishEye" class="header__logo">
                </a>
                <nav class="header__nav">
                    <a href="" class="header__nav__link">#Portrait</a>
                    <a href="" class="header__nav__link">#Art</a>
                    <a href="" class="header__nav__link">#Fashion</a>
                    <a href="" class="header__nav__link">#Architecture</a>
                    <a href="" class="header__nav__link">#Travel</a>
                    <a href="" class="header__nav__link">#Sport</a>
                    <a href="" class="header__nav__link">#Animals</a>
                    <a href="" class="header__nav__link">#Events</a>
                </nav>
                <h1 class="header__title">Nos photographes</h1>`;

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
                app.innerHTML = photographerCard;

                ///////FILTER
                const navLinks = document.querySelectorAll('.header__nav__link');
                for (let n = 0; n < navLinks.length; n++) {
                    navLinks[n].addEventListener('click', function (event) {
                        event.preventDefault();
                        const navLink = navLinks[n].innerText.slice(1);
                        console.log(navLink);

                        

                       // const arrayOfTagsByPhotographer = photographers.map(element => {
                         //   const tags = element.tags;
                           // const tagsArray = tags.map(element => element);
                            //return tagsArray;
                       // });
                        //console.log(arrayOfTagsByPhotographer);

                        
                    })
                }


                /////// LINKS TO PHOTOGRAPHER PAGES
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
            }) 
        }
        
    }
}

class BuildPhotographerPage {
    constructor() {
        this.type = 'photographer-page';
        this.createPhotographerPage = function (photographerID) {
            getData().then(data => {
                const photographers = data.photographers;
                const header = document.querySelector('.header');
                const headerContent = `
                <a href="/index.html" class="header__link">
                    <img src="images/logo.png" alt="Logo de FishEye" class="header__logo">
                </a>`;

                const photographerItem = photographers.find(element => element.id == photographerID); 
                const tagsArray = photographerItem.tags.map(tags => {
                    return `<a href="" class="card__tags">#${tags}</a>`;
                }).join('');
                
                const media = data.media;
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
                <section class='photographer-page__media'>${mediaImageArray}${mediaVideoArray}</section>`;
                
                header.innerHTML = headerContent;
                app.innerHTML = page;

                /////LIKE BUTTON 
                const likeButton = document.querySelectorAll('#likeButton');
                for (let i = 0; i < likeButton.length; i++) {
                    likeButton[i].addEventListener('click', function () {
                        const classList = likeButton[i].classList;
                        const liked = classList.toggle('liked');
                        const oldValue = document.querySelectorAll('#likeNumber');
                        if (liked) {
                            const newValue = parseFloat(oldValue[i].innerText) + 1;
                            oldValue[i].innerText = newValue;
                        } else {
                            const newValue = parseFloat(oldValue[i].innerText) - 1;
                            oldValue[i].innerText = newValue;
                        }
                        
                    })
                }
        

                
                
            })
        }
    }

}

const app = document.querySelector('#app');
const factory = new PageFactory();

const homepage = factory.createPage('homepage');
app.innerHTML = homepage.createHomepage();








    




