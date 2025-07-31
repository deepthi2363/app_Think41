import { Link, useLocation } from 'react-router-dom';
import './TopNavBar.css'; // or whatever your CSS file is named

function TopNavBar() {
  const location = useLocation();

  return (
    <div className="d-flex justify-content-center my-3">
  <Link to="/" className={`btn mx-2 ${location.pathname === '/' ? 'btn-primary' : 'btn-outline-primary'}`}>
    All
  </Link>
  <Link to="/departments/1" className={`btn mx-2 ${location.pathname === '/departments/1' ? 'btn-primary' : 'btn-outline-primary'}`}>
    Women
  </Link>
  <Link to="/departments/2" className={`btn mx-2 ${location.pathname === '/departments/2' ? 'btn-primary' : 'btn-outline-primary'}`}>
    Men
  </Link>
</div>

  );
}

export default TopNavBar;
