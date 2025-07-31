import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => setError('Failed to load product.'));
  }, [id]);

  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">
        <h2>{product.name}</h2>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Department:</strong> {product.department}</p>
        <p className="description">{product.description || 'No description available.'}</p>
      </div>
    </div>
  );
}

export default ProductDetail;
