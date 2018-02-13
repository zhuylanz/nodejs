const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const watt_io = io.of('/wattpad-scraper');
const watt = require('./routes/watt.js');
const graph = require('./routes/graph.js');

const pgp = require('pg-promise')();
const db = pgp('postgres://zhuylanz:hlschangyeuai0@localhost:5432/nuso-graph');

db.any('UPDATE users SET token=$1, expire=$2 WHERE uid=$3', ['abcd', 5353, '31413'], (ev) => { ev && ev.id })
.then(function (data) {
	console.log('DATA:', data);
})
.catch(function (error) {
	console.log('ERROR: ' + error);
	db.none('INSERT INTO users (uid, token, expire) VALUES ($1, $2, $3)', ['314', 'abcd', 5353]).then(function (data) {
		console.log('DATA:', data);
	})
	.catch(function (error) {
		console.log('ERROR:', error);
	});
});


//-----routing-----//
app.use(express.static(__dirname));
app.use('/wattpad-scraper', watt.router);
app.use('/graph', graph.router);

//-----socketIO-----//
watt_io.on('connection', watt.socket);

//-----listening-----//
http.listen(3214, () => { console.log('Wattpadd Scraper Up and Running on Port 3214'); });