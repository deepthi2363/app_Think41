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
  const sql = `
    SELECT p.id, p.name, p.retail_price AS price, d.name AS department
    FROM products p
    JOIN departments d ON p.department_id = d.id
    WHERE p.id = ?
  `;
  db.query(sql, [productId], (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result[0]);
  });
});




app.listen(5000, () => {
  console.log('Server running on port 5000');
});

// Get all departments with product count
app.get('/api/departments', (req, res) => {
  const sql = `
    SELECT d.id, d.name, COUNT(p.id) AS product_count
    FROM departments d
    LEFT JOIN products p ON d.id = p.department_id
    GROUP BY d.id, d.name
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch departments' });
    res.status(200).json({ departments: results });
  });
});

// Get a specific department by ID
app.get('/api/departments/:id', (req, res) => {
  const deptId = req.params.id;
  const sql = 'SELECT * FROM departments WHERE id = ?';

  db.query(sql, [deptId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch department' });
    if (results.length === 0) return res.status(404).json({ error: 'Department not found' });
    res.status(200).json(results[0]);
  });
});

// Get products in a specific department
app.get('/api/departments/:id/products', (req, res) => {
  const deptId = req.params.id;

  const deptQuery = 'SELECT name FROM departments WHERE id = ?';
  const productQuery = `
    SELECT id, name, retail_price AS price
    FROM products
    WHERE department_id = ?
  `;

  db.query(deptQuery, [deptId], (err, deptResult) => {
    if (err) return res.status(500).json({ error: 'Error fetching department' });
    if (deptResult.length === 0) return res.status(404).json({ error: 'Department not found' });

    const deptName = deptResult[0].name;

    db.query(productQuery, [deptId], (err, products) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch products' });
      if (products.length === 0)
        return res.status(404).json({ error: 'No products found in this department' });

      res.status(200).json({
        department: deptName,
        products: products
      });
    });
  });
});
