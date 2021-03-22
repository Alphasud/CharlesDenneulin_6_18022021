
export class MediatypeFactory {
	constructor() {
		this.createMediatype = function (type) {
			let media;
			if (type === 'video') media = new Video();
			else if (type === 'photo') media = new Photo();
			else if (type === 'video-carousel') media = new VideoCarousel();
			else if (type === 'photo-carousel') media = new PhotoCarousel();
			return media;
		};
	}
}
export class Photo {
	constructor() {
		this._type = 'photo';
		this.createPhoto = function (ArrayList, photographerItem) {
			return `
                    <article class='photographer-page__medium'>
                        <a tabindex='0' aria-label='${ArrayList.alt}, cliquez pour agrandir' href="" class="photographer-page__medium__link">
                            <img id=${ArrayList.id} class="photographer-page__medium__element" src='./images/${photographerItem.name.split(' ').slice(0, 1)}/${ArrayList.image}' alt=${ArrayList.alt}></img>
                        </a>
                        <div class='photographer-page__medium__item'>
                            <p class='photographer-page__medium__item__name'>${ArrayList.alt}</p>
                            <div class='photographer-page__medium__item__info'>
                                <p class='photographer-page__medium__item__info__price'>${ArrayList.price} &euro;</p>
                                <button aria-label='bouton jaime' id='likeButton' class='button--like'>
                                    <p id='likeNumber' class='photographer-page__medium__item__info__likes'>${ArrayList.likes}</p>
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </article>`;
		};
	}
}

export class Video {
	constructor() {
		this._type = 'video';
		this.createVideo = function (ArrayList, photographerItem) {
			return `
                    <article class='photographer-page__medium'>
                    <a tabindex='0' aria-label='${ArrayList.alt}, cliquez pour agrandir' href="" class="photographer-page__medium__link">
                    <video id=${ArrayList.id} class='photographer-page__medium__element'>
                        <source src='./images/${photographerItem.name.split(' ').slice(0, 1)}/${ArrayList.video}' type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    </a>
                    <div class='photographer-page__medium__item'>
                            <p class='photographer-page__medium__item__name'>${ArrayList.alt}</p>
                            <div class='photographer-page__medium__item__info'>
                                <p class='photographer-page__medium__item__info__price'>${ArrayList.price} &euro;</p>
                                <button aria-label='bouton jaime' id='likeButton' class='button--like'>
                                    <p id='likeNumber' class='photographer-page__medium__item__info__likes'>${ArrayList.likes}</p>
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </article>`;
		};
	}
}

export class VideoCarousel {
	constructor() {
		this._type = 'video-carousel';
		this.createVideoCarousel = function (mediaListArrayFiltered, photographerItem) {
			return `<article class='photographer-page__medium__modal'>
                    <video id='mediaElement' class='photographer-page__medium__modal__element' controls>
                        <source src='./images/${photographerItem.name.split(' ').slice(0, 1)}/${mediaListArrayFiltered.video}' type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <p class='photographer-page__medium__modal__title'>${mediaListArrayFiltered.alt}</p>
                    </article>`;
		};
	}
}

export class PhotoCarousel {
	constructor() {
		this._type = 'photo-carousel';
		this.createPhotoCarousel = function (mediaListArrayFiltered, photographerItem) {
			return `<article class='photographer-page__medium__modal'>
                    <img id='mediaElement' class="photographer-page__medium__modal__element"
                        src='./images/${photographerItem.name.split(' ').slice(0, 1)}/${mediaListArrayFiltered.image}' alt=${mediaListArrayFiltered.alt}>
                    <p class='photographer-page__medium__modal__title'>${mediaListArrayFiltered.alt}</p>
                    </article>`;
		};
	}
}












