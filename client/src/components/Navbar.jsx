import React, { useState, useEffect, useContext } from 'react';
import { NavbarWrapper } from '../assets/Wrappers/DashboardWrapper';
import { FaAlignLeft, FaUserCircle, FaCaretDown, FaSun, FaMoon } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { EstimationContext } from '../context/EstimationContext';

const Navbar = ({ toggleSidebar, isDarkTheme, toggleTheme }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(EstimationContext);

  const handleLogout = async () => {
    try {
      await fetch("/api/v1/auth/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    }
    navigate("/login");
  };

  return (
    <NavbarWrapper>
      <div className='nav-center'>
        <button type='button' className='btn btn-icon outline-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <h3 className='logo-text'>Dashboard</h3>
        </div>
        <div className='btn-container' style={{ gap: '0.8rem' }}>
          {currentUser?.role === 'admin' && (
            <Link to='/admin-dashboard' className='btn outline-btn' style={{ textDecoration: 'none', padding: '0.5rem 1rem' }}>
              Admin Console
            </Link>
          )}
          <button 
            type='button' 
            className='btn btn-icon outline-btn' 
            onClick={toggleTheme} 
            title="Toggle Theme"
          >
            {isDarkTheme ? <FaSun /> : <FaMoon />}
          </button>
          <button type='button' className='btn logout-btn' onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
