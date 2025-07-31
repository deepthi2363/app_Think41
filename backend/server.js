const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ecommerce_db'
});

// Get all products
app.get('/api/products', (req, res) => {
  db.query(`
    SELECT p.id, p.name, p.retail_price, d.name AS department
    FROM products p
    JOIN departments d ON p.department_id = d.id;
  `, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  db.query(`
    SELECT p.id, p.name, p.price, d.name AS department
    FROM products p
    JOIN departments d ON p.department_id = d.id
    WHERE p.id = ?
  `, [productId], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(results[0]);
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
