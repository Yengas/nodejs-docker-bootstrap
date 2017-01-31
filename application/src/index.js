const config = require('./config');
const mysql = require('mysql2/promise');
const pool = mysql.createPool(config.database);

pool.query('SELECT 2').then(console.log).catch(() => process.exit(-1));

