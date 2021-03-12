
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
        this.createPhoto = function (ArrayList, photographerItem) {
            return `
                    <article class='photographer-page__medium'>
                        <img class="photographer-page__medium__image" src='./images/${photographerItem.name.split(' ').slice(0, 1)}/${ArrayList.image}' alt=${ArrayList.alt}></img>
                        <div class='photographer-page__medium__item'>
                            <p class='photographer-page__medium__item__name'>${ArrayList.alt}</p>
                            <div class='photographer-page__medium__item__info'>
                                <p class='photographer-page__medium__item__info__price'>${ArrayList.price} &euro;</p>
                                <button id='likeButton' class='button--like'>
                                    <p id='likeNumber' class='photographer-page__medium__item__info__likes'>${ArrayList.likes}</p>
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
        this.createVideo = function (ArrayList, photographerItem) {
            return `
                    <article class='photographer-page__medium'>
                    <video class='photographer-page__medium__video' controls>
                        <source src='./images/${photographerItem.name.split(' ').slice(0, 1)}/${ArrayList.video}' type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <div class='photographer-page__medium__item__video'>
                            <p class='photographer-page__medium__item__video__name'>${ArrayList.alt}</p>
                            <div class='photographer-page__medium__item__video__info'>
                                <p class='photographer-page__medium__item__video__info__price'>${ArrayList.price} &euro;</p>
                                <button id='likeButton' class='button--like'>
                                    <p id='likeNumber' class='photographer-page__medium__item__video__info__likes'>${ArrayList.likes}</p>
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </article>`;
        }
    }
}












