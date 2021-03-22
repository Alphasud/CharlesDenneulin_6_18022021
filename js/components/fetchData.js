export const getData = () => fetch('datas/FishEyeDataFR.json')
	.then(response => response.json())
	.catch(error => {
		console.error('Une erreur est survenue pendant la lecture des données.');
		console.error(error);
	});




