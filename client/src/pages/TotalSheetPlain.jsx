import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";
import EstimationPDF from "../components/EstimationPDF";
import { EstimationContext } from "../context/EstimationContext";
import { FaProjectDiagram, FaCalendarAlt, FaBuilding, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileAlt, FaCalculator, FaSave, FaArrowLeft, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const TotalSheetPlain = () => {
  useEffect(() => {
    console.log("TotalSheetPlain Component Loaded - Version: 2.0");
  }, []);
  const location = useLocation();
  const navigate = useNavigate();

  const { estimations, updateEstimation } = useContext(EstimationContext);

  const { estimation, formData, clientData, steps, readOnly = false } = location.state || {};
  
  // Helper to ensure date is in YYYY-MM-DD format for input type="date"
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    if (dateStr.includes("/")) {
      const parts = dateStr.split("/");
      if (parts.length === 3) {
        // Assume DD/MM/YYYY or MM/DD/YYYY - let's try to be smart or just use a standard ISO conversion
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) {
          return d.toISOString().split("T")[0];
        }
      }
    }
    return dateStr;
  };

  const [estimationData, setEstimationData] = useState({
    ...estimation,
    receivedDate: formatDateForInput(estimation?.receivedDate || formData?.bidDocReceivedDate || ""),
    bidDate: formatDateForInput(estimation?.bidDate || formData?.bidDate || ""),
  });
  const [localFormData, setLocalFormData] = useState(formData || {});
  const [localClientData, setLocalClientData] = useState({
    companyName: clientData?.companyName || estimation?.companyName || "",
    location: clientData?.location || estimation?.location || "",
  });
  const [localSteps, setLocalSteps] = useState(steps || estimation?.steps || []);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  useEffect(() => {
    if (!estimation && estimations.length > 0) {
      const latest = estimations[0];
      setEstimationData(latest);
      setLocalClientData({
        companyName: latest.companyName,
        location: latest.location,
      });
    }
  }, [estimation, estimations]);

  // Sync grand totals whenever steps change
  useEffect(() => {
    const totalHours = localSteps.reduce((sum, s) => sum + (parseFloat(s.hours) || 0), 0);
    const totalPrice = localSteps.reduce((sum, s) => sum + (parseFloat(s.price) || 0), 0);
    
    setEstimationData(prev => ({
      ...prev,
      hours: totalHours.toFixed(2),
      price: totalPrice.toFixed(2)
    }));
  }, [localSteps]);

  const handleEstimationChange = (field, value) => {
    setEstimationData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormChange = (field, value) => {
    setLocalFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClientChange = (field, value) => {
    setLocalClientData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStepChange = (index, field, value) => {
    const newSteps = [...localSteps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setLocalSteps(newSteps);
  };
  const addNewStep = () => {
    setLocalSteps([...localSteps, { stepName: "", hours: 0, price: 0 }]);
  };

  const removeStep = (index) => {
    const newSteps = localSteps.filter((_, i) => i !== index);
    setLocalSteps(newSteps);
  };

  const handleSaveToRepository = async () => {
    if (estimationData.id) {
      const finalData = {
        ...estimationData,
        companyName: localClientData.companyName,
        location: localClientData.location,
        steps: localSteps,
        // Ensure values are numbers for consistent data
        hours: Number(estimationData.hours || 0),
        price: Number(estimationData.price || 0),
      };
      
      if (!readOnly) {
        updateEstimation(estimationData.id, finalData);
      }
      
      try {
        const blob = await pdf(<EstimationPDF data={finalData} />).toBlob();
        const url = URL.createObjectURL(blob);
        
        // Create a temporary link element to trigger a direct download
        const link = document.createElement("a");
        link.href = url;
        link.download = `${finalData.id || "Quotation"}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up resource
        URL.revokeObjectURL(url);
        
        // Navigate back to estimations dashboard root
        navigate("/dashboard/estimations");
      } catch (error) {
        console.error("PDF Generation Error:", error);
        triggerToast("Failed to generate PDF. Please check the console.", "error");
      }
    }
  };

  return (
    <Wrapper>
      <div className="header no-print">
        <div>
          <div className={`badge ${readOnly ? "read-only" : ""}`}>
            {readOnly ? "Repository View Mode" : "Final Summary"}
          </div>
          <h3>Final Summary</h3>
          <p className="subtitle">
            {readOnly 
              ? "View-only submittal project details, itemizations, and bid terms." 
              : "Refine and finalize your project estimation details before document generation."}
          </p>
        </div>
        <div className="actions">
          <button
            className="btn back-btn"
            onClick={() => navigate(readOnly ? "/dashboard/invoices" : "/dashboard/estimations")}
          >
            <FaArrowLeft /> {readOnly ? "Bid Repository" : "Repository"}
          </button>
          <button className="btn save-btn" onClick={handleSaveToRepository}>
            <FaSave /> {readOnly ? "Export PDF" : "Save & Generate PDF"}
          </button>
        </div>
      </div>

      <div className="content-grid">
        {/* Left Column: Project & Client Details */}
        <div className="left-column">
          <section className="card">
            <div className="card-header">
              <FaProjectDiagram />
              <h4>Project Identity</h4>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Estimation Number</label>
                <input
                  type="text"
                  value={estimationData.id || ""}
                  onChange={(e) => handleEstimationChange("id", e.target.value)}
                  placeholder="SDLLCE-XXXXXX"
                />
              </div>
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  value={estimationData.project || ""}
                  onChange={(e) => handleEstimationChange("project", e.target.value)}
                  placeholder="Enter Project Name"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Bid Doc Received Date</label>
                  <div className="date-input">
                    <input
                      type="date"
                      value={estimationData.receivedDate || ""}
                      onChange={(e) => handleEstimationChange("receivedDate", e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Bid Date</label>
                  <div className="date-input">
                    <input
                      type="date"
                      value={estimationData.bidDate || ""}
                      onChange={(e) => handleEstimationChange("bidDate", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="card">
            <div className="card-header">
              <FaBuilding />
              <h4>Client Information</h4>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Client / Company Name</label>
                <input
                  type="text"
                  value={localClientData.companyName || ""}
                  onChange={(e) => handleClientChange("companyName", e.target.value)}
                  placeholder="Enter Client Name"
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  rows="2"
                  value={localClientData.location || ""}
                  onChange={(e) => handleClientChange("location", e.target.value)}
                  placeholder="Full physical address"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Contact Person</label>
                  <input type="text" placeholder="Manager Name" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" placeholder="+1 XXX-XXX-XXXX" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Estimation Steps & Totals */}
        <div className="right-column">
          <section className="card full-height">
            <div className="card-header space-between">
              <div className="header-title">
                <FaCalculator />
                <h4>Estimation Calculator</h4>
              </div>
              <div className="total-badge">
                <span className="label">Total Price:</span>
                <span className="value">${Number(estimationData.price || 0).toFixed(2)}</span>
              </div>
            </div>
            <div className="card-body">
              <div className="table-wrapper">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th style={{ width: "50%" }}>Detail Description / Step</th>
                      <th style={{ width: "25%" }}>Total Hours</th>
                      <th style={{ width: "25%" }}>Price ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {localSteps.map((step, index) => (
                      <tr key={index}>
                        <td className="step-name-cell">
                          <input
                            type="text"
                            className="table-input"
                            value={step.stepName}
                            onChange={(e) => handleStepChange(index, "stepName", e.target.value)}
                            placeholder="Step name..."
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="table-input center"
                            value={Number(step.hours || 0).toFixed(2)}
                            onChange={(e) => handleStepChange(index, "hours", e.target.value)}
                          />
                        </td>
                        <td className="price-cell">
                          <input
                            type="number"
                            className="table-input right bold"
                            value={Number(step.price || 0).toFixed(2)}
                            onChange={(e) => handleStepChange(index, "price", e.target.value)}
                          />
                          <button 
                            className="row-delete-btn" 
                            onClick={() => removeStep(index)}
                            title="Remove Step"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                    {/* Add few empty rows if less than 8 steps to maintain layout */}
                    {localSteps.length < 8 && Array.from({ length: 8 - localSteps.length }).map((_, i) => (
                      <tr key={`empty-${i}`}>
                        <td><input type="text" className="table-input" placeholder="..." /></td>
                        <td><input type="text" className="table-input" /></td>
                        <td><input type="text" className="table-input" /></td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="total-label">Project Totals</td>
                      <td className="total-value center">{Number(estimationData.hours || 0).toFixed(2)} hrs</td>
                      <td className="total-value right">${Number(estimationData.price || 0).toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="bottom-sections">
         <section className="card">
            <div className="card-header">
               <FaFileAlt />
               <h4>Terms, Inclusions & Remarks</h4>
            </div>
            <div className="card-body">
               <div className="terms-grid">
                  <div className="form-group">
                    <label>Exclusions</label>
                    <textarea 
                      rows="3" 
                      value={estimationData.exclusions || ""}
                      onChange={(e) => handleEstimationChange("exclusions", e.target.value)}
                      placeholder="List all exclusions..." 
                    />
                  </div>
                  <div className="form-group">
                    <label>Inclusions</label>
                    <textarea 
                      rows="3" 
                      value={estimationData.inclusions || ""}
                      onChange={(e) => handleEstimationChange("inclusions", e.target.value)}
                      placeholder="List all inclusions..." 
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Internal Remarks</label>
                    <textarea 
                      rows="2" 
                      value={estimationData.remarks || ""}
                      onChange={(e) => handleEstimationChange("remarks", e.target.value)}
                      placeholder="Add any internal project notes..." 
                    />
                  </div>
               </div>
            </div>
         </section>
      </div>
      {toast.show && (
        <ToastContainer className={toast.type}>
          <div className="toast-icon">
            {toast.type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
          </div>
          <div className="toast-message">{toast.message}</div>
        </ToastContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background: var(--background);
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;

  input, select, textarea, button {
    font-family: 'Roboto', sans-serif;
  }

  .header {
    position: sticky;
    top: 79px;
    z-index: 40;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0;
    margin-bottom: 2rem;
    background: var(--background);
    border-bottom: 1px solid var(--grey-200);
    backdrop-filter: blur(8px);
    
    h3 {
      font-size: 1.8rem;
      color: var(--grey-900);
      margin: 0;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .subtitle {
      color: var(--grey-500);
      margin-top: 0.4rem;
      font-size: 0.95rem;
    }
    .badge {
      background: var(--primary-100);
      color: var(--primary-700);
      padding: 0.3rem 0.8rem;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      width: fit-content;
      margin-bottom: 0.5rem;
    }
  }

  .actions {
    display: flex;
    gap: 1rem;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 550px 1fr;
    gap: 2.5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 1100px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
  }

  .card {
    background: var(--white);
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--grey-200);
    overflow: hidden;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    }
  }

  .card-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--primary-600);
    background: var(--grey-50);
    
    svg { font-size: 1.1rem; }
    h4 { margin: 0; font-size: 1rem; color: var(--grey-800); font-weight: 700; }

    &.space-between {
      justify-content: space-between;
    }

    .header-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
  }

  .card-body {
    padding: 1.5rem;
    flex-grow: 1;
  }

  .form-group {
    margin-bottom: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--grey-600);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    input, textarea {
      padding: 0.85rem 1.25rem;
      border-radius: 10px;
      border: 1px solid var(--grey-200);
      background: var(--grey-50);
      font-size: 1rem;
      color: var(--grey-900);
      transition: all 0.2s ease;
      font-family: inherit;

      &:focus {
        outline: none;
        border-color: var(--primary-500);
        background: var(--white);
        box-shadow: 0 0 0 4px var(--primary-50);
      }
      
      &::placeholder {
        color: var(--grey-400);
      }
    }
    
    textarea {
      resize: vertical;
    }
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
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

  .add-row-btn {
    width: 100%;
    margin-top: 1rem;
    padding: 0.75rem;
    background: var(--white);
    border: 2px dashed var(--grey-300);
    border-radius: 12px;
    color: var(--grey-500);
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background: var(--primary-50);
      border-color: var(--primary-300);
      color: var(--primary-600);
    }
  }

  .price-cell {
    position: relative;
    display: flex;
    align-items: center;
  }

  .row-delete-btn {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    background: #fee2e2;
    color: #ef4444;
    border: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 14px;
    cursor: pointer;
    opacity: 0;
    transition: all 0.2s ease;
    
    &:hover { background: #ef4444; color: white; }
  }

  tr:hover .row-delete-btn {
    opacity: 1;
    right: 10px;
  }

  .total-badge {
    background: var(--primary-600);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    .label { font-size: 0.75rem; font-weight: 600; opacity: 0.9; }
    .value { font-size: 1.1rem; font-weight: 800; }
  }

  /* Modern Table Styling */
  .table-wrapper {
    background: var(--grey-50);
    border-radius: 12px;
    border: 1px solid var(--grey-200);
    overflow: hidden;
  }

  .modern-table {
    width: 100%;
    border-collapse: collapse;
    
    th {
      text-align: left;
      padding: 1rem;
      background: var(--grey-100);
      color: var(--grey-700);
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid var(--grey-200);
    }
    
    td {
      padding: 0;
      border-bottom: 1px solid var(--grey-200);
    }
    
    tr:last-child td {
      border-bottom: none;
    }
    
    .table-input {
      width: 100%;
      padding: 1rem;
      border: none;
      background: transparent;
      font-size: 0.95rem;
      color: var(--grey-800);
      font-family: inherit;
      transition: background 0.2s;
      
      &:focus {
        outline: none;
        background: var(--white);
      }
      
      &.center { text-align: center; }
      &.right { text-align: right; }
      &.bold { font-weight: 700; color: var(--primary-600); }
    }

    tfoot {
      background: #031838;
      color: white;
      
      body.dark-theme & {
        background: #1e293b;
      }
      
      td {
        padding: 1.25rem 1rem;
        border: none;
      }
      
      .total-label { font-weight: 800; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px; }
      .total-value { font-weight: 800; font-size: 1.2rem; }
      
      .total-value.right { color: var(--primary-300); }
    }
  }

  .terms-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    
    .full-width {
      grid-column: 1 / -1;
    }
  }

  /* Button System */
  .btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius);
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    border: 2px solid transparent;
    overflow: hidden;
    z-index: 1;

    &::before, &::after {
      content: ""; position: absolute; top: 0; width: 0; height: 100%;
      background: #ffffff; transition: all 0.4s cubic-bezier(0.77, 0, 0.175, 1); z-index: -1;
    }
    &::before { left: 50%; }
    &::after { right: 50%; }
    &:hover::before { left: 0; width: 51%; }
    &:hover::after { right: 0; width: 51%; }

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
    }
    
    svg { font-size: 1.1rem; }
  }

  .back-btn {
    background: var(--white);
    color: var(--grey-700);
    border-color: var(--grey-200);
    &:hover { color: var(--primary-600); border-color: var(--primary-600); }
  }

  .save-btn {
    background: #22c55e;
    color: #ffffff;
    border-color: #22c55e;
    &:hover { color: #22c55e; border-color: #22c55e; }
  }

  /* Dark Theme Overrides */
  body.dark-theme & {
    h3 { color: #ffffff !important; }
    .subtitle { color: #94a3b8; }
    .badge { background: #1e293b; color: #ffffff; border: 1px solid #334155; }
    
    .card { background: #0f172a; border-color: #1e293b; }
    .card-header { 
      background: #1e293b; 
      color: #ffffff; 
      h4 { color: #ffffff; }
      svg { color: #ffffff; } 
    }
    .form-group label { color: #94a3b8; }
    .form-group input, .form-group textarea, .form-row input { 
      background: #020617; 
      border-color: #334155; 
      color: #f8fafc; 
    }
    .form-group input::placeholder, .form-row input::placeholder {
      color: #64748b;
    }
    .table-wrapper { background: #020617; border-color: #334155; }
    .modern-table th { background: #1e293b; color: #94a3b8; border-bottom-color: #334155; }
    .modern-table td { border-bottom-color: #1e293b; }
    .modern-table .table-input { color: #f8fafc; &:focus { background: #1e293b; } }
    .table-input.bold, .modern-table .table-input.bold { color: #ffffff !important; }
    
    .total-badge {
      background: #1e293b;
      border-color: #334155;
      .label { color: #94a3b8; }
      .value { color: #ffffff; }
    }

    tfoot .total-value.right { color: #ffffff !important; }
    
    input[type="date"]::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 1rem 1.75rem;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 9999;
  animation: slideDownToast 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  max-width: 90vw;
  width: fit-content;

  &.success {
    border-top: 3px solid #10b981;
    .toast-icon {
      color: #10b981;
    }
  }

  &.error {
    border-top: 3px solid #ef4444;
    .toast-icon {
      color: #ef4444;
    }
  }

  .toast-icon {
    font-size: 1.35rem;
    display: grid;
    place-items: center;
  }

  .toast-message {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--grey-800);
    letter-spacing: -0.2px;
  }

  body.dark-theme & {
    background: rgba(15, 23, 42, 0.85);
    border-color: rgba(255, 255, 255, 0.08);
    .toast-message {
      color: #ffffff;
    }
  }

  @keyframes slideDownToast {
    from {
      opacity: 0;
      transform: translate(-50%, -20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`;

export default TotalSheetPlain;
