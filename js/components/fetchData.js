fetch('datas/FishEyeDataFR.json')
    .then(response => response.json())
    .then(data => {
        console.log(data.media);
        console.log(data.photographers);
        const photographers = data.photographers;
        const media = data.media;
        const app = document.querySelector('#app');
        
        const oo = photographers.map(photographers => { return `<p>${photographers.name}</p>`; }).join('');
        app.insertAdjacentHTML("afterbegin", oo);
    })
    .catch(error => {
    console.error(`Une erreur est survenue pendant l'accès aux données.`);
    console.error(error);
    });


