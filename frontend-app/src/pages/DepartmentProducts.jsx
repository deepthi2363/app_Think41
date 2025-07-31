import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './DepartmentProducts.css'; 

function DepartmentProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [deptName, setDeptName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios.get(`http://localhost:5000/api/departments/${id}/products`)
      .then(res => {
        setProducts(res.data.products);
        setDeptName(res.data.department || "Unknown");
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setProducts([]);
        setDeptName("Unknown");
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="center-text">Loading products...</p>;
  if (error) return <p className="center-text error-text">Failed to load products. Please try again.</p>;

  return (
    <div className="department-container">
      <div className="department-header">
        <h2>{deptName} Department</h2>
        <p>{products.length} product(s)</p>
      </div>

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <h5>{product.name}</h5>
              <p>₹{product.price}</p>
              <Link to={`/product/${product.id}`} className="details-btn">
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="center-text">No products found in this department.</p>
      )}
    </div>
  );
}

export default DepartmentProducts;
