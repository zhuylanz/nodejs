const puppeteer = require('puppeteer');
let url = 'http://hoichowebsite.com';

(async function() {
	const browser = await puppeteer.launch({
		headless : false,
		args: [
		'--proxy-server=125.24.236.115:8888',
		]
	});
	const browser2 = await puppeteer.launch({
		headless : false,
		args: [
		'--proxy-server=125.163.114.9:53281',
		]
	});
	
	const page = await browser.newPage();
	const page2 = await browser2.newPage();

	try {
		await page.goto(url, { waitUntil : 'domcontentloaded', timeout : 90000 });
		await page2.goto(url, { waitUntil : 'domcontentloaded', timeout : 90000 });
	} catch (e) {
		console.log(e)
	}
})();