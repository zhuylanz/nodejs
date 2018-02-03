function lola(lotest) {
	return new Promise((resolve, reject) => {
		let lala = lotest;
		if (lala) {
			resolve('good good');
		} else {
			reject('bad bad');
		}
	});

}

// lola().then(fresolve => {
// 	console.log(fresolve)
// })
// .catch(freject => {
// 	console.log(typeof(freject));
// });

async function lolo() {
	try {
		let lalo = await lola(true);
		let lolola = await lola(true);
		let lotela = await lola(true);
		console.log(lalo + ' is POSITIVE++');
		console.log(lolola + ' is POSITIVE++');
	} catch(e) {
		console.log(e + ' is NEGATIVE--');
	}

}

lolo();

