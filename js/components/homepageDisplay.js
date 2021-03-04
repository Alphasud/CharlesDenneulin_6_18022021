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
                app.innerHTML = photographerCard;

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
                console.log(photographerID);
                const photographers = data.photographers;
                console.log(photographers);

                const item = photographers.find(item => item.id == photographerID);
                console.log(item.name);
                
                    
                    
                app.innerHTML = item.name;
            })
        }
    }

}

const app = document.querySelector('#app');
const factory = new PageFactory();

const homepage = factory.createPage('homepage');
app.innerHTML = homepage.createHomepage();








    




