import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        setError('Failed to fetch product details.');
      });
  }, [id]);

  if (error) return <p className="error-text">{error}</p>;
  if (!product) return <p className="loading-text">Loading...</p>;

  return (
    <div className="product-detail-container">
      <div className="product-card-detail">
        <h2>{product.name}</h2>
        <p><strong>Price:</strong> ₹ {product.retail_price}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Department:</strong> {product.department}</p>
        {/* Add image if available */}
        {product.image && (
          <img src={product.image} alt={product.name} className="product-image" />
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
