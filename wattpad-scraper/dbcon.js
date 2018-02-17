const pgp = require('pg-promise')();
const db = pgp('postgres://zhuylanz:hlschangyeuai0@nuhula-service.ddns.net:53141/nuso-graph');

module.exports = db;