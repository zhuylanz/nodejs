//get group mem uid;
uidlist = '';
$('.clearfix').each(function(i, el) {
	let data = $(el);
	let id = data.attr('id');
	if(id) {
		let uid = id.match(/\d{5,}/g);
		if (uid) {
			uidlist += uid[0] + ';'
		}
	}
});
console.log(uidlist);