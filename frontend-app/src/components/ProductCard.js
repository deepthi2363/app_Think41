import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';


function ProductCard({ product }) {
  return (
    <div className="card m-3 p-3" style={{ width: '18rem' }}>
      <h5 className="card-title">{product.name}</h5>
      <p className="card-text">₹ {product.retail_price}</p>
      <Link to={`/product/${product.id}`} className="btn btn-primary">
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;
