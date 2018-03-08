const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const watter = require('../engine/watt_engine.js');

router.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../views/watt_index.html'));
});


function SocketIO(socket) {
	let session_id = socket.id;
	console.log('------------------------\n>>new session: '+ session_id);

	socket.on('scrape', function(msg, fn){
		let logfile = (__dirname + '/../logs/log-' + session_id.replace(/\//g,''));
		console.log('>watt-ing: ' + msg);

		fn('Scraping...');
		watter(msg, logfile);
		
		//log:
		(function log_watt() {
			let loggings = fs.readFileSync(logfile, 'utf8');
			socket.emit('log_watt', loggings.split('\n'));

			if (loggings.endsWith('--watt-ended--\n')) {
				console.log('>log_watt ended');
				socket.emit('log_watt ended', 'log_watt ended : OK');
				// fs.unlinkSync(logfile);
				return;
			}
			setTimeout(log_watt, 500);
		})();

	});

	//on disconnect
	socket.on('disconnect', () => {
		console.log('<<user disconnected: ' + session_id);
	});
};


module.exports = {
	router : router,
	socket : SocketIO
}