const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.OPEN_DENTAL_DB_HOST,
    user: process.env.OPEN_DENTAL_DB_USER,
    password: process.env.OPEN_DENTAL_DB_PASS,
    database: process.env.OPEN_DENTAL_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;
