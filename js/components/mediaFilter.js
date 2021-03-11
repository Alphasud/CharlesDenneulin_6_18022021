export function mediaFilter() {

    const currentFilter = document.getElementById('currentFilter');
    const observer = new MutationObserver(function () {
        const newFilterValue = currentFilter.innerHTML;

        const mediaArticle = document.querySelectorAll('.photographer-page__medium');

        if (newFilterValue === 'Date') {
            console.log(newFilterValue);
        }

        if (newFilterValue === 'Popularité') {
            console.log(newFilterValue);
            console.log(mediaArticle);
            for (const mediumArticle of mediaArticle) {
                const likeValue = mediumArticle.querySelector('#likeNumber');
                const mediumArticleValue = likeValue.innerText;
                console.log(mediumArticleValue);
            }
        }

        if (newFilterValue === 'Titre') {
            console.log(newFilterValue);
        }





    });

    observer.observe(currentFilter, { subtree: true, childList: true });












}