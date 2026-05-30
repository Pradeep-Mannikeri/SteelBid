import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import SuperAdminNavbar from './SuperAdminNavbar';
import SuperAdminSideNavbar from './SuperAdminSideNavbar';
import { DashboardContainer, DashboardMain } from '../../assets/Wrappers/DashboardWrapper';
import { EstimationContext } from '../../context/EstimationContext';

const SuperAdminDashboard = () => {
  const { currentUser, loading: userLoading } = useContext(EstimationContext);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkTheme(true);
      document.body.classList.add("dark-theme");
    } else {
      setIsDarkTheme(false);
      document.body.classList.remove("dark-theme");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    if (newTheme) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Auth Guard
  if (userLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--grey-500)' }}>
        <p>Verifying admin permissions...</p>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <DashboardContainer>
      <SuperAdminSideNavbar 
        showSidebar={showSidebar} 
        toggleSidebar={toggleSidebar} 
        isDarkTheme={isDarkTheme}
      />
      <div className="main-content">
        <SuperAdminNavbar 
          toggleSidebar={toggleSidebar} 
          isDarkTheme={isDarkTheme} 
          toggleTheme={toggleTheme} 
        />
        <DashboardMain>
          <Outlet />
        </DashboardMain>
      </div>
    </DashboardContainer>
  );
};

export default SuperAdminDashboard;
