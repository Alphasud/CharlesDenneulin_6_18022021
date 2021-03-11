
export class MediatypeFactory {
    constructor() {
        this.createMediatype = function (type) {
            let media;
            if (type === 'video') media = new Video();
            else if (type === 'image') media = new Photo();
            return media;
        }
    }
}
export class Photo {
    constructor() {
        this._type = 'photo';
        this.createPhoto = function (mediaListArrayFiltered, photographerItem) {
            const name = ((mediaListArrayFiltered.image.split('_').slice(1, 5).toString().replace('.jpg', ''))
                .replace(/([A-Z])/g, ' $1').replace(',', ' ').trim()).replace(',', '');
                    
            return `
                    <article class='photographer-page__medium'>
                        <img class="photographer-page__medium__image" src='./images/${photographerItem.name.split(' ').slice(0, 1)}/${mediaListArrayFiltered.image}' alt=""></img>
                        <div class='photographer-page__medium__item'>
                            <p class='photographer-page__medium__item__name'>${name.replace(/(^\w|\s\w)/g, word => word.toUpperCase())}</p>
                            <div class='photographer-page__medium__item__info'>
                                <p class='photographer-page__medium__item__info__price'>${mediaListArrayFiltered.price} &euro;</p>
                                <button id='likeButton' class='button--like'>
                                    <p id='likeNumber' class='photographer-page__medium__item__info__likes'>${mediaListArrayFiltered.likes}</p>
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </article>`;
        }
    }
}

export class Video {
    constructor() {
        this._type = 'video';
        this.createVideo = function (mediaListArrayFiltered, photographerItem) {
        
            const name = ((((mediaListArrayFiltered.video.split('_').slice(1, 8).toString().replace('.mp4', '')).replace(/([A-Z])/g, ' $1').replace(',', ' ').trim()).replace(',', '')).replace(',', '')).replace(',', '');
            return `
                    <article class='photographer-page__medium'>
                    <video class='photographer-page__medium__video' controls>
                        <source src='./images/${photographerItem.name.split(' ').slice(0, 1)}/${mediaListArrayFiltered.video}' type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <div class='photographer-page__medium__item__video'>
                            <p class='photographer-page__medium__item__video__name'>${name.replace(/(^\w|\s\w)/g, word => word.toUpperCase())}</p>
                            <div class='photographer-page__medium__item__video__info'>
                                <p class='photographer-page__medium__item__video__info__price'>${mediaListArrayFiltered.price} &euro;</p>
                                <button id='likeButton' class='button--like'>
                                    <p id='likeNumber' class='photographer-page__medium__item__video__info__likes'>${mediaListArrayFiltered.likes}</p>
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </article>`;
        }
    }
}












