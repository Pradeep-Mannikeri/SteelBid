import React from "react";
import { SidebarWrapper } from "../assets/Wrappers/DashboardWrapper";
import {
  FaHome,
  FaCalculator,
  FaFileInvoiceDollar,
  FaChartBar,
  FaTimes,
  FaUserPlus,
  FaEnvelope,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import logoDark from "../assets/logo 2.svg";

const SideNavbar = ({ showSidebar, toggleSidebar, isDarkTheme }) => {
  const links = [
    { id: 1, text: "Stats", path: ".", icon: <FaChartBar /> },
    { id: 2, text: "Add Company", path: "add-company", icon: <FaUserPlus /> },
    { id: 3, text: "Estimations", path: "estimations", icon: <FaCalculator /> },
    {
      id: 4,
      text: "Bid Management",
      path: "invoices",
      icon: <FaFileInvoiceDollar />,
    },
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
            to="contact"
            className="nav-link contact-link"
            onClick={() => {
              if (window.innerWidth < 992) {
                toggleSidebar();
              }
            }}
            end
          >
            <span className="icon"><FaEnvelope /></span>
            Get in touch with us
          </NavLink>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default SideNavbar;
