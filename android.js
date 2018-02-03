const fs = require('fs');
const mv = require('mv');

let fol1 = '/storage/emulated/0/Download/';
let fol2 = '/storage/C7A9-BA87/';
let files = fs.readdirSync(fol1);

files.forEach((item) => {
	console.log(item);
	// fs.createReadStream(fol1+item).pipe(fs.createWriteStream(fol2+item));
	mv(fol1+item, fol2+item);
});