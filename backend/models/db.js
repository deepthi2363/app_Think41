const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // use your MySQL password
  database: 'ecommerce_db' // replace with your DB
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

module.exports = db;
