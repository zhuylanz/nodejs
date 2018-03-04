// var nodemailer = require('nodemailer');
// var config = require('./secret.js');

// var transporter = nodemailer.createTransport({
// 	service: 'gmail',
// 	auth: {
// 		user: config.mail_id,
// 		pass: config.mail_pass
// 	}
// });

// var mailOptions = {
// 	from: 'zhuylanz@gmail.com',
// 	to: 'thuyuyenn27@gmail.com, zhuylanz1@gmail.com',
// 	subject: 'Test gui mail tu Nuhula Server',
// 	text: 'Uyên chó điên hí hí hí'
// };
// console.log('ok');
// transporter.sendMail(mailOptions, function(error, info){
// 	if (error) {
// 		console.log(error);
// 	} else {
// 		console.log('Email sent: ' + info.response);
// 		console.log(info);
// 	}
// });

const puppeteer = require('puppeteer');

(async() => {
    // Khởi tạo trình duyệt
    const browser = await puppeteer.launch({
        // Ở đây mình set false để nó hiện thị UI => dễ debug hơn
        headless: false
    });
    // Tạo tab mới nè
    const page = await browser.newPage();
    // Đến với trang sản phẩm thôi
    await page.goto('https://world.tmall.com/item/543285442762.htm');
    // Chuẩn bị mảng để chứa 5 cái ảnh to kia nào
    let images = []
    // Đếm số ảnh
    const totalThumbnailEles = await page.evaluate(() => {
        // Nội dung trong callback của hàm evaluate sẽ được chạy trong môi trường trình duyệt chứ không phải là tại localhost của chúng ta
        // Trả về kết quả
        return document.querySelectorAll("#J_UlThumb>li").length
    })

    for (let i = 1; i <= totalThumbnailEles; i++) {
        // Fake sự kiện hover vào thumbnail
        await page.hover(`#J_UlThumb>li:nth-child(${i})`)
        // Đợi nó chút để cho nó load ảnh ra :D
        await page.waitFor(3000)
        // Lại chạy evaluate để lấy ảnh to ra nào
        let newImg = await page.evaluate(() => {
            return document.querySelector("#J_ImgBooth").getAttribute('src')
        })
        // Push it
        images.push(newImg)
    }

    // Hiển thị kết quả
    console.log(images)

    browser.close();
})();

/////////////////////// SCRAPE CHEERIO/////////////////////////////
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

url = 'http://www.imdb.com/title/tt1229340/';

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var title, release, rating;
    var json = { title : "", release : "", rating : ""};

    $('.header').filter(function(){
        var data = $(this);
        title = data.children().first().text();            
        release = data.children().last().children().text();

        json.title = title;
        json.release = release;
    })

    $('.star-box-giga-star').filter(function(){
        var data = $(this);
        rating = data.text();

        json.rating = rating;
    })
}

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check your console!')

    }) ;
})