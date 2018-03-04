const fs = require('fs');
const puppeteer = require('puppeteer');


console.log_passer = function(d, logfile, option) {
	if (option == 0) {
		process.stdout.write(d + '\n');
	} else if (option == 1) {
		fs.appendFile(logfile, d + '\n', (err) => { if(err) { throw err; } });
	} else {
		process.stdout.write(d + '\n');
		fs.appendFile(logfile, d + '\n', (err) => { if(err) { throw err; } });
	}

}


async function passer(proxy_arr, url_arr, wait_time, n_limit, logfile) {


	function wait(time) {
		return new Promise(resolve => {
			setTimeout(resolve, time);
		});
	}


	async function going(prox, wait_time){
		console.log_passer(prox, logfile);

		let browser = await puppeteer.launch({
			headless : false,
			args: [
			'--proxy-server=' + prox,
			]
		});

		let page = await browser.newPage();

		try {


			for (j in url_arr) {
				await page.goto(url_arr[j], { waitUntil : 'domcontentloaded', timeout : 10000 });
				await page.waitFor(wait_time);
			}

			browser.close();
		} catch(e) {
			console.log_passer(prox + ' ' + e, logfile);
			browser.close();
		}

		return;
	}


	try {

		let instance = 0;
		for (i = 0; i < proxy_arr.length; i++) {
			if (instance < n_limit) {	
				going(proxy_arr[i], wait_time).then(() => { instance--; console.log_passer(instance, logfile); }).catch(() => { instance--; console.log_passer(instance, logfile); });
				instance++;
				console.log_passer(instance, logfile);
			} else {
				while (instance >= n_limit ) {
					await wait(200);
				}
			}

		}

		console.log_passer('>>passer-ended', logfile);
	} catch(e) {
		console.log_passer('>>passer-ended', logfile);
		console.log_passer('Catch(e): ' + e, logfile);
	}
	

}

// let proxy = ['61.7.177.99:3128', '185.93.3.123:8080', '34.201.2.115:3128', '133.130.103.208:8080', '77.73.67.74:3128', '185.93.3.123:8080'];
// let url = ['http://hoichowebsite.com', 'http://hoichowebsite.com/category/thi-truong-va-kinh-te/', 'http://hoichowebsite.com/bi-quyet-lam-giau-lien-ket-trong-lan-vu-nu-xuat-khau-kinh-doan/'];
// let delay = 5000;
// let logfile = __dirname + '/abc';

// passer(proxy, url, delay, 3);


module.exports = passer;