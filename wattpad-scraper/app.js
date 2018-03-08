const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const watt_io = io.of('/wattpad-scraper');
const graph_io = io.of('/graph');

const watt = require('./routes/watt.js');
const graph = require('./routes/graph.js');

const db = require('./dbcon.js');

// db.task(t => {
// 	return t.any('SELECT * FROM users WHERE uid=$1', '314')
// 	.then(function (data) {
// 		console.log('DATA:', data);
// 	return t.any('SELECT * FROM users WHERE uid=$1', '314d')
// 	.then(function (data) {
// 		console.log('DATA:', data);
// 	})
// 	.catch(function (error) {
// 		console.log('ERROR: ' + error);
// 	});
// 	})
// 	.catch(function (error) {
// 		console.log('ERROR: ' + error);
// 	});

// });

//-----routing-----//
app.use(express.static(__dirname));
app.use('/wattpad-scraper', watt.router);
app.use('/graph', graph.router);

//-----socketIO-----//
watt_io.on('connection', watt.socket);
graph_io.on('connection', graph.socket);

//-----listening-----//
http.listen(3214, () => { console.log('Wattpadd Scraper Up and Running on Port 3214'); });