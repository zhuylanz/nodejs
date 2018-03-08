const path = require('path');
const express = require('express');
const router = express.Router();
const db = require('../dbcon.js');

router.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../views/graph_index.html'));
});


function SocketIO(socket) {
	let session_id = socket.id;
	console.log('------------------------\n>>new session: ' + session_id);
	socket.on('fb-login', (msg, fn) => {
		fn('Received Info');
		console.log(msg.authResponse.userID);
		if (msg.status === 'connected') {
			let unix_time = Math.floor(new Date()/1000);

			db.task(t => {
				return t.any('SELECT uid FROM users WHERE uid=$1', msg.authResponse.userID)
				.then(data => {
					if(data.length != 0) {
						return t.any('UPDATE users SET token = $1, expire = $2 WHERE uid = $3', [msg.authResponse.accessToken, msg.authResponse.expiresIn+unix_time, msg.authResponse.userID]);
					} else {
						return t.any('INSERT INTO users (uid, token, expire) VALUES ($1, $2, $3)', [msg.authResponse.userID, msg.authResponse.accessToken, msg.authResponse.expiresIn+unix_time]);
					}
				})
				.catch(err => {
					console.log(err);
				});
			});
		}
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