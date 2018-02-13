const fs = require('fs');
const shell = require('shelljs');
const cheerio = require('cheerio');
const accent = require('remove-accents');
const rp = require('request-promise');
const puppeteer = require('puppeteer');

let script = 'wget -cO - http://sachvui.com/download/pdf/5017 > ~/Desktop/test.pdf';

let url = 'http://sachvui.com';


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


async function sachvui(url_arr) {
	let book_obj = {
		cat : [],
		book : []
	}
	let re_rmspc = /(\s|-|\/)/g;
	let f_location = '/home/zhuylanz/Desktop/sachvui/list-sach';
	// let file_list = fs.createWriteStream(f_location);
	// file_list.on('error',err => { console.log('file_list error nha: ' + err) });

	try {
		let html = await rp('http://sachvui.com');
		let $ = cheerio.load(html);
		$('.center-block a').filter(function(i, ele) {
			let data = $(this);
			// let cat_text = accent.remove(data.text());
			let cat_text = data.text();
			let cat_url = data.attr('href');

			if (url_arr) {
				for (n in url_arr) {
					if (cat_url == url_arr[n]) {
						book_obj.cat.push([cat_text, cat_url]);
					}
				}
			} else { book_obj.cat.push([cat_text, cat_url]); }
		});

		for (j in book_obj.cat) {
			let url2 = book_obj.cat[j][1]
			let html2 = await rp(url2);
			let book_cat = book_obj.cat[j][0];
			let ed_book_cat = accent.remove(book_cat).replace(re_rmspc, '');

			shell.exec('mkdir ~/Desktop/sachvui/' + ed_book_cat);

			let $ = cheerio.load(html2);
			let last_page = $('.pagination').children().last().text();
			if (isNaN(last_page)) { last_page = $('.pagination').children().length - 1; }

			for (var k=1; k<=last_page; k++) {
				let html2b = await rp(url2 + '/' + k);
				$ = cheerio.load(html2b);
				//cat page//
				$('.col-xs-6 h5 a').filter(async function(i, ele) {
					let data = $(this);
					let book_url = data.attr('href');
					// let book_name = accent.remove(data.text());
					let book_name = data.text();
					let ed_book_name = accent.remove(book_name).replace(re_rmspc, '');

					let html3 = await rp(book_url);
					$ = cheerio.load(html3);
					let book_down_link = $('.btn-danger').attr('href');
					let book_arr = [book_cat, book_name, book_url, book_down_link];
					book_obj.book.push(book_arr);

					//get book//
					file_exist = await isFile('/home/zhuylanz/Desktop/sachvui/' + ed_book_cat + '/' + ed_book_name + '.pdf');
					if (book_down_link && !file_exist) {
						shell.exec('wget -cO - ' + book_down_link + ' > ~/Desktop/sachvui/' + ed_book_cat + '/' + ed_book_name + '.pdf');
						fs.appendFile(f_location, book_arr.join(', ') + '\n');
						console.log(book_arr);
					} else {
						shell.exec('touch ~/Desktop/sachvui/' + ed_book_cat + '/' + '[no-link]' + ed_book_name);
					}
				});
			}
		}

		// file_list.end();

		return book_obj;


	} catch(e) {
		console.log('there were some errors ' + e);
	}

}

async function truyenhh() {
	let cat_arr = [];
	let book_arr = [];
	let re_rmspc = /(\s|-|\/)/g;
	let f_location = '/home/zhuylanz/Desktop/truyenhh/list-sach.txt';

	try {
		let html = await rp('http://truyenhh.com')
		let $ = cheerio.load(html);

		$("[name='doc_truyen_book'] option[value!='-1']").each((i, ele) => { 
			let data = $(ele);
			cat_arr[i] = [data.text(), data.attr('value')];
		});

		for (j in cat_arr) {
			let book_cat = cat_arr[j][0];
			let cat_url = 'http://truyenhh.com/?doc_truyen_book=' + cat_arr[j][1] + '&doc_truyen_order=new_update&doc_truyen_type=-1&doc_truyen_finished=finished';
			let html2 = await rp(cat_url);
			let $ = cheerio.load(html2);

			let ed_book_cat = accent.remove(book_cat).replace(re_rmspc, '');
			shell.exec('mkdir ~/Desktop/truyenhh/' + ed_book_cat);

			let next_page_link = $('.fa-chevron-circle-right').parent().attr('href');
			do {

				$('.story_small_item_info_box a:first-child').each(async function(i, ele) {
					let data = $(ele);
					let book_name = data.attr('title');
					let book_link = 'http://truyenhh.com/' + data.attr('href');
					// let html3 = await rp(book_link);
					// $ = cheerio.load(html3);
					// let book_down_link = $('.padding_v a').attr('href');
					let book_code = book_link.match(/\d{3,}/g)[0];
					let book_down_link = 'http://truyenhh.com/doc_truyen/download/' + book_code;
					book_arr[i] = [book_cat, book_name, book_link, book_down_link];

					let ed_book_name = accent.remove(book_name).replace(re_rmspc, '');
					let file_exist = await isFile('/home/zhuylanz/Desktop/truyenhh/' + ed_book_cat + '/' + ed_book_name + '.mobi');
					if (!file_exist) {
						shell.exec('wget -cO - ' + book_down_link + ' > ~/Desktop/truyenhh/' + ed_book_cat + '/' + ed_book_name + '.mobi');
						fs.appendFileSync(f_location, book_arr[i].join(', ') + '\n');
					}

					console.log(book_cat);
					console.log(book_name);
					console.log(book_link);
					console.log(book_down_link);

				});

				next_page_link = $('.fa-chevron-circle-right').parent().attr('href');
				if (next_page_link) {
					let html2b = await rp(next_page_link);
					$ = cheerio.load(html2b);
				}

			} while(next_page_link);

		}

	} catch(e) { console.log('DEBUG: ' + e); }
}


async function wattpad(url) {
	let re_rmspc = /(\s|-|\/)/g;
	const browser = await puppeteer.launch({ headless : true });
	const page = await browser.newPage();
	// let url = 'https://www.wattpad.com/20593795-the-good-girl%27s-bad-boys-the-good-the-bad-and-the';

	try {

		await page.goto(url, { waitUntil : 'domcontentloaded', timeout : 90000 });
		let retry = 0;
		let f_name = await page.evaluate(() => {
			return $('h1').text();
		});
		f_name = accent.remove(f_name).replace(re_rmspc, '');
		let f_location = '/home/zhuylanz/Desktop/wattpad/' + f_name + '.txt';
		console.log('--file location : ' + f_location);

		while (true) {
			console.log('--START--');
			while (true) {
				console.log('--scrolling--');
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
			console.log('--getting text--');
			let body = await page.evaluate(() => {
				return document.body.innerHTML;
			});

			let $ = cheerio.load(body);

			//title
			let title = $('h2').text().trim();
			console.log('TITLE: ' + title);
			fs.appendFileSync(f_location, title + '\n\n');

			//body
			$('pre p').clone().children('span').remove().end().each((i, ele) => {
				let data = $(ele);
				let text = data.text();
				console.log(text);
				fs.appendFileSync(f_location, text);
			});
			fs.appendFileSync(f_location, '\n-------------------------------------------------------\n\n');

			//next page
			let old_title = title;
			let next_link = $('.next-up').parent('a').attr('href');
			if (next_link) {
				retry = 0;
				console.log('--going next : ' + next_link);
				await page.goto(next_link, { waitUntil : 'domcontentloaded', timeout : 90000 });
			} else {
				if ($('.next-up') || retry >= 3) {
					console.log('--end the story at ' + old_title + '--');
					// browser.close();
					break;
				}

				retry++;
				console.log('--retrying ' + retry + '--');
				await page.waitFor(2000);
				await page.reload({ waitUntil : 'domcontentloaded', timeout : 90000 });
			}

		}
	} catch(e) {
		console.log('DEBUG (catch e) : ' + e);
	}
}

// truyenhh();
wattpad('https://www.wattpad.com/228865692-im-l%E1%BA%B7ng-s%E1%BB%A9c-m%E1%BA%A1nh-c%E1%BB%A7a-ng%C6%B0%E1%BB%9Di-h%C6%B0%E1%BB%9Bng-n%E1%BB%99i-l%E1%BB%9Di-ng%C6%B0%E1%BB%9Di');

// const express = require('express');
// const app = express();

// let bird = require('./bird.js');
// app.use('/bird', bird);
// app.use((req, res, next) => { console.log('good good'); next(); });


// const path = require('path');
// // here you set that all templates are located in `/views` directory
// app.set('views', __dirname);

// // here you set that you're using `ejs` template engine, and the
// // default extension is `ejs`
// app.set('view engine', 'ejs');



// app.get('/', function (req, res, next) {
// 	res.sendFile('./testpage.html', { root : __dirname });
// });

// app.use(express.static(__dirname));


// app.get('/def', function (req, res, next) {
// 	res.sendFile('./page2.html', { root : __dirname });
// });

// app.listen(3000, () => console.log('Example app listening on port 3000!'));

// app.get('/viewdirectory', require('./mw.js'))


// const Vue = require('vue');
// let tete = new Vue ({
// 	el : '#vue',
// 	data : {
// 		counter : 0
// 	}
// });