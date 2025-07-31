import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import DepartmentProducts from './pages/DepartmentProducts'; // ✅ NEW
import TopNavBar from './components/TopNavBar'; // ✅ NEW

function App() {
  return (
    <Router>
      <TopNavBar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/departments/:id" element={<DepartmentProducts />} /> {/* ✅ NEW */}
      </Routes>
    </Router>
  );
}

export default App;
