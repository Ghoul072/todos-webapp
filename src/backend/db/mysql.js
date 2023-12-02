require('dotenv').config();

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'todo_app'
});

console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);

connection.connect((error) => {
    if(error) {
        console.error(`Error connecting to MySQL Server: ${error}`);
    } else {
        console.log('Connection to MySQL server successfully established');
    }
});

module.exports = connection;
