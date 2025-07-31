const db = require('../models/db');

// GET /api/departments
exports.getAllDepartments = (req, res) => {
  const query = `
    SELECT d.id, d.name, COUNT(p.id) AS product_count
    FROM departments d
    LEFT JOIN products p ON d.id = p.department_id
    GROUP BY d.id, d.name
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch departments' });
    res.status(200).json({ departments: results });
  });
};

// GET /api/departments/:id
exports.getDepartmentById = (req, res) => {
  const query = 'SELECT * FROM departments WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch department' });
    if (results.length === 0) return res.status(404).json({ error: 'Department not found' });
    res.status(200).json(results[0]);
  });
};

// GET /api/departments/:id/products
exports.getProductsByDepartment = (req, res) => {
  const departmentId = req.params.id;

  const getDepartment = 'SELECT name FROM departments WHERE id = ?';
  const getProducts = `
    SELECT p.id, p.name, p.price
    FROM products p
    WHERE p.department_id = ?
  `;

  db.query(getDepartment, [departmentId], (err, deptResult) => {
    if (err) return res.status(500).json({ error: 'Error checking department' });
    if (deptResult.length === 0) return res.status(404).json({ error: 'Department not found' });

    const deptName = deptResult[0].name;

    db.query(getProducts, [departmentId], (err, products) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch products' });
      if (products.length === 0)
        return res.status(404).json({ error: 'No products in this department' });

      res.status(200).json({
        department: deptName,
        products: products
      });
    });
  });
};
