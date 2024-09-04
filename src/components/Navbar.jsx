import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa'; 
import './Navbar.css'; 
import logo from "../assets/app.png";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className='logo'/>
        <h1>DoIt</h1>
      </div>
      <div className="navbar-right">
        <button className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </button>
        <div className={`menu-content ${isMenuOpen ? 'show' : ''}`}>
          {!isAuthenticated ? (
            <button onClick={() => navigate('/login')} className="btn">Login</button>
          ) : (
            <>
              <button className="btn-profile">
                <FaUser /> 
                <span className="tooltip">Profile</span>
              </button>
              <button onClick={handleLogout} className="btn-logout">
                <FaSignOutAlt />
                <span className="tooltip">Logout</span> 
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
