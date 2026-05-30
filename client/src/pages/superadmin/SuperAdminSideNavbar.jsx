import React from "react";
import { SidebarWrapper } from "../../assets/Wrappers/DashboardWrapper";
import {
  FaChartBar,
  FaTimes,
  FaUsers,
  FaArrowLeft,
  FaCommentAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo1.png";
import logoDark from "../../assets/images/logo2.png";

const SuperAdminSideNavbar = ({ showSidebar, toggleSidebar, isDarkTheme }) => {
  const links = [
    { id: 1, text: "Overview Stats", path: ".", icon: <FaChartBar /> },
    { id: 2, text: "User Monitor", path: "users", icon: <FaUsers /> },
    { id: 3, text: "Demo Users", path: "demo-users", icon: <FaUsers /> },
    { id: 4, text: "Customer", path: "customer", icon: <FaCommentAlt /> },
  ];

  return (
    <SidebarWrapper className={showSidebar ? "show-sidebar" : ""}>
      <div className="sidebar-container">
        <button type="button" className="close-btn" onClick={toggleSidebar}>
          <FaTimes />
        </button>
        <header>
          <NavLink to="/" className="logo-container" end>
            <img src={isDarkTheme ? logoDark : logo} alt="logo" className="logo-img" />
          </NavLink>
        </header>
        <div className="content">
          <div className="nav-links">
            {links.map((link) => {
              const { text, path, id, icon } = link;
              return (
                <NavLink
                  to={path}
                  key={id}
                  className="nav-link"
                  onClick={() => {
                    if (window.innerWidth < 992) {
                      toggleSidebar();
                    }
                  }}
                  end
                >
                  {icon && <span className="icon">{icon}</span>}
                  {text}
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className="sidebar-footer">
          <NavLink
            to="/dashboard"
            className="nav-link contact-link"
            style={{ fontSize: "0.85rem" }}
          >
            <span className="icon"><FaArrowLeft /></span>
            Exit to User App
          </NavLink>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default SuperAdminSideNavbar;
