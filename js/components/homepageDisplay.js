import { getData } from './fetchData.js';
import { createPhotographerCard, filterData, createLinksToPages } from './generalFunctions.js';
import { displayPhotographerPage } from './displayPhotographerPage.js'



export class PageFactory {
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
                createPhotographerCard(photographers);
                filterData(photographers);
                createLinksToPages();
            }); 
        }     
    }
}

export class BuildPhotographerPage {
    constructor() {
        this.type = 'photographer-page';
        this.createPhotographerPage = function (photographerID) {
            getData().then(data => {
                const photographers = data.photographers;
                const media = data.media;
                displayPhotographerPage(photographerID, photographers, media);
            });
        }
    }

}

const app = document.querySelector('#app');
const factory = new PageFactory();

const homepage = factory.createPage('homepage');
app.insertAdjacentHTML('afterbegin', homepage.createHomepage());








    




