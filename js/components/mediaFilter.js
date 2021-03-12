import { displayMedia } from './generalFunctions.js';

export function mediaFilter(mediaListArrayFiltered, photographerItem) {

    const currentFilter = document.getElementById('currentFilter');
    const observer = new MutationObserver(function () {

        const newFilterValue = currentFilter.innerHTML;
        const mediaList = document.querySelector('.photographer-page__media');
        mediaList.innerHTML = '';

        if (newFilterValue === 'Date') { 
            const mediaListArrayFilteredByUser = mediaListArrayFiltered.sort(function (a, b) {return new Date(b.date) - new Date(a.date);});
            displayMedia(mediaListArrayFilteredByUser, photographerItem);  
        }

        if (newFilterValue === 'Popularité') {
            const mediaListArrayFilteredByUser = mediaListArrayFiltered.sort(function (a, b) { return a.likes - b.likes });
            displayMedia(mediaListArrayFilteredByUser, photographerItem);
        }
    
        if (newFilterValue === 'Titre') {
            const mediaListArrayFilteredByUser = mediaListArrayFiltered.sort(function (a, b) {
                let x = a.alt;
                let y = b.alt;
                if (x < y) return 1;
                if (x > y) return -1;
                return 0;
            });
            displayMedia(mediaListArrayFilteredByUser, photographerItem);
        }
    });

    observer.observe(currentFilter, { subtree: true, childList: true });
}