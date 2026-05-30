import React, { useState, useEffect } from "react";
import { SuperAdminWrapper } from "../../assets/Wrappers/SuperAdminWrapper";
import styled from "styled-components";
import {
  FaUsers,
  FaBuilding,
  FaCalculator,
  FaCogs,
  FaSave,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const SuperAdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Settings edit states
  const [demoLimitInput, setDemoLimitInput] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState({ text: "", type: "" });

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
      setStats(data.overallStats);
      setDemoLimitInput(data.overallStats?.demoLimit ?? 5);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch admin statistics");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if (!demoLimitInput || isNaN(demoLimitInput) || Number(demoLimitInput) < 1) {
      setSettingsMessage({ text: "Please enter a valid number greater than 0", type: "error" });
      return;
    }

    setSavingSettings(true);
    setSettingsMessage({ text: "", type: "" });
    try {
      const res = await fetch("/api/v1/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ demoLimit: Number(demoLimitInput) }),
      });
      const data = await res.json();
      if (res.ok) {
        setSettingsMessage({ text: "Settings updated successfully!", type: "success" });
        setStats(prev => ({ ...prev, demoLimit: data.settings.demoLimit }));
        // Clear message after 3 seconds
        setTimeout(() => {
          setSettingsMessage(prev => prev.text === "Settings updated successfully!" ? { text: "", type: "" } : prev);
        }, 3000);
      } else {
        setSettingsMessage({ text: data.msg || "Failed to update settings", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setSettingsMessage({ text: "An error occurred while saving settings", type: "error" });
    } finally {
      setSavingSettings(false);
    }
  };

  if (loading) {
    return (
      <SuperAdminWrapper>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading application statistics...</p>
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

  return (
    <SuperAdminWrapper>
      <div className="admin-header">
        <h2>App Stats Overview</h2>
        <p>Monitor platform usage metrics, registered companies, and estimated totals.</p>
      </div>

      <section className="stats-grid">
        <div className="stat-card users">
          <div className="icon-container">
            <FaUsers />
          </div>
          <div className="info">
            <h4>Total Users</h4>
            <p>{stats.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card companies">
          <div className="icon-container">
            <FaBuilding />
          </div>
          <div className="info">
            <h4>Registered Clients</h4>
            <p>{stats.totalCompanies}</p>
          </div>
        </div>

        <div className="stat-card estimations">
          <div className="icon-container">
            <FaCalculator />
          </div>
          <div className="info">
            <h4>Total Estimations</h4>
            <p>{stats.totalEstimations}</p>
          </div>
        </div>
      </section>

      <SettingsContainer>
        <div className="settings-header">
          <FaCogs />
          <h3>Trial & Demo Configurations</h3>
        </div>
        <div className="settings-body">
          <p className="settings-description">
            Define system-wide rules for trial limits. Guest users (tracked via local storage) and registered demo accounts are restricted to the configured limit before requiring an upgrade.
          </p>

          <form onSubmit={handleSaveSettings}>
            <div className="form-group">
              <label htmlFor="demoLimit">Demo & Guest Calculator Usage Limit</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="demoLimit"
                  min="1"
                  max="1000"
                  value={demoLimitInput}
                  onChange={(e) => setDemoLimitInput(e.target.value)}
                  disabled={savingSettings}
                  placeholder="e.g. 5"
                />
                <button type="submit" disabled={savingSettings}>
                  <FaSave />
                  {savingSettings ? "Saving..." : "Save Settings"}
                </button>
              </div>
              
              {settingsMessage.text && (
                <div className={`feedback-msg ${settingsMessage.type}`}>
                  {settingsMessage.type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
                  <span>{settingsMessage.text}</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </SettingsContainer>
    </SuperAdminWrapper>
  );
};

const SettingsContainer = styled.div`
  margin-top: 2rem;
  background: var(--white);
  border-radius: var(--radius);
  border: 1px solid var(--sidebar-border);
  box-shadow: var(--shadow-2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.5s ease-in-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .settings-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--sidebar-border);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--grey-50);
    
    h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--grey-800);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    svg {
      color: var(--primary-600);
      font-size: 1.25rem;
    }
  }

  .settings-body {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .settings-description {
    color: var(--grey-500);
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 450px;

    label {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--grey-700);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .input-wrapper {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    input {
      flex: 1;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      border: 1px solid var(--grey-300);
      background: var(--input-bg);
      color: var(--grey-900);
      font-size: 0.95rem;
      transition: var(--transition);
      outline: none;

      &:focus {
        border-color: var(--primary-500);
        box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
      }
    }

    button {
      padding: 0.75rem 1.5rem;
      background: var(--primary-600);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: var(--transition);

      &:hover:not(:disabled) {
        background: var(--primary-700);
        transform: translateY(-1px);
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }

  .feedback-msg {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    margin-top: 0.25rem;

    &.success {
      background: rgba(16, 185, 129, 0.1);
      color: var(--cat-green-text, #10b981);
      border: 1px solid rgba(16, 185, 129, 0.2);
    }

    &.error {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }
  }

  body.dark-theme & {
    background: #0f172a;
    border-color: #1e293b;

    .settings-header {
      background: #1e293b;
      border-bottom: 1px solid #334155;
      h3 { color: #f8fafc; }
    }

    .form-group label {
      color: #94a3b8;
    }

    .form-group input {
      background: #020617;
      border-color: #334155;
      color: #f8fafc;
      &:focus {
        border-color: var(--primary-500);
      }
    }
  }
`;

export default SuperAdminStats;
