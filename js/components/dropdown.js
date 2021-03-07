class MediatypeFactory {
    constructor() {
        this.createMediatype = function (type) {
            let media;
            if (type = 'MP4') media = new Video();
            else if (type = 'JPG') media = new Photo();

            return media;
        }
    }
}
class Video {
    constructor() {
        this.type = 'MP4';
        this.createVideo = function () {
            const mediaVideoArray = mediaVideo.map(mediaVideo => {
                    return `
                    <article class='photographer-page__medium'>
                    <video class='photographer-page__video' controls>
                        <source src="./images/${photographerItem.name.split(' ').slice(0, 1)}/${mediaVideo.video}"" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    </article>` 
                }).join('');
            return mediaVideoArray;
            
        }
    }
}
class Photo {
    constructor() {
        this.type = 'JPG';
        this.createPhoto = function () {
            const mediaImageArray = mediaImage.map(mediaImage => {
                    return `
                    <article class='photographer-page__medium'>
                        <img class="photographer-page__image" src="./images/${photographerItem.name.split(' ').slice(0, 1)}/${mediaImage.image}" alt=""></img>
                    </article>`;
                }).join('');                
            return mediaImageArray;
        }
    }
}

const mediatypeFactory = new MediatypeFactory();





