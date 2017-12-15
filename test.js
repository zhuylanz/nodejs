var nodemailer = require('nodemailer');
var config = require('./secret.js');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: config.mail_id,
		pass: config.mail_pass
	}
});

var mailOptions = {
	from: 'zhuylanz@gmail.com',
	to: 'thuyuyenn27@gmail.com, zhuylanz1@gmail.com',
	subject: 'Test gui mail tu Nuhula Server',
	text: 'Uyên chó điên hí hí hí'
};
console.log('ok');
transporter.sendMail(mailOptions, function(error, info){
	if (error) {
		console.log(error);
	} else {
		console.log('Email sent: ' + info.response);
		console.log(info);
	}
});