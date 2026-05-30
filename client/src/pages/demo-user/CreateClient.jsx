import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import EstimationCalculator from "../../components/EstimationCalculator";
import { EstimationContext } from "../../context/EstimationContext";
import { FaArrowLeft, FaCalendarAlt, FaClipboardList, FaProjectDiagram, FaUserTie, FaSignOutAlt, FaTimes, FaDollarSign, FaLock, FaExclamationCircle, FaPlus } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import { GrSteps } from "react-icons/gr";

const CreateClient = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isDemoRoute = location.pathname === "/demo-user";
  const [isBidModalOpen, setIsBidModalOpen] = useState(() => {
    if (!isDemoRoute) return false;
    return !sessionStorage.getItem("demoBidFilled");
  });

  const { addEstimation, companies, estimations, currentUser, loading, logoutUser } = useContext(EstimationContext);
  const [demoLimit, setDemoLimit] = useState(5);
  const [demoUsageCount, setDemoUsageCount] = useState(() => {
    return parseInt(localStorage.getItem("demoEstimationsCount") || "0", 10);
  });
  const [backendBlocked, setBackendBlocked] = useState(false);
  const [backendBlockedMsg, setBackendBlockedMsg] = useState("");
  const [submittingDemoReg, setSubmittingDemoReg] = useState(false);
  const [regErrorMsg, setRegErrorMsg] = useState("");

  useEffect(() => {
    if (isDemoRoute && !loading) {
      if (!currentUser) {
        navigate("/register", { state: { redirectTo: "/demo-user" }, replace: true });
      } else {
        setIsBidModalOpen(false);
        sessionStorage.setItem("demoBidFilled", "true");
        setFormData((prev) => {
          if (prev.clientName) return prev;
          return {
            ...prev,
            projectName: "Demo Project",
            projectType: "Structural project",
            clientName: currentUser.name,
            address: prev.address || currentUser.city || "hubli",
            bidDate: new Date().toISOString().split("T")[0],
          };
        });
      }
    }
  }, [currentUser, loading, isDemoRoute, navigate]);

  useEffect(() => {
    const fetchLimit = async () => {
      try {
        const res = await fetch("/api/v1/auth/demo-limit");
        if (res.ok) {
          const data = await res.json();
          setDemoLimit(data.demoLimit || 5);
          if (data.ipBlocked) {
            setBackendBlocked(true);
            setBackendBlockedMsg("We noticed this system IP address has already used the trial version limit. Please purchase the application for the best use case.");
          }
          if (data.ipCount > 0) {
            const currentLocalCount = parseInt(localStorage.getItem("demoEstimationsCount") || "0", 10);
            const highestCount = Math.max(data.ipCount, currentLocalCount);
            localStorage.setItem("demoEstimationsCount", highestCount.toString());
            setDemoUsageCount(highestCount);
          }
        }
      } catch (err) {
        console.error("Failed to fetch demo limit:", err);
      }
    };
    fetchLimit();
  }, []);

  const [formData, setFormData] = useState(() => {
    const saved = sessionStorage.getItem("demoBidFormData");
    if (saved && location.pathname === "/demo-user") {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      estimationNumber: "",
      bidDocReceivedDate: "",
      bidDate: "",
      clientName: "",
      address: "",
      projectManager: "",
      contactDetails: "",
      projectName: "",
      projectAddress: "",
      projectRate: 40,
      projectType: "",
      memberQuantity: "",
    };
  });

  const [bidFormData, setBidFormData] = useState({
    name: localStorage.getItem("demoUserName") || "",
    email: localStorage.getItem("demoUserEmail") || "",
    mobile: localStorage.getItem("demoUserMobile") || "",
    projectType: "Structural project",
  });

  const handleBidChange = (e) => {
    setBidFormData({ ...bidFormData, [e.target.name]: e.target.value });
  };

  const handleCancelBid = () => {
    setIsBidModalOpen(false);
    sessionStorage.removeItem("demoBidFilled");
    sessionStorage.removeItem("demoBidFormData");
    navigate("/");
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  const handleNewBid = () => {
    sessionStorage.removeItem("demoBidFilled");
    sessionStorage.removeItem("demoBidFormData");
    window.location.reload();
  };

  const handleCreateBid = async (e) => {
    e.preventDefault();
    if (!bidFormData.name || !bidFormData.email || !bidFormData.mobile) {
      setRegErrorMsg("Please fill in all fields.");
      return;
    }

    setSubmittingDemoReg(true);
    setRegErrorMsg("");
    try {
      const res = await fetch("/api/v1/auth/check-demo-usage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: bidFormData.name,
          email: bidFormData.email,
          mobile: bidFormData.mobile
        })
      });

      const data = await res.json();
      if (!res.ok || data.blocked) {
        setBackendBlocked(true);
        setBackendBlockedMsg(data.msg || "You have exceeded the trial limit. Please purchase the application for the best use case.");
        if (data.count !== undefined) {
          localStorage.setItem("demoEstimationsCount", data.count.toString());
          setDemoUsageCount(data.count);
        }
        setIsBidModalOpen(false);
        setSubmittingDemoReg(false);
        return;
      }

      localStorage.setItem("demoUserName", bidFormData.name);
      localStorage.setItem("demoUserEmail", bidFormData.email);
      localStorage.setItem("demoUserMobile", bidFormData.mobile);
      if (data.count !== undefined) {
        localStorage.setItem("demoEstimationsCount", data.count.toString());
        setDemoUsageCount(data.count);
      }

      setIsBidModalOpen(false);
      sessionStorage.setItem("demoBidFilled", "true");

      setFormData((prev) => {
        const updated = {
          ...prev,
          projectName: "Demo Project",
          projectType: bidFormData.projectType,
          clientName: bidFormData.name || "fox lab",
          address: prev.address || "hubli",
          bidDate: new Date().toISOString().split("T")[0],
        };
        sessionStorage.setItem("demoBidFormData", JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.error(err);
      setRegErrorMsg("An error occurred during verification. Please try again.");
    } finally {
      setSubmittingDemoReg(false);
    }
  };

  useEffect(() => {
    const autoGenNumber =
      "SDLLCE-" + Math.floor(100000 + Math.random() * 900000);
    
    if (!isDemoRoute) {
      const clientData = location.state?.client || null;
      const bidDetails = location.state?.bidDetails || null;

      setFormData((prev) => ({ 
        ...prev, 
        estimationNumber: autoGenNumber,
        projectName: bidDetails?.projectName || prev.projectName,
        projectType: bidDetails?.projectType || prev.projectType,
        memberQuantity: bidDetails?.memberQuantity || prev.memberQuantity,
        bidDate: bidDetails?.date || prev.bidDate,
        clientName: clientData?.companyName || "",
        address: clientData?.location || "",
      }));
    } else {
      setFormData((prev) => {
        if (prev.estimationNumber) return prev;
        const updated = {
          ...prev,
          estimationNumber: autoGenNumber,
        };
        if (sessionStorage.getItem("demoBidFilled")) {
          sessionStorage.setItem("demoBidFormData", JSON.stringify(updated));
        }
        return updated;
      });
    }
  }, [location.state, isDemoRoute]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (isDemoRoute) {
        sessionStorage.setItem("demoBidFormData", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleSaveEstimation = (totals) => {
    const newEstimation = {
      id: formData.estimationNumber,
      companyName: formData.clientName || "N/A",
      location: formData.address || "N/A",
      project: formData.projectName || "Unnamed Project",
      projectType: formData.projectType,
      memberQuantity: formData.memberQuantity,
      receivedDate: formData.bidDocReceivedDate,
      bidDate: formData.bidDate,
      date: formData.bidDate || new Date().toISOString().split("T")[0],
      hours: parseFloat(totals.hours),
      price: parseFloat(totals.price),
      status: "Draft",
      steps: totals.steps,
    };

    if (isDemoRoute) {
      const currentCount = parseInt(localStorage.getItem("demoEstimationsCount") || "0", 10);
      const newCount = currentCount + 1;
      localStorage.setItem("demoEstimationsCount", newCount.toString());
      setDemoUsageCount(newCount);
    }

    addEstimation(newEstimation);

    navigate("/dashboard/estimations/totalsheet", {
      state: {
        estimation: newEstimation,
        formData,
        clientData: {
          companyName: formData.clientName,
          location: formData.address,
        },
        steps: totals.steps,
      },
    });
  };

  const handleSubmitDemo = async () => {
    if (!currentUser) return false;
    try {
      const res = await fetch("/api/v1/auth/check-demo-usage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: currentUser.name,
          email: currentUser.email,
          mobile: currentUser.phoneNumber || "0000000000"
        })
      });

      const data = await res.json();
      if (!res.ok || data.blocked) {
        setBackendBlocked(true);
        setBackendBlockedMsg(data.msg || "You have exceeded the trial limit. Please purchase the application for the best use case.");
        if (data.count !== undefined) {
          localStorage.setItem("demoEstimationsCount", data.count.toString());
          setDemoUsageCount(data.count);
        }
        return false;
      }

      if (data.count !== undefined) {
        localStorage.setItem("demoEstimationsCount", data.count.toString());
        setDemoUsageCount(data.count);
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "var(--background)", color: "var(--grey-800)" }}>
        <h3 style={{ fontFamily: "Roboto, sans-serif", fontWeight: "700" }}>Checking authorization...</h3>
      </div>
    );
  }

  if (isDemoRoute && !currentUser) {
    return null;
  }

  const isRegisteredDemoBlocked = !isDemoRoute && currentUser && currentUser.userType === "demo" && estimations.length >= demoLimit;

  if ((isDemoRoute && (demoUsageCount >= demoLimit || backendBlocked)) || isRegisteredDemoBlocked) {
    const usageCount = isDemoRoute ? demoUsageCount : estimations.length;
    return (
      <ModalBackground>
        <div className="modal-card" style={{ maxWidth: "550px", textAlign: "center", padding: "3rem 2rem" }}>
          <div style={{
            width: "72px",
            height: "72px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "2px solid #ef4444",
            color: "#ef4444",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            fontSize: "2.2rem",
            margin: "0 auto 1.5rem"
          }}>
            <FaLock />
          </div>
          <h3 style={{ fontSize: "1.6rem", fontWeight: "800", color: "var(--grey-900)", marginBottom: "1rem" }}>
            Demo Limit Reached
          </h3>
          <p style={{ color: "var(--grey-600)", lineHeight: "1.6", marginBottom: "2rem", fontSize: "0.95rem" }}>
            {backendBlockedMsg || `You have calculated estimations ${usageCount} times, which is the maximum limit set for the trial version (${demoLimit} times). To calculate unlimited quotes and manage projects, please activate a premium plan.`}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <button 
              type="button" 
              className="btn main-btn" 
              onClick={() => navigate("/pricing")}
              style={{ width: "100%", padding: "0.85rem", fontWeight: "700" }}
            >
              View Pricing & Plans
            </button>
            {isDemoRoute ? (
              <button 
                type="button" 
                className="btn outline-btn" 
                onClick={() => navigate("/")}
                style={{ width: "100%", padding: "0.85rem", fontWeight: "700" }}
              >
                Go to Home Page
              </button>
            ) : (
              <button 
                type="button" 
                className="btn outline-btn" 
                onClick={() => navigate("/dashboard")}
                style={{ width: "100%", padding: "0.85rem", fontWeight: "700" }}
              >
                Back to Dashboard
              </button>
            )}
          </div>
        </div>
      </ModalBackground>
    );
  }

  if (isBidModalOpen) {
    return (
      <ModalBackground>
        <div className="modal-card" style={{ maxWidth: "550px" }}>
          <div className="modal-header">
            <div>
              <h3>Demo Mode Registration</h3>
              <p>Please enter your contact details to start the trial estimation calculator</p>
            </div>
            <button
              type="button"
              className="close-btn"
              onClick={handleCancelBid}
            >
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleCreateBid}>
            <div className="modal-body" style={{ padding: "1.5rem 2rem" }}>
              {regErrorMsg && (
                <div style={{
                  color: "#ef4444",
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  marginBottom: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <FaExclamationCircle />
                  <span>{regErrorMsg}</span>
                </div>
              )}
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={bidFormData.name}
                    onChange={handleBidChange}
                    placeholder="Enter your full name..."
                    required
                    disabled={submittingDemoReg}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={bidFormData.email}
                    onChange={handleBidChange}
                    placeholder="e.g. name@company.com"
                    required
                    disabled={submittingDemoReg}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobile">Mobile Number</label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={bidFormData.mobile}
                    onChange={handleBidChange}
                    placeholder="e.g. +1 (555) 000-0000"
                    required
                    disabled={submittingDemoReg}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Project Type</label>
                  <div className="type-selection">
                    <label
                      className={`type-option ${bidFormData.projectType === "Structural project" ? "active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="projectType"
                        value="Structural project"
                        checked={
                          bidFormData.projectType === "Structural project"
                        }
                        onChange={handleBidChange}
                        disabled={submittingDemoReg}
                      />
                      <div className="option-content">
                        <BsBuildings />
                        <span>Structural project</span>
                      </div>
                    </label>
                    <label
                      className={`type-option ${bidFormData.projectType === "Miscellaneous project" ? "active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="projectType"
                        value="Miscellaneous project"
                        checked={
                          bidFormData.projectType === "Miscellaneous project"
                        }
                        onChange={handleBidChange}
                        disabled={submittingDemoReg}
                      />
                      <div className="option-content">
                        <GrSteps />
                        <span>Miscellaneous project</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer" style={{ padding: "1rem 2rem" }}>
              <button
                type="button"
                className="btn outline-btn"
                onClick={handleCancelBid}
                disabled={submittingDemoReg}
              >
                Cancel
              </button>
              <button type="submit" className="btn main-btn" disabled={submittingDemoReg}>
                {submittingDemoReg ? "Verifying..." : "Continue to Calculator"}
              </button>
            </div>
          </form>
        </div>
      </ModalBackground>
    );
  }

  return (
    <Wrapper>
      <div className="header no-print">
        <div className="header-top">
          {!isDemoRoute && (
            <button className="back-btn" onClick={() => navigate(-1)}>
              <FaArrowLeft /> Back to Repository
            </button>
          )}
          {isDemoRoute && (
            <div style={{ display: "flex", gap: "1rem", marginLeft: "auto" }}>
              <button 
                type="button" 
                className="logout-btn" 
                onClick={handleNewBid}
                style={{ 
                  borderColor: "var(--cat-green-text)", 
                  color: "var(--cat-green-text)", 
                  background: "var(--cat-green)", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.5rem" 
                }}
              >
                <FaPlus /> New Bid
              </button>
              <button 
                type="button" 
                className="logout-btn" 
                onClick={() => navigate("/pricing")}
                style={{ 
                  borderColor: "var(--primary-500)", 
                  color: "var(--primary-600)", 
                  background: "var(--primary-50)", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.5rem" 
                }}
              >
                <FaDollarSign /> Pricing Plans
              </button>
              <button type="button" className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
        <div className="header-info">
          <div>
            <h3>Estimation Workflow</h3>
            <p className="subtitle">Set up project parameters and calculate engineering hours.</p>
          </div>
          {isDemoRoute && (
            <div className="demo-badge">
              <span className="dot"></span>
              Demo Usage: <strong>{demoUsageCount}</strong> / {demoLimit} calculations
            </div>
          )}
        </div>
      </div>

      {!isDemoRoute && (
        <div className="setup-container">
          <div className="setup-card">
            <div className="card-header">
              <FaClipboardList />
              <h4>Bid & Project Details</h4>
            </div>
            <div className="card-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Estimation Number</label>
                  <input
                    type="text"
                    name="estimationNumber"
                    value={formData.estimationNumber}
                    readOnly
                    className="readonly"
                  />
                </div>
                <div className="form-group">
                  <label>Project Name</label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    placeholder="Enter project name..."
                  />
                </div>
                <div className="form-group">
                  <label>Bid Doc Received Date</label>
                  <div className="date-input">
                    <input
                      type="date"
                      name="bidDocReceivedDate"
                      value={formData.bidDocReceivedDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Bid Submission Date</label>
                  <div className="date-input">
                    <input
                      type="date"
                      name="bidDate"
                      value={formData.bidDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="setup-card">
            <div className="card-header">
              <FaUserTie />
              <h4>Client & Management</h4>
            </div>
            <div className="card-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Client Name</label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    placeholder="Company Name"
                  />
                </div>
                <div className="form-group">
                  <label>Project Manager</label>
                  <input
                    type="text"
                    name="projectManager"
                    value={formData.projectManager}
                    onChange={handleChange}
                    placeholder="Manager Name"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Project Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Full physical address"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <EstimationCalculator
        projectRate={formData.projectRate}
        estimationNumber={formData.estimationNumber}
        projectName={formData.projectName}
        projectType={formData.projectType}
        onSave={handleSaveEstimation}
        isDemo={isDemoRoute}
        onSubmitDemo={handleSubmitDemo}
      />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  font-family: "Roboto", sans-serif;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background: var(--background);
  min-height: 100vh;

  input, select, textarea, button {
    font-family: "Roboto", sans-serif;
  }

  .header {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    .header-top {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .back-btn {
      background: transparent;
      border: none;
      color: var(--grey-600);
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: fit-content;
      &:hover { color: var(--primary-600); }
    }

    .logout-btn {
      background: transparent;
      border: 1px solid var(--grey-300);
      color: var(--grey-600);
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      width: fit-content;
      margin-left: auto;
      transition: all 0.3s ease;
      &:hover {
        background: #ef4444;
        color: white;
        border-color: #ef4444;
      }
    }
    .header-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .demo-badge {
      background: rgba(59, 130, 246, 0.08);
      border: 1px solid rgba(59, 130, 246, 0.2);
      color: var(--primary-600);
      padding: 0.6rem 1.2rem;
      border-radius: 50px;
      font-weight: 600;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.05);

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--primary-500);
        display: inline-block;
        box-shadow: 0 0 8px var(--primary-500);
      }
    }
    
    h3 { font-size: 1.8rem; color: var(--grey-900); margin: 0; font-weight: 800; }
    .subtitle { color: var(--grey-500); font-size: 0.95rem; }
  }

  .setup-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 1100px) {
    .setup-container { grid-template-columns: 1fr; }
  }

  .setup-card {
    background: var(--white);
    border-radius: 16px;
    border: 1px solid var(--grey-200);
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    overflow: hidden;
    
    .card-header {
      padding: 1.25rem 1.5rem;
      background: var(--grey-50);
      border-bottom: 1px solid var(--grey-100);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--primary-600);
      h4 { margin: 0; font-size: 1rem; color: var(--grey-800); font-weight: 700; }
    }
    
    .card-body { padding: 1.5rem; }
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    
    .full-width { grid-column: 1 / -1; }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    label { font-size: 0.75rem; font-weight: 700; color: var(--grey-500); text-transform: uppercase; letter-spacing: 0.5px; }
    
    input, select {
      padding: 0.75rem 1rem;
      border-radius: 10px;
      border: 1px solid var(--grey-200);
      background: var(--grey-50);
      font-size: 0.95rem;
      color: var(--grey-900);
      &:focus { outline: none; border-color: var(--primary-500); background: var(--white); box-shadow: 0 0 0 4px var(--primary-50); }
      &.readonly { background: var(--grey-100); cursor: not-allowed; }
    }
  }

  .date-input {
    display: flex;
    align-items: center;
    input { 
      width: 100%; 
      &::-webkit-calendar-picker-indicator {
        display: none;
        -webkit-appearance: none;
      }
    }
  }

  body.dark-theme & {
    .setup-card { background: #0f172a; border-color: #1e293b; }
    .card-header { 
      background: #1e293b; 
      color: #ffffff !important;
      h4 { color: #ffffff !important; }
      svg { color: #ffffff !important; }
    }
    .form-group input, .form-group select { background: #020617; border-color: #334155; color: #f8fafc; }
    .form-group label { color: #94a3b8; }
    
    h3 { color: white; }
    .subtitle { color: #94a3b8; }
    .demo-badge {
      background: rgba(59, 130, 246, 0.15);
      border-color: rgba(59, 130, 246, 0.3);
      color: #60a5fa;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    .back-btn { color: #ffffff; &:hover { color: var(--primary-400); } }
    .logout-btn {
      color: #f8fafc;
      border-color: #334155;
      &:hover {
        background: #ef4444;
        color: white;
        border-color: #ef4444;
      }
    }
  }
`;

const ModalBackground = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #030712;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  font-family: "Roboto", sans-serif;

  input, select, textarea, button {
    font-family: "Roboto", sans-serif;
  }

  &::before, &::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.15;
    z-index: 1;
    pointer-events: none;
  }

  &::before {
    background: var(--primary-500, #3b82f6);
    top: -100px;
    left: -100px;
  }

  &::after {
    background: #8b5cf6;
    bottom: -100px;
    right: -100px;
  }

  .modal-card {
    position: relative;
    z-index: 10;
    background: var(--white, #ffffff);
    width: 90%;
    max-width: 650px;
    border-radius: 16px;
    border: 1px solid var(--grey-100, #e2e8f0);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    animation: modalZoomIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes modalZoomIn {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--grey-100, #e2e8f0);
    background: var(--grey-50, #f8fafc);

    h3 {
      font-size: 1.4rem;
      color: var(--grey-900, #0f172a);
      margin: 0;
      font-weight: 700;
    }

    p {
      color: var(--grey-600, #475569);
      font-size: 0.9rem;
      margin-top: 0.25rem;
      margin-bottom: 0;
    }

    .close-btn {
      background: transparent;
      border: none;
      font-size: 1.2rem;
      color: var(--grey-500, #64748b);
      cursor: pointer;
      transition: all 0.2s;
      display: grid;
      place-items: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      &:hover {
        color: var(--grey-900, #0f172a);
        background: var(--grey-200, #e2e8f0);
      }
    }
  }

  .modal-body {
    padding: 2rem;
    max-height: 70vh;
    overflow-y: auto;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &.full-width {
      grid-column: 1 / -1;
    }
  }

  label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--grey-700, #334155);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  input,
  select,
  textarea {
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid var(--grey-200, #cbd5e1);
    background: var(--grey-50, #f8fafc);
    color: var(--grey-900, #0f172a);
    font-family: inherit;
    font-size: 0.95rem;
    transition: all 0.2s;
    outline: none;

    &:focus {
      border-color: var(--primary-500, #3b82f6);
      background: var(--white, #ffffff);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }
  }

  .modal-footer {
    padding: 1.25rem 2rem;
    border-top: 1px solid var(--grey-100, #e2e8f0);
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    background: var(--grey-50, #f8fafc);

    .btn {
      padding: 0.6rem 1.5rem;
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.2s;
      cursor: pointer;
      border: 1px solid transparent;
    }

    .outline-btn {
      background: transparent;
      border-color: var(--grey-300, #cbd5e1);
      color: var(--grey-700, #334155);
      &:hover {
        background: var(--grey-50, #f8fafc);
        border-color: var(--grey-400, #94a3b8);
      }
    }

    .main-btn {
      background: var(--primary-600, #2563eb);
      color: #ffffff;
      &:hover {
        background: var(--primary-700, #1d4ed8);
      }
    }
  }

  .type-selection {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 0.25rem;
  }

  .type-option {
    cursor: pointer;
    position: relative;

    input {
      position: absolute;
      opacity: 0;
    }

    .option-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      padding: 1.5rem;
      border: 2px solid var(--grey-200, #e2e8f0);
      border-radius: 10px;
      transition: all 0.3s;
      background: var(--white, #ffffff);

      svg {
        font-size: 1.5rem;
        color: var(--grey-400, #94a3b8);
      }

      span {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--grey-600, #475569);
        text-align: center;
      }
    }

    &:hover .option-content {
      border-color: var(--primary-300, #93c5fd);
      background: var(--primary-50, #eff6ff);
    }

    &.active .option-content {
      border-color: var(--primary-600, #2563eb);
      background: var(--primary-600, #2563eb);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);

      svg {
        color: #ffffff;
      }

      span {
        color: #ffffff;
      }
    }
  }

  .auto-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: var(--grey-100, #f1f5f9);
    border-radius: 8px;
    color: var(--grey-600, #475569);
    font-weight: 500;
    font-size: 0.9rem;

    .dot {
      color: var(--grey-400, #94a3b8);
    }
  }

  /* Support dark-theme variables or styles */
  body.dark-theme & {
    background: #020617;

    .modal-card {
      background: #0f172a;
      border: 1px solid #1e293b;
    }
    .modal-header {
      background: #1e293b;
      border-bottom: 1px solid #334155;
      h3 { color: #f8fafc; }
      p { color: #94a3b8; }
      .close-btn:hover { background: #334155; color: #f8fafc; }
    }
    .modal-body {
      background: #0f172a;
    }
    .modal-footer {
      background: #1e293b;
      border-top: 1px solid #334155;
      
      .outline-btn {
        border-color: #334155;
        color: #f8fafc;
        &:hover {
          background: #1e293b;
          border-color: #475569;
        }
      }
    }
    label {
      color: #94a3b8;
    }
    input, select, textarea {
      background: #020617;
      border-color: #334155;
      color: #f8fafc;
      &:focus {
        border-color: var(--primary-500, #3b82f6);
      }
    }
    .type-option .option-content {
      background: #020617;
      border-color: #334155;
      span { color: #94a3b8; }
      svg { color: #475569; }
    }
    .type-option:hover .option-content {
      border-color: var(--primary-600, #2563eb);
      background: rgba(30, 41, 59, 0.5);
    }
    .type-option.active .option-content {
      background: var(--primary-600, #2563eb);
      border-color: var(--primary-600, #2563eb);
      span { color: #ffffff; }
      svg { color: #ffffff; }
    }
    .auto-info {
      background: #1e293b;
      color: #94a3b8;
      .dot { color: #475569; }
    }
  }
`;

export default CreateClient;
