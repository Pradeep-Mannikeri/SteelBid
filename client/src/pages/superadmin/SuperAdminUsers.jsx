import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { SuperAdminWrapper } from "../../assets/Wrappers/SuperAdminWrapper";
import { EstimationContext } from "../../context/EstimationContext";

const SuperAdminUsers = () => {
  const { currentUser } = useContext(EstimationContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/admin/app-stats");
      if (res.status === 401 || res.status === 403) {
        setError("Unauthorized access");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setUsers(data.userStats || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch registered users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

      await fetchUsers();
    } catch (err) {
      console.error("Failed to update user role:", err);
      alert("Something went wrong");
    }
  };

  const handleTypeToggle = async (userId, currentType) => {
    const newType = currentType === "paid" ? "demo" : "paid";
    if (!window.confirm(`Are you sure you want to change this user's account to ${newType}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/v1/admin/users/${userId}/type`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userType: newType }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.msg || "Failed to update user type");
        return;
      }

      await fetchUsers();
    } catch (err) {
      console.error("Failed to update user type:", err);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <SuperAdminWrapper>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading registered users...</p>
        </div>
      </SuperAdminWrapper>
    );
  }

  if (error) {
    return (
      <SuperAdminWrapper>
        <div style={{ color: "red", padding: "1.5rem", background: "var(--cat-orange)", borderRadius: "var(--radius)" }}>
          {error}
        </div>
      </SuperAdminWrapper>
    );
  }

  const filteredUsers = users.filter(
    (user) =>
      user.userType === "paid" &&
      user.email !== "royalgroups247@gmail.com" &&
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <SuperAdminWrapper>
      <div className="admin-header">
        <h2>System User Monitor</h2>
        <p>Manage user accounts, roles, and client counts.</p>
      </div>

      <section className="table-section">
        <div className="table-header-tools">
          <h3>Active Legal Users ({filteredUsers.length})</h3>
          <input
            type="text"
            placeholder="Search paid users by name or email..."
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
                <th>Status</th>
                <th>Country</th>
                <th>City</th>
                <th>Joined Date</th>
                <th style={{ textAlign: "center" }}>Clients</th>
                <th style={{ textAlign: "center" }}>Estimations</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center", padding: "3rem", color: "var(--grey-500)" }}>
                    No legal paid users found matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const initials = user.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)
                    : "US";
                  
                  const joinedDate = new Date(user.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    });

                  return (
                    <tr key={user._id}>
                      <td>
                        <Link to={`/superadmin/users/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                          <div className="user-profile clickable-profile">
                            <div className="avatar">{initials}</div>
                            <div className="info">
                              <span className="name">{user.name}</span>
                              <span className="email">{user.email}</span>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className="role-badge admin" style={{ textTransform: "uppercase" }}>
                          Paid
                        </span>
                      </td>
                      <td>{user.country || "—"}</td>
                      <td>{user.city || "—"}</td>
                      <td>{joinedDate}</td>
                      <td style={{ fontWeight: 600, textAlign: "center" }}>{user.companyCount}</td>
                      <td style={{ fontWeight: 600, textAlign: "center" }}>{user.estimationCount}</td>
                      <td style={{ textAlign: "center" }}>
                        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                          <button
                            type="button"
                            className="action-btn demote"
                            onClick={() => handleTypeToggle(user._id, user.userType || "paid")}
                          >
                            Make Demo
                          </button>
                          <button
                            type="button"
                            className={`action-btn ${user.role === "admin" ? "demote" : "promote"}`}
                            onClick={() => handleRoleToggle(user._id, user.role)}
                          >
                            {user.role === "admin" ? "Demote" : "Make Admin"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </SuperAdminWrapper>
  );
};

export default SuperAdminUsers;
