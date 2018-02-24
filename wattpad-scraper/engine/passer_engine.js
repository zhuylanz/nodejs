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
	
	async function going(prox, wait_time){
		console.log(prox);

		let browser = await puppeteer.launch({
			headless : true,
			args: [
			'--proxy-server=' + prox,
			]
		});

		let page = await browser.newPage();

		try {


			for (j in url_arr) {
				await page.goto(url_arr[j], { waitUntil : 'domcontentloaded', timeout : 90000 });
				await page.waitFor(wait_time);
			}

			browser.close();
		} catch(e) {
			console.log(prox + ' ' + e);
			browser.close();
		}
	}


	try {
		for (let i = 0; i < proxy_arr.length; i++) {
			going(proxy_arr[i], wait_time);

		}
	} catch(e) {
		console.log('Catch(e): ' + e);
	}

}

let proxy = ['144.202.4.212:8080', '185.93.3.123:8080', '34.201.2.115:3128', 'a', 'b', 'c'];
let url = ['http://hoichowebsite.com', 'http://hoichowebsite.com/category/thi-truong-va-kinh-te/', 'http://hoichowebsite.com/bi-quyet-lam-giau-lien-ket-trong-lan-vu-nu-xuat-khau-kinh-doan/'];
let delay = 5000;

passer(proxy, url, delay, 2);