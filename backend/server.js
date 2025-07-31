app.get('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const product = products.find(p => p.id == id); // use == or convert types carefully

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});
