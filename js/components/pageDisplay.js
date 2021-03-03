import { getData } from './fetchData.js';

const showHomepage = () => {
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
                <a class="card__general-link" href="">
                    <img class="card__image" src="./images/PhotographersIDPhotos/${photographers.portrait}" alt="${photographers.name}">
                    <h2 class="card__name">${photographers.name}</h2>
                </a>
                <p class="card__location">${photographers.city}, ${photographers.country}</p>
                <p class="card__tagline">${photographers.tagline}</p>
                <p class="card__price">${photographers.price}&euro;/jour</p>
                <div class="card__tags-container">${tagsArray}</div>
            </article>`;
        }).join('');
         app.insertAdjacentHTML("afterbegin", photographerCard);
    })
}

window.onload = showHomepage;




