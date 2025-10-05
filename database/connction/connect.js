const mysql = require("mysql2");
dotenv = require('dotenv');

dotenv.config();

HOST = process.env.DB_HOST || 'localhost';
USERNAME = process.env.DB_USERNAME || 'root';
PASSWORD = process.env.DB_PASSWORD || '';
DATABASE = process.env.DB_NAME || 'smart_path';

console.log(`Connecting to database at ${HOST} with user ${USERNAME}`);

module.exports = mysql.createPool({
    host: HOST,
    user: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
});
