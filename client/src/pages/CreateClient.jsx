import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import EstimationCalculator from "../components/EstimationCalculator";
import { EstimationContext } from "../context/EstimationContext";
import { FaArrowLeft, FaCalendarAlt, FaClipboardList, FaProjectDiagram, FaUserTie } from "react-icons/fa";

const CreateClient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const clientData = location.state?.client || null;

  const [formData, setFormData] = useState({
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
  });

  const { addEstimation } = useContext(EstimationContext);

  useEffect(() => {
    const autoGenNumber =
      "SDLLCE-" + Math.floor(100000 + Math.random() * 900000);
    
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
  }, [location.state, clientData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  return (
    <Wrapper>
      <div className="header no-print">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back to Repository
        </button>
        <div className="header-info">
          <h3>Estimation Workflow</h3>
          <p className="subtitle">Set up project parameters and calculate engineering hours.</p>
        </div>
      </div>

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

      <EstimationCalculator
        projectRate={formData.projectRate}
        estimationNumber={formData.estimationNumber}
        projectName={formData.projectName}
        projectType={formData.projectType}
        onSave={handleSaveEstimation}
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
      /* Hide native calendar icon for a cleaner look */
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
    .back-btn { color: #ffffff; &:hover { color: var(--primary-400); } }
  }
`;

export default CreateClient;
