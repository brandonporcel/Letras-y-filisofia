const d = document;
d.querySelector('.screen').classList.add('gradient');
const $input = d.getElementById('buscar');
const $inputLetra = d.getElementById('letra');
let verLetra = false;
d.addEventListener('keyup', async (e) => {
	if (e.target.matches('input')) {
		if (e.key === 'Enter') {
			try {
				const query = $input.value;
				const queryLetra = $inputLetra.value;
				const $p = d.getElementById('p');
				const $img = d.getElementById('img');
				const audioDBFetch = fetch(
					`https://theaudiodb.com/api/v1/json/1/search.php?s=${query}`
				);
				const lyricsDBFetch = fetch(
					`https://api.lyrics.ovh/v1/${query}/${queryLetra}`
				);
				const [musicDBRes, lyricsRes] = await Promise.all([
					audioDBFetch,
					lyricsDBFetch,
				]);
				const artistJson = await musicDBRes.json();
				const lyricsJson = await lyricsRes.json();
				if (artistJson.artists === null) {
					$p.innerHTML = 'NO ENCONTRE EL ARTISTA';
					$img.src = '';
					verLetra = false;
				} else {
					const artistData = artistJson.artists[0];
					$img.src = artistData.strArtistThumb;
					verLetra = true;
				}
				if (lyricsJson.lyrics === '') {
					verLetra = false;
					$p.innerHTML = 'no encontre esa letra/Cancion';
				} else {
					verLetra = true;
					const lyricsJsonData = lyricsJson.lyrics;
					$p.innerHTML = lyricsJsonData;
				}
				const verLetraFuncion = () => {
					if (verLetra === true) {
						d.querySelector('.letracancion').classList.add('active');
						verLetra = false;
					}
				};
				d.querySelector('.letracancion').addEventListener('click', (e) => {
					verLetraFuncion();
					verLetra = true;
				});
				d.querySelector('.letracancion').addEventListener('dblclick', (e) => {
					d.querySelector('.letracancion').classList.remove('active');
					verLetra = false;
				});
			} catch (error) {
				console.log(error);
			}
		}
	}
});
const randomColor = () => {
	let letras = '#';
	const combination = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
	for (let i = 0; i < 6; i++) {
		const numAletario = Math.round(Math.random() * 10);
		const caracter = combination[numAletario];
		letras += caracter;
	}
	d.querySelector('.letracancion').style.background = letras;
};
randomColor();
