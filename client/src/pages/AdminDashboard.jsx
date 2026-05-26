import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { EstimationContext } from "../context/EstimationContext";
import { AdminContainer } from "../assets/Wrappers/AdminDashboardWrapper";
import {
  FaUsers,
  FaBuilding,
  FaCalculator,
  FaClock,
  FaDollarSign,
  FaArrowLeft,
  FaSun,
  FaMoon,
  FaShieldAlt,
} from "react-icons/fa";
import logo from "../assets/logo.svg";
import logoDark from "../assets/logo 2.svg";

const AdminDashboard = () => {
  const { currentUser, loading: userLoading } = useContext(EstimationContext);
  const navigate = useNavigate();
  
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Theme state
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Check initial theme from localStorage
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

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/admin/app-stats");
      if (res.status === 401 || res.status === 403) {
        setError("Unauthorized access");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setStats(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch admin statistics");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.role === "admin") {
      fetchStats();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await fetch("/api/v1/auth/logout");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleRoleToggle = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/v1/admin/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.msg || "Failed to update role");
        return;
      }

      // Refresh data
      await fetchStats();
    } catch (err) {
      console.error("Failed to update user role:", err);
      alert("Something went wrong");
    }
  };

  // Auth Guard
  if (userLoading) {
    return (
      <AdminContainer>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Verifying admin permissions...</p>
        </div>
      </AdminContainer>
    );
  }

  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  if (loading) {
    return (
      <AdminContainer>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading application statistics...</p>
        </div>
      </AdminContainer>
    );
  }

  const { overallStats, userStats } = stats || {
    overallStats: { totalUsers: 0, totalCompanies: 0, totalEstimations: 0, totalPrice: 0, totalHours: 0 },
    userStats: [],
  };

  // Filter users based on search term
  const filteredUsers = userStats.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminContainer>
      {/* Standalone Admin Header */}
      <header className="admin-header-nav">
        <div className="nav-center">
          <Link to="/" className="logo-link">
            <img src={isDarkTheme ? logoDark : logo} alt="SteelBid Logo" />
          </Link>
          <div className="admin-title-badge">
            <FaShieldAlt />
            <span>SteelBid Console</span>
            <span className="badge">Super Admin</span>
          </div>
          <div className="nav-actions">
            <Link to="/dashboard" className="back-btn">
              <FaArrowLeft /> Back to Dashboard
            </Link>
            <button 
              type="button" 
              className="btn btn-icon outline-btn" 
              onClick={toggleTheme} 
              title="Toggle Theme"
              style={{ width: "38px", height: "38px", padding: 0 }}
            >
              {isDarkTheme ? <FaSun /> : <FaMoon />}
            </button>
            <button type="button" className="btn btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="admin-content">
        <div className="welcome-section">
          <h1>Application Monitoring Dashboard</h1>
          <p>Monitor platform usage, registered clients, and aggregate revenue generated across all users.</p>
        </div>

        {error && <div style={{ color: "red", padding: "1rem", background: "#fee2e2", borderRadius: "var(--radius)" }}>{error}</div>}

        {/* Stats Grid */}
        <section className="stats-grid">
          <div className="stat-card users">
            <div className="icon-container">
              <FaUsers />
            </div>
            <div className="info">
              <h4>Total Users</h4>
              <p>{overallStats.totalUsers}</p>
            </div>
          </div>

          <div className="stat-card companies">
            <div className="icon-container">
              <FaBuilding />
            </div>
            <div className="info">
              <h4>Registered Clients</h4>
              <p>{overallStats.totalCompanies}</p>
            </div>
          </div>

          <div className="stat-card estimations">
            <div className="icon-container">
              <FaCalculator />
            </div>
            <div className="info">
              <h4>Total Estimations</h4>
              <p>{overallStats.totalEstimations}</p>
            </div>
          </div>

          <div className="stat-card hours">
            <div className="icon-container">
              <FaClock />
            </div>
            <div className="info">
              <h4>Total Bid Hours</h4>
              <p>{overallStats.totalHours.toLocaleString()}</p>
            </div>
          </div>

          <div className="stat-card revenue">
            <div className="icon-container">
              <FaDollarSign />
            </div>
            <div className="info">
              <h4>Total Revenue (Bids)</h4>
              <p>${overallStats.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </section>

        {/* User Monitor Table */}
        <section className="table-section">
          <div className="table-header-tools">
            <h3>Registered Application Users ({filteredUsers.length})</h3>
            <input
              type="text"
              placeholder="Search by name or email..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>User Profile</th>
                  <th>Role</th>
                  <th>Joined Date</th>
                  <th>Clients (Companies)</th>
                  <th>Estimations Created</th>
                  <th>Total Project Hours</th>
                  <th>Revenue Generated</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center", padding: "3rem", color: "var(--grey-500)" }}>
                      No users found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => {
                    const initials = user.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()
                      : "US";
                    const joinedDate = new Date(user.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });

                    return (
                      <tr key={user._id}>
                        <td>
                          <div className="user-profile">
                            <div className="avatar">{initials}</div>
                            <div className="info">
                              <span className="name">{user.name}</span>
                              <span className="email">{user.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`role-badge ${user.role}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>{joinedDate}</td>
                        <td style={{ fontWeight: 600, textAlign: "center" }}>{user.companyCount}</td>
                        <td style={{ fontWeight: 600, textAlign: "center" }}>{user.estimationCount}</td>
                        <td style={{ textAlign: "right" }}>{user.totalHours.toLocaleString()} hrs</td>
                        <td style={{ fontWeight: 700, textAlign: "right", color: "var(--cat-green-text)" }}>
                          ${user.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td>
                          {user._id !== currentUser.userId ? (
                            <button
                              type="button"
                              className={`action-btn ${user.role === "admin" ? "demote" : "promote"}`}
                              onClick={() => handleRoleToggle(user._id, user.role)}
                            >
                              {user.role === "admin" ? "Demote to User" : "Promote to Admin"}
                            </button>
                          ) : (
                            <span style={{ fontSize: "0.8rem", color: "var(--grey-400)", fontStyle: "italic" }}>
                              Current Account
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </AdminContainer>
  );
};

export default AdminDashboard;
