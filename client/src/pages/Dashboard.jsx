import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SideNavbar from '../components/SideNavbar';
import { DashboardContainer, DashboardMain } from '../assets/Wrappers/DashboardWrapper';

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const themeReset = localStorage.getItem("theme_reset_v1");

    if (!themeReset) {
      localStorage.setItem("theme", "light");
      localStorage.setItem("theme_reset_v1", "true");
      setIsDarkTheme(false);
      document.body.classList.remove("dark-theme");
      return;
    }

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

  return (
    <DashboardContainer>
      <SideNavbar 
        showSidebar={showSidebar} 
        toggleSidebar={toggleSidebar} 
        isDarkTheme={isDarkTheme}
      />
      <div className="main-content">
        <Navbar 
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

export default Dashboard;
