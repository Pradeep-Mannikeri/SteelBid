import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { SuperAdminWrapper } from "../../assets/Wrappers/SuperAdminWrapper";
import { FaArrowLeft, FaBuilding, FaCalculator, FaCalendarAlt, FaEnvelope, FaUser, FaPhone, FaGlobe } from "react-icons/fa";

const SuperAdminUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/v1/admin/users/${id}`);
      if (res.status === 401 || res.status === 403) {
        setError("Unauthorized access");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        const errData = await res.json();
        setError(errData.msg || "Failed to fetch user details");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setUserData(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while loading user details");
      setLoading(false);
    }
  };

  const handleRoleToggle = async () => {
    const newRole = user.role === "admin" ? "user" : "admin";
    if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/v1/admin/users/${user._id}/role`, {
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

      await fetchUserDetails();
    } catch (err) {
      console.error("Failed to update user role:", err);
      alert("Something went wrong");
    }
  };

  const handleTypeToggle = async () => {
    const newType = user.userType === "paid" ? "demo" : "paid";
    const confirmMsg = newType === "paid"
      ? "Are you sure you want to mark this user as Paid/Legal?"
      : "Are you sure you want to change this user's account to Demo status?";
    if (!window.confirm(confirmMsg)) {
      return;
    }

    try {
      const res = await fetch(`/api/v1/admin/users/${user._id}/type`, {
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

      await fetchUserDetails();
    } catch (err) {
      console.error("Failed to update user type:", err);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  if (loading) {
    return (
      <SuperAdminWrapper>
        <button type="button" onClick={() => navigate("/superadmin/users")} className="back-btn">
          <FaArrowLeft /> Back to System User Monitor
        </button>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading user details...</p>
        </div>
      </SuperAdminWrapper>
    );
  }

  if (error) {
    return (
      <SuperAdminWrapper>
        <button type="button" onClick={() => navigate("/superadmin/users")} className="back-btn">
          <FaArrowLeft /> Back to System User Monitor
        </button>
        <div style={{ color: "red", padding: "1.5rem", background: "var(--cat-orange)", borderRadius: "var(--radius)", marginTop: "1rem" }}>
          {error}
        </div>
      </SuperAdminWrapper>
    );
  }

  const { user, companies, estimations } = userData;

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
    month: "long",
    day: "numeric",
  });

  return (
    <SuperAdminWrapper>
      <button type="button" onClick={() => navigate("/superadmin/users")} className="back-btn">
        <FaArrowLeft /> Back to System User Monitor
      </button>

      <section className="user-profile-card">
        <div className="user-main-info">
          <div className="large-avatar">{initials}</div>
          <div className="details">
            <h3>{user.name}</h3>
            <span className="email">
              <FaEnvelope style={{ marginRight: "0.4rem", verticalAlign: "middle" }} />
              {user.email}
            </span>
            {user.phoneNumber && (
              <span className="email" style={{ marginTop: "0.25rem", display: "inline-block" }}>
                <FaPhone style={{ marginRight: "0.4rem", verticalAlign: "middle", transform: "scaleX(-1)" }} />
                {user.phoneNumber}
              </span>
            )}
            <div className="role-date">
              <span className={`role-badge ${user.role}`}>{user.role}</span>
              <span
                className={`role-badge ${user.userType === "paid" ? "admin" : "user"}`}
                style={{
                  background: user.userType === "paid" ? "" : "var(--cat-orange)",
                  color: user.userType === "paid" ? "" : "var(--cat-orange-text)",
                  textTransform: "uppercase"
                }}
              >
                {user.userType === "paid" ? "Paid" : "Demo"}
              </span>
              {user.country && (
                <span>
                  <FaGlobe style={{ marginRight: "0.4rem", verticalAlign: "middle" }} />
                  {user.city ? `${user.city}, ${user.country}` : user.country}
                </span>
              )}
              <span>
                <FaCalendarAlt style={{ marginRight: "0.4rem", verticalAlign: "middle" }} />
                Joined on {joinedDate}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2.5rem" }}>
          <div className="user-actions" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", minWidth: "140px" }}>
            <button
              type="button"
              className={`action-btn ${user.userType === "paid" ? "demote" : "promote"}`}
              style={{ width: "100%" }}
              onClick={handleTypeToggle}
            >
              {user.userType === "paid" ? "Make Demo" : "Approve / Paid"}
            </button>
            <button
              type="button"
              className={`action-btn ${user.role === "admin" ? "demote" : "promote"}`}
              style={{ width: "100%" }}
              onClick={handleRoleToggle}
            >
              {user.role === "admin" ? "Demote" : "Make Admin"}
            </button>
          </div>

          <div className="user-meta-stats">
            <div className="meta-stat">
              <span className="value">{companies.length}</span>
              <span className="label">Clients</span>
            </div>
            <div className="meta-stat">
              <span className="value">{estimations.length}</span>
              <span className="label">Estimations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="detail-section table-section">
        <div className="table-header-tools">
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <FaBuilding style={{ color: "var(--primary-500)" }} />
            Clients Registered ({companies.length})
          </h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Fabricator name</th>
                <th>Contact Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {companies.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "2.5rem", color: "var(--grey-500)" }}>
                    No clients registered by this user.
                  </td>
                </tr>
              ) : (
                companies.map((company) => {
                  const companyDate = new Date(company.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });
                  return (
                    <tr key={company._id}>
                      <td style={{ fontWeight: 600 }}>{company.companyName}</td>
                      <td>{company.email || "N/A"}</td>
                      <td>{company.phoneNumber || "N/A"}</td>
                      <td>{company.companyAddress || "N/A"}</td>
                      <td>{companyDate}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Estimations Section */}
      <section className="detail-section table-section">
        <div className="table-header-tools">
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <FaCalculator style={{ color: "var(--primary-500)" }} />
            Estimations Created ({estimations.length})
          </h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Project Details</th>
                <th>Estimator</th>
                <th>Client Name</th>
                <th>Status</th>
                <th style={{ textAlign: "center" }}>Hours</th>
                <th style={{ textAlign: "right" }}>Valuation</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {estimations.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "2.5rem", color: "var(--grey-500)" }}>
                    No estimations created by this user.
                  </td>
                </tr>
              ) : (
                estimations.map((estimation) => {
                  const estDate = new Date(estimation.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });
                  const formattedPrice = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(estimation.price || 0);

                  return (
                    <tr key={estimation._id}>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontWeight: 600 }}>{estimation.projectName || "Unnamed Project"}</span>
                          <span style={{ fontSize: "0.75rem", color: "var(--grey-500)" }}>{estimation.projectNumber || "N/A"}</span>
                        </div>
                      </td>
                      <td>{estimation.estimator || "N/A"}</td>
                      <td>{estimation.companyName || "N/A"}</td>
                      <td>
                        <span className={`role-badge ${estimation.status === "completed" ? "admin" : "user"}`}>
                          {estimation.status}
                        </span>
                      </td>
                      <td style={{ textAlign: "center" }}>{estimation.hours || 0} hrs</td>
                      <td style={{ textAlign: "right", fontWeight: 600 }}>{formattedPrice}</td>
                      <td>{estDate}</td>
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

export default SuperAdminUserDetails;
