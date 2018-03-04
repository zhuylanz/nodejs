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


function isFile(path) {
	return new Promise((resolve, reject) => {
		fs.stat(path, (err, stats) => {
			if (err) {
				if (err.code === 'ENOENT') {
					resolve(false);
				} else {
					reject(err);
				}
			} else {
				resolve(stats.isFile());
			}
		});
	});
}


async function wattpad(url, logfile) {
	fs.closeSync(fs.openSync(logfile, 'w'));
	console.log_watt('--Author: Nuhula--', logfile);
	console.log_watt('--Wattering Started--', logfile);
	let re_rmspc = /(\s|-|\/|\(|\)|\&)/g;
	const browser = await puppeteer.launch({ headless : true });
	const page = await browser.newPage();

	try {
		let url_check = url.search(/wattpad.com/g);
		if (url_check == -1) { throw('Please enter valid a wattpad link'); }

		await page.goto(url, { waitUntil : 'domcontentloaded', timeout : 90000 });
		let retry = 0;
		let f_name = await page.evaluate(() => {
			return $('h1').text();
		});
		f_name = accent.remove(f_name).replace(re_rmspc, '');

		//by pass robot:
		if (f_name == 'Thispageseemstobemissing...') {
			console.log_watt('--encountering wattpad\'s robot--', logfile);
			let f_name_counter = 0;
			while (true) {
				f_name_counter++;
				console.log_watt('--fighting set ' + f_name_counter + '--', logfile);
				await page.reload({ waitUntil : 'domcontentloaded', timeout : 90000 });
				f_name = await page.evaluate(() => { return $('h1').text(); });
				f_name = accent.remove(f_name).replace(re_rmspc, '');
				if (f_name != 'Thispageseemstobemissing...') { console.log_watt('--hooray! robot defeated!--', logfile); break; }
			}
		}

		//continuing:
		let f_location = '/home/zhuylanz/Desktop/wattpad/' + f_name + '.txt';
		fs.closeSync(fs.openSync(f_location, 'w'));

		// console.log_watt('--file location : ' + f_location, logfile);

		while (true) {
			console.log_watt('--START--', logfile);
			while (true) {
				console.log_watt('--scrolling--', logfile);
				let height = await page.evaluate(() => {
					window.scrollBy(0, document.documentElement.scrollHeight);
					return document.documentElement.scrollHeight;
				});
				await page.waitFor(2000);
				let newHeight = await page.evaluate(() => {
					window.scrollBy(0, document.documentElement.scrollHeight);
					return document.documentElement.scrollHeight;
				});
				if (height == newHeight) { break; }
				await page.waitFor(2000);
			}
			console.log_watt('--getting text--', logfile);
			let body = await page.evaluate(() => {
				return document.body.innerHTML;
			});

			let $ = cheerio.load(body);

			//title
			let title = $('h2').text().trim();
			console.log_watt('TITLE: ' + title, logfile);
			fs.appendFileSync(f_location, title + '\n\n');

			//body
			$('pre p').clone().children('span').remove().end().each((i, ele) => {
				let data = $(ele);
				let text = data.text();
				console.log_watt(text, logfile, 1);
				fs.appendFileSync(f_location, text);
			});
			fs.appendFileSync(f_location, '\n-------------------------------------------------------\n\n');

			//next page
			let old_title = title;
			let next_link = $('.next-up').parent('a').attr('href');
			if (next_link) {
				retry = 0;
				console.log_watt('--going next : ' + next_link, logfile);
				await page.goto(next_link, { waitUntil : 'domcontentloaded', timeout : 90000 });

				//by pass robot:
				let f_name_counter = 0;
				let f_name_check = '';
				while (true) {
					f_name_check = await page.evaluate(() => { return $('h1').text(); });
					f_name_check = accent.remove(f_name_check).replace(re_rmspc, '');
					if (f_name_check == f_name) { console.log_watt('--bypassed--', logfile) ; break; }
					console.log_watt('--new wattpad\'s robot approached--');
					f_name_counter++;
					console.log_watt('--fighting set ' + f_name_counter + '--', logfile)
					await page.reload({ waitUntil : 'domcontentloaded', timeout : 90000 });
				}

			} else {
				if ($('.next-up') || retry >= 3) {
					console.log_watt('--end the story at ' + old_title + '--', logfile);
					browser.close();
					console.log_watt('--uploading to gdrive--', logfile);
					shell.exec('gdrive upload -p 1vTBJKY4Q7gx3hgTgdzGFYx9nRhTS7PIU ' + f_location);
					console.log_watt('--watt-ended--', logfile);
					break;
				}

				retry++;
				console.log_watt('--retrying ' + retry + '--', logfile);
				await page.waitFor(2000);
				await page.reload({ waitUntil : 'domcontentloaded', timeout : 90000 });
			}

		}
	} catch(e) {
		console.log_watt('--watt-ended--', logfile);
		console.log_watt('DEBUG (catch e) : ' + e, logfile);
		browser.close();
	}
}

module.exports = wattpad;