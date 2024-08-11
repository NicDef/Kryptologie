'strict';

var method = 'krebs';

const items = document.querySelectorAll('.item');

for (let i = 0; i < items.length; i++) {
	items[i].addEventListener('click', (e) => {
		for (j = 0; j < items.length; j++) items[j].classList.remove('selected');

		e.target.classList.toggle('selected');
		method = document.getElementsByClassName('selected')[0].id;

		if (method == 'skytale' || method == 'caesar') {
			document.getElementById('input').setAttribute('placeholder', 'Dies ist ein Klartext ; Schlüssel');
		} else {
			document.getElementById('input').setAttribute('placeholder', 'Dies ist ein Klartext');
		}
	});
}

function Encrypt() {
	const input = document.getElementById('input');
	const output = document.getElementById('output');
	var txt = input.value;
	output.value = '';

	var key;

	switch (method) {
		case 'krebs':
			Krebs(output, txt);
			break;
		case 'teilweiserKrebs':
			TeilweiserKrebs(output, txt);
			break;
		case 'gartenzaun':
			Gartenzaun(output, txt);
			break;
		case 'doppelterGartenzaun':
			DoppelterGartenzaun(output, txt);
			break;
		case 'skytale':
			try {
				key = txt.slice(txt.indexOf(';') + 1).replace(/\s/g, '');
				if (isNaN(key) || key % 1 !== 0) key = 0;

				key = parseInt(key);

				txt = txt.replace(txt.slice(txt.indexOf(';'), txt.length), '');
			} catch (err) {
				console.error(err);
				key = 0;
			}

			Skytale(output, txt, key);
			break;
		case 'caesar':
			try {
				key = txt.slice(txt.indexOf(';') + 1).replace(/\s/g, '');
				if (isNaN(key) || key % 1 !== 0) key = 0;

				key = parseInt(key);

				txt = txt.replace(txt.slice(txt.indexOf(';'), txt.length), '');
			} catch (err) {
				console.error(err);
				key = 0;
			}

			CaesarChiffre(output, txt, key);
			break;
		default:
			console.error('Fehlende Zuweisung');
			break;
	}

	output.value = output.value.toUpperCase();
}

function Krebs(out, txt) {
	for (let i = txt.length - 1; i >= 0; i--) {
		if (txt[i] != ' ') out.value += txt[i];
	}
}

function TeilweiserKrebs(out, txt) {
	for (let i = 0; i < txt.length; i++) {
		if (txt[i + 1] == ' ' || i == txt.length - 1) {
			for (let j = i; j >= 0; j--) {
				if (txt[j] == ' ') break;
				out.value += txt[j];
			}
		}
	}
}

function Gartenzaun(out, txt) {
	txt = txt.replace(/\s/g, '');
	for (let i = 0; i < txt.length; i += 2) out.value += txt[i];
	for (let i = 1; i < txt.length; i += 2) out.value += txt[i];
}

function DoppelterGartenzaun(out, txt) {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz';
	txt = txt.replace(/\s/g, '');

	for (let i = 0; i < txt.length; i += 4) {
		if (txt[i] !== undefined) {
			out.value += txt[i];
		}
	}

	let firstline = out.value.length;

	let secondline = 0;
	for (let i = 1; secondline < 2 * firstline; i += 2) {
		secondline++;
		if (txt[i] !== undefined) {
			out.value += txt[i];
		} else {
			out.value += alphabet[Math.floor(Math.random() * alphabet.length)];
		}
	}

	let thirdline = 0;
	for (let i = 2; thirdline < firstline; i += 4) {
		thirdline++;
		if (txt[i] !== undefined) {
			out.value += txt[i];
		} else {
			out.value += alphabet[Math.floor(Math.random() * alphabet.length)];
		}
	}
}

function Skytale(out, txt, key) {
	const rodDiameter = key;

	txt = txt.replace(/\s/g, '');
	for (let i = 0; i < rodDiameter; i++) {
		for (let j = i; j < txt.length; j += rodDiameter) {
			out.value += txt[j];
		}
	}
}

function CaesarChiffre(out, txt, key) {
	const offset = key;
	const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

	txt.split('').forEach((letter) => {
		if (!alphabet.includes(letter.toLowerCase())) out.value += letter;
		else out.value += alphabet[(alphabet.indexOf(letter.toLowerCase()) + offset) % alphabet.length];
	});
}
