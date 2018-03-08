const fs = require('fs');
const shell = require('shelljs');
const cheerio = require('cheerio');
const accent = require('remove-accents');
const puppeteer = require('puppeteer');

console.log_watt = function(d, logfile, option) {
	if (option == 0) {
		process.stdout.write(d + '\n');
	} else if (option == 1) {
		fs.appendFile(logfile, d + '\n', (err) => { if(err) { throw err; } });
	} else {
		process.stdout.write(d + '\n');
		fs.appendFile(logfile, d + '\n', (err) => { if(err) { throw err; } });
	}

}


async function face() {
	console.log('--Author: Nuhula--');
	const browser = await puppeteer.launch({ headless : false });
	const page = await browser.newPage();
	let url = 'http://www.facebook.com'

	try {
		await page.goto(url, { waitUntil : 'domcontentloaded', timeout : 90000 });
		// let cooks = [
		// {name: 'sb', value: 'kMVYWgfSCvwzjao3O5fLsp-H', domain: '.facebook.com', path: '/', expires: 1578839218},
		// {name: 'datr', value: 'kMVYWpuKPqa3eso1NDiNWslY', domain: '.facebook.com', path: '/', expires: 1578839188},
		// {name: 'c_user', value: '100000064077046', domain: '.facebook.com', path: '/', expires: 1526192392},
		// {name: 'xs', value: '23%3A_VFqHmUNwOdwdQ%3A2%3A1515767217%3A2539%3A6165', domain: '.facebook.com', path: '/', expires: 1526192392},
		// {name: 'pl', value: 'n', domain: '.facebook.com', path: '/', expires: 1523543218},
		// {name: 'wd', value: '1871x965', domain: '.facebook.com', path: '/', expires: 1519023549},
		// {name: 'fr', value: '0gMhLo8eVkDsDEr35.AWVF6v5ViLOQvf1Sl0Idn0TuqMo', domain: '.facebook.com', path: '/', expires: 1526192392},
		// {name: 'act', value: '1518417972235%2F6', domain: '.facebook.com', path: '/'},
		// {name: 'presence', value: 'EDvF3EtimeF1518418728EuserFA21BB64077046A2EstateFDutF1518418728086CEchFDp_5f1BB64077046F3CC', domain: '.facebook.com', path: '/'}
		// ];

		let cooks = [
		{name: 'sb', value: 'kMVYWgfSCvwzjao3O5fLsp-H'},
		{name: 'datr', value: 'kMVYWpuKPqa3eso1NDiNWslY'},
		{name: 'c_user', value: '100000064077046'},
		{name: 'xs', value: '23%3A_VFqHmUNwOdwdQ%3A2%3A1515767217%3A2539%3A6165'},
		{name: 'pl', value: 'n'},
		{name: 'wd', value: '1871x965'},
		{name: 'fr', value: '0gMhLo8eVkDsDEr35.AWVF6v5ViLOQvf1Sl0Idn0TuqMo'},
		{name: 'act', value: '1518417972235%2F6'},
		{name: 'presence', value: 'EDvF3EtimeF1518418728EuserFA21BB64077046A2EstateFDutF1518418728086CEchFDp_5f1BB64077046F3CC'}
		];

		for (let i in cooks) {
			await page.setCookie(cooks[i]);
		}
	} catch(e) {
		console.log('debug ' + e);
	}
}

face();