import React from 'react';
import { NavbarWrapper } from '../../assets/Wrappers/DashboardWrapper';
import { FaAlignLeft, FaSun, FaMoon, FaShieldAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SuperAdminNavbar = ({ toggleSidebar, isDarkTheme, toggleTheme }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("/api/v1/auth/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    }
    navigate("/");
  };

  return (
    <NavbarWrapper>
      <div className='nav-center'>
        <button type='button' className='btn btn-icon outline-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--grey-900)' }}>
          <FaShieldAlt style={{ fontSize: '1.25rem', color: 'var(--primary-600)' }} />
          <h3 className='logo-text' style={{ margin: 0, fontSize: '1.25rem' }}>
            Admin Console
          </h3>
        </div>
        <div className='btn-container' style={{ gap: '0.8rem' }}>
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

export default SuperAdminNavbar;
