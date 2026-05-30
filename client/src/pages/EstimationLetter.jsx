import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  FaGlobe, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaArrowLeft, 
  FaPrint, 
  FaBuilding, 
  FaClipboardList, 
  FaPaperPlane, 
  FaPencilRuler, 
  FaImage, 
  FaDollarSign, 
  FaCalendarAlt, 
  FaSave,
  FaCheck
} from "react-icons/fa";
import logo from "../assets/images/logo1.png";
import { EstimationContext } from "../context/EstimationContext";

const EstimationLetter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateEstimation } = useContext(EstimationContext) || {};

  const initialEstimation = location.state?.estimation || {
    id: "SDLLCE-250021",
    companyName: "",
    location: "",
    project: "",
    date: "2026-05-26",
    hours: 0,
    price: 0,
    scopeSubmittals: [],
    drawingRequirements: [],
    sendingBys: [],
    projectManager: "",
    contactDetails: "",
    receivedDate: "",
    bidDate: "",
    scopeOfWork: "",
    inclusions: "",
    exclusions: "",
    remarks: ""
  };

  const [estimation, setEstimation] = useState(initialEstimation);
  const [editMode, setEditMode] = useState(true);

  const handleInfoChange = (field, value) => {
    setEstimation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxToggle = (field, item) => {
    setEstimation(prev => {
      const currentList = prev[field] || [];
      const newList = currentList.includes(item)
        ? currentList.filter(i => i !== item)
        : [...currentList, item];
      return { ...prev, [field]: newList };
    });
  };

  const handleSave = async () => {
    if (updateEstimation && estimation.id) {
      try {
        const finalData = {
          ...estimation,
          hours: Number(estimation.hours || 0),
          price: Number(estimation.price || 0),
        };
        await updateEstimation(estimation.id, finalData);
        alert("Quotation letter changes saved successfully!");
      } catch (error) {
        console.error("Save Error:", error);
        alert("Failed to save changes. Please try again.");
      }
    }
  };

  return (
    <Wrapper>
      {/* Action Toolbar */}
      <div className="no-print header-actions">
        <button className="btn back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <div className="title-area">
          <h3>Letter of Quotation Console</h3>
          <p>Format, review, and print corporate bid letters</p>
        </div>
        <div className="button-group">
          <button className={`btn mode-btn ${editMode ? "active" : ""}`} onClick={() => setEditMode(!editMode)}>
            {editMode ? "👁️ Preview Mode" : "✏️ Edit Mode"}
          </button>
          <button className="btn save-btn" onClick={handleSave}>
            <FaSave /> Save Changes
          </button>
          <button className="btn print-btn" onClick={() => window.print()}>
            <FaPrint /> Export PDF
          </button>
        </div>
      </div>

      {/* Main Document Layout Container */}
      <div className={`document-container ${editMode ? "edit-mode-active" : "preview-mode-active"}`}>
        
        {/* Document Header Section */}
        <div className="doc-header">
          <div className="branding">
            <div className="logo-box">
              <img src={logo} alt="Steel Dimension LLC" />
            </div>
            <div className="company-text">
              <h2>STEEL DIMENSION LLC</h2>
              <p className="tagline">Precision in Every Detail, Strength in Every Structure...!</p>
              <div className="contact-links">
                <span><FaGlobe className="icon" /> www.SteelDimension.com</span>
                <span><FaEnvelope className="icon" /> Estimation@SteelDimension.com</span>
                <span><FaPhoneAlt className="icon" /> +1 727-378-1270</span>
              </div>
            </div>
          </div>
          
          <div className="title-block">
            <h1 className="doc-title">Letter of Quotation</h1>
            <div className="title-line" />
          </div>
        </div>

        {/* Metadata Details Card */}
        <div className="meta-card">
          <div className="meta-grid">
            <div className="meta-item">
              <span className="label">Quotation Number</span>
              <span className="value highlight">{estimation.id}</span>
            </div>
            <div className="meta-item">
              <span className="label">Received Date</span>
              {editMode ? (
                <input 
                  type="date" 
                  className="clean-input" 
                  value={estimation.receivedDate || ""} 
                  onChange={(e) => handleInfoChange("receivedDate", e.target.value)} 
                />
              ) : (
                <span className="value">{estimation.receivedDate || "N/A"}</span>
              )}
            </div>
            <div className="meta-item">
              <span className="label">Job Name</span>
              {editMode ? (
                <input 
                  type="text" 
                  className="clean-input" 
                  value={estimation.project || ""} 
                  onChange={(e) => handleInfoChange("project", e.target.value)} 
                  placeholder="Enter Job Name" 
                />
              ) : (
                <span className="value">{estimation.project || "N/A"}</span>
              )}
            </div>
            <div className="meta-item">
              <span className="label">Bid Date</span>
              {editMode ? (
                <input 
                  type="date" 
                  className="clean-input" 
                  value={estimation.bidDate || ""} 
                  onChange={(e) => handleInfoChange("bidDate", e.target.value)} 
                />
              ) : (
                <span className="value">{estimation.bidDate || "N/A"}</span>
              )}
            </div>
          </div>
        </div>

        {/* Two Column Grid: Client Info & checklists */}
        <div className="grid-2-col">
          {/* Client Information */}
          <div className="content-card">
            <div className="card-header">
              <FaBuilding /> <h4>Client Details</h4>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Client / Company Name</label>
                {editMode ? (
                  <input 
                    type="text" 
                    className="clean-input" 
                    value={estimation.companyName || ""} 
                    onChange={(e) => handleInfoChange("companyName", e.target.value)} 
                    placeholder="Enter Client Name" 
                  />
                ) : (
                  <span className="read-value">{estimation.companyName || "N/A"}</span>
                )}
              </div>
              <div className="form-group">
                <label>Address</label>
                {editMode ? (
                  <input 
                    type="text" 
                    className="clean-input" 
                    value={estimation.location || ""} 
                    onChange={(e) => handleInfoChange("location", e.target.value)} 
                    placeholder="Physical Address" 
                  />
                ) : (
                  <span className="read-value">{estimation.location || "N/A"}</span>
                )}
              </div>
              <div className="form-group">
                <label>Project Manager</label>
                {editMode ? (
                  <input 
                    type="text" 
                    className="clean-input" 
                    value={estimation.projectManager || ""} 
                    onChange={(e) => handleInfoChange("projectManager", e.target.value)} 
                    placeholder="Manager Name" 
                  />
                ) : (
                  <span className="read-value">{estimation.projectManager || "N/A"}</span>
                )}
              </div>
              <div className="form-group">
                <label>Contact Details</label>
                {editMode ? (
                  <input 
                    type="text" 
                    className="clean-input" 
                    value={estimation.contactDetails || ""} 
                    onChange={(e) => handleInfoChange("contactDetails", e.target.value)} 
                    placeholder="Phone / Email" 
                  />
                ) : (
                  <span className="read-value">{estimation.contactDetails || "N/A"}</span>
                )}
              </div>
            </div>
          </div>

          {/* Scope for Submittal Checklist */}
          <div className="content-card">
            <div className="card-header">
              <FaClipboardList /> <h4>Scope for Submittal</h4>
            </div>
            <div className="card-body checkbox-list-grid">
              {[
                "Shop Drawings", 
                "Approval", 
                "Erection Drawings", 
                "Re-Approval", 
                "Reports", 
                "Review and Comment", 
                "3D Model", 
                "Fabrication"
              ].map((item) => {
                const isChecked = (estimation.scopeSubmittals || []).includes(item);
                return (
                  <div 
                    key={item} 
                    className={`checkbox-item ${isChecked ? "checked" : ""} ${!editMode ? "disabled" : ""}`}
                    onClick={() => editMode && handleCheckboxToggle("scopeSubmittals", item)}
                  >
                    <div className="box">
                      {isChecked && <FaCheck className="tick-icon" />}
                    </div>
                    <span className="lbl">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Two Column Grid: Sending By & Drawing Requirements */}
        <div className="grid-2-col">
          {/* Sending By */}
          <div className="content-card">
            <div className="card-header">
              <FaPaperPlane /> <h4>Sending By</h4>
            </div>
            <div className="card-body checkbox-list-grid columns-2">
              {["Email", "Messenger", "FTP", "FEDEX"].map((item) => {
                const isChecked = (estimation.sendingBys || []).includes(item);
                return (
                  <div 
                    key={item} 
                    className={`checkbox-item ${isChecked ? "checked" : ""} ${!editMode ? "disabled" : ""}`}
                    onClick={() => editMode && handleCheckboxToggle("sendingBys", item)}
                  >
                    <div className="box">
                      {isChecked && <FaCheck className="tick-icon" />}
                    </div>
                    <span className="lbl">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Drawing Requirement */}
          <div className="content-card">
            <div className="card-header">
              <FaPencilRuler /> <h4>Drawing Requirement</h4>
            </div>
            <div className="card-body checkbox-list-grid columns-2">
              {["Structural Detailing", "Deck Drawing", "Structural Engineering", "Structural Estimation"].map((item) => {
                const isChecked = (estimation.drawingRequirements || []).includes(item);
                return (
                  <div 
                    key={item} 
                    className={`checkbox-item ${isChecked ? "checked" : ""} ${!editMode ? "disabled" : ""}`}
                    onClick={() => editMode && handleCheckboxToggle("drawingRequirements", item)}
                  >
                    <div className="box">
                      {isChecked && <FaCheck className="tick-icon" />}
                    </div>
                    <span className="lbl">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scope of Work */}
        <div className="content-card">
          <div className="card-header">
            <FaImage /> <h4>Scope of Work Reference</h4>
          </div>
          <div className="card-body text-reference-area">
             {editMode ? (
               <textarea
                 rows="3"
                 className="clean-textarea"
                 value={estimation.scopeOfWork || ""}
                 onChange={(e) => handleInfoChange("scopeOfWork", e.target.value)}
                 placeholder="Type scope reference, drawings, models, or notes here..."
               />
             ) : (
               <div className="reference-text-display">
                 {estimation.scopeOfWork ? (
                   <p>{estimation.scopeOfWork}</p>
                 ) : (
                   <span className="placeholder-text">No CAD/Scope of work reference documents specified.</span>
                 )}
               </div>
             )}
          </div>
        </div>

        {/* Pricing & Schedule Banner */}
        <div className="pricing-banner">
          <div className="price-box">
            <div className="icon-wrapper"><FaDollarSign /></div>
            <div className="info">
              <span className="lbl-tag">Project Price</span>
              <div className="input-wrapper">
                <span className="currency">$</span>
                {editMode ? (
                  <input 
                    type="number" 
                    className="price-input" 
                    value={estimation.price || ""} 
                    onChange={(e) => handleInfoChange("price", e.target.value)} 
                    placeholder="0.00" 
                  />
                ) : (
                  <span className="price-text">{Number(estimation.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                )}
              </div>
            </div>
          </div>
          <div className="schedule-box">
            <div className="icon-wrapper"><FaCalendarAlt /></div>
            <div className="info">
              <span className="lbl-tag">Schedule for Approval</span>
              {editMode ? (
                <input 
                  type="text" 
                  className="schedule-input" 
                  value={estimation.scheduleForApproval || "1 Weeks"} 
                  onChange={(e) => handleInfoChange("scheduleForApproval", e.target.value)} 
                  placeholder="e.g. 1 Weeks" 
                />
              ) : (
                <span className="schedule-text">{estimation.scheduleForApproval || "1 Weeks"}</span>
              )}
            </div>
          </div>
        </div>

        {/* Please Note Box */}
        <div className="terms-box">
          <h5>Please Note:</h5>
          <p>
            This quote is based solely on the current directions and files provided. Any additional
            members required due to revised, updated, or newly issued section detail drawings may
            impact both the cost and schedule.
          </p>
        </div>

        {/* Signature Blocks */}
        <div className="signature-footer">
          <div className="sign-block">
            <div className="sign-logo">
               <img src={logo} alt="Seal" />
            </div>
            <div className="sign-line-wrapper">
               <span>Signed:</span>
               <div className="line"></div>
            </div>
            <p className="fine-print">If enclosures are not as noted, kindly notify us at once.</p>
          </div>
          <div className="sign-block client-sign">
            <h5>Client Sign and Seal as acceptable:</h5>
            <div className="stamp-box">
               <p>Sign / Stamp Here</p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2.5rem 1rem;
  background: var(--background);
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  color: var(--grey-800);

  .header-actions {
    max-width: 850px;
    margin: 0 auto 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--white);
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: var(--shadow-1);
    border: 1px solid var(--grey-200);

    .title-area {
      h3 { margin: 0; font-size: 1.25rem; font-weight: 800; color: var(--grey-900); }
      p { margin: 0.2rem 0 0 0; font-size: 0.8rem; color: var(--grey-500); }
    }

    .button-group {
      display: flex;
      gap: 0.75rem;
    }
  }

  .btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    border: none;
    transition: var(--transition);
  }

  .back-btn { 
    background: var(--grey-100); 
    color: var(--grey-700); 
    border: 1px solid var(--grey-300);
    &:hover { background: var(--grey-200); } 
  }
  
  .mode-btn {
    background: var(--white);
    color: var(--primary-600);
    border: 1px solid var(--primary-200);
    &:hover { background: var(--primary-50); }
    &.active {
      background: var(--primary-50);
      border-color: var(--primary-400);
    }
  }

  .save-btn {
    background: #10b981;
    color: white;
    &:hover { background: #059669; }
  }

  .print-btn { 
    background: var(--primary-600); 
    color: var(--white); 
    &:hover { background: var(--primary-700); } 
  }

  .document-container {
    max-width: 850px;
    margin: 0 auto;
    background: var(--white);
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04), 0 1px 8px rgba(0, 0, 0, 0.02);
    padding: 3rem;
    border: 1px solid var(--grey-200);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    transition: all 0.3s ease;
  }

  /* Inline Minimalist Inputs styling */
  .clean-input {
    border: 1px solid var(--grey-300);
    border-radius: 6px;
    background: var(--grey-50);
    padding: 0.5rem 0.75rem;
    font-family: inherit;
    font-size: 0.85rem;
    color: var(--grey-900);
    width: 100%;
    box-sizing: border-box;
    transition: all 0.2s ease;

    &:focus {
      border-color: var(--primary-500);
      outline: none;
      background: var(--white);
      box-shadow: 0 0 0 3px var(--primary-50);
    }
  }

  .clean-textarea {
    border: 1px solid var(--grey-300);
    border-radius: 6px;
    background: var(--grey-50);
    padding: 0.6rem 0.8rem;
    font-family: inherit;
    font-size: 0.85rem;
    color: var(--grey-900);
    width: 100%;
    box-sizing: border-box;
    resize: vertical;
    min-height: 80px;
    transition: all 0.2s ease;

    &:focus {
      border-color: var(--primary-500);
      outline: none;
      background: var(--white);
      box-shadow: 0 0 0 3px var(--primary-50);
    }
  }

  /* Document Header Section */
  .doc-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid var(--grey-900);
    padding-bottom: 1.25rem;
  }

  .branding {
    display: flex;
    gap: 1rem;
    align-items: center;
    
    .logo-box {
      width: 60px; 
      height: 60px;
      display: grid; 
      place-items: center;
      img { width: 50px; }
    }
    .company-text {
      h2 { margin: 0; font-size: 1.35rem; color: var(--grey-900); font-weight: 800; letter-spacing: -0.5px; }
      .tagline { margin: 0 0 6px 0; font-size: 0.6rem; color: var(--primary-600); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
      .contact-links {
        display: flex; 
        gap: 12px;
        span { display: flex; align-items: center; gap: 4px; font-size: 0.75rem; color: var(--grey-500); font-weight: 500; }
        .icon { color: var(--grey-400); }
      }
    }
  }

  .title-block {
    text-align: right;
    .doc-title { 
      margin: 0; 
      font-size: 1.15rem; 
      color: var(--primary-600); 
      text-transform: uppercase; 
      letter-spacing: 1.5px;
      font-weight: 800;
    }
    .title-line {
      width: 40px;
      height: 3px;
      background: var(--primary-600);
      margin-left: auto;
      margin-top: 4px;
    }
  }

  /* Metadata card styling */
  .meta-card {
    background: var(--grey-50);
    padding: 0.85rem 1.25rem;
    border-radius: 8px;
    border: 1px solid var(--grey-200);

    .meta-grid {
      display: grid; 
      grid-template-columns: repeat(4, 1fr); 
      gap: 1rem;
    }
    .meta-item {
      display: flex; 
      flex-direction: column; 
      gap: 3px;
      justify-content: center;
      
      .label { font-size: 0.65rem; font-weight: 800; color: var(--grey-400); text-transform: uppercase; letter-spacing: 0.5px; }
      .value { font-weight: 700; font-size: 0.85rem; color: var(--grey-900); }
      .highlight { color: var(--primary-600); font-weight: 800; }
    }
  }

  /* Grid Layouts */
  .grid-2-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .content-card {
    border: 1px solid var(--grey-200);
    border-radius: 8px;
    overflow: hidden;
    background: var(--white);
    display: flex;
    flex-direction: column;
    
    .card-header {
      background: var(--grey-50);
      padding: 0.65rem 1rem;
      border-bottom: 1px solid var(--grey-200);
      display: flex; 
      align-items: center; 
      gap: 8px;
      color: var(--primary-600);
      font-size: 0.8rem;
      
      h4 { margin: 0; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: var(--grey-800); }
      svg { font-size: 0.9rem; }
    }
    .card-body { 
      padding: 1rem; 
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
  }

  .form-group {
    display: flex; 
    flex-direction: column; 
    gap: 3px;
    
    label { font-size: 0.7rem; font-weight: 800; color: var(--grey-400); text-transform: uppercase; }
    .read-value { font-size: 0.85rem; font-weight: 700; color: var(--grey-800); }
  }

  /* Checkbox rendering */
  .checkbox-list-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;

    &.columns-2 {
      grid-template-columns: 1fr 1fr;
    }

    .checkbox-item {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      padding: 0.35rem 0.5rem;
      border-radius: 4px;
      transition: all 0.2s ease;
      background: var(--grey-50);
      border: 1px solid var(--grey-200);

      &:hover:not(.disabled) {
        background: var(--primary-50);
        border-color: var(--primary-300);
      }

      &.disabled {
        cursor: default;
        background: var(--white);
        border-color: transparent;
        padding-left: 0;
      }

      .box {
        width: 14px;
        height: 14px;
        border: 1.5px solid var(--grey-300);
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--white);
        transition: all 0.15s ease;

        .tick-icon {
          font-size: 8px;
          color: white;
        }
      }

      &.checked {
        .box {
          background: var(--primary-600);
          border-color: var(--primary-600);
        }
        .lbl {
          font-weight: 700;
          color: var(--grey-900);
        }
      }

      .lbl {
        font-size: 0.75rem;
        color: var(--grey-700);
      }
    }
  }

  /* Reference Area styles */
  .text-reference-area {
    .reference-text-display {
      font-size: 0.85rem;
      color: var(--grey-850);
      line-height: 1.45;
      padding: 0.5rem 0;

      .placeholder-text {
        color: var(--grey-400);
        font-style: italic;
      }
    }
  }

  /* Pricing Banner Redesign */
  .pricing-banner {
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    gap: 1.5rem;
    background: var(--grey-900);
    border-radius: 8px;
    padding: 1.25rem 1.75rem;
    color: white;
    
    .price-box, .schedule-box {
      display: flex; 
      align-items: center; 
      gap: 1rem;
      
      .icon-wrapper {
        width: 36px; 
        height: 36px; 
        border-radius: 50%; 
        background: rgba(255, 255, 255, 0.1);
        display: grid; 
        place-items: center; 
        font-size: 1rem; 
        color: var(--primary-300);
      }
      .info {
        display: flex; 
        flex-direction: column; 
        gap: 2px; 
        flex-grow: 1;
        
        .lbl-tag { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; color: var(--grey-400); }
      }
    }
    
    .input-wrapper {
      display: flex; 
      align-items: center; 
      gap: 4px;
      .currency { font-size: 1.35rem; font-weight: 800; color: white; }
    }
    
    .price-input, .schedule-input {
      color: white; 
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
      padding: 0.35rem 0.5rem;
      font-size: 1rem;
      font-weight: 700;
      width: 100%;
      outline: none;

      &:focus {
        border-color: var(--primary-400);
        background: rgba(255, 255, 255, 0.1);
      }
    }
    
    .price-text { font-size: 1.35rem; font-weight: 800; color: white; }
    .schedule-text { font-size: 1.1rem; font-weight: 700; color: var(--primary-300); }
  }

  /* Note Box styling */
  .terms-box {
    background: #fef8e6;
    border-left: 3px solid #eab308;
    padding: 0.85rem 1.25rem;
    border-radius: 4px;
    h5 { margin: 0 0 3px 0; color: #854d0e; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; }
    p { margin: 0; color: #854d0e; font-size: 0.75rem; line-height: 1.4; font-style: italic; }
  }

  /* Signatures rendering */
  .signature-footer {
    display: flex; 
    justify-content: space-between; 
    margin-top: 1rem; 
    padding-top: 1.5rem; 
    border-top: 1px solid var(--grey-200);
  }
  
  .sign-block {
    width: 45%;
    .sign-logo img { width: 60px; opacity: 0.8; margin-bottom: 6px; }
    .sign-line-wrapper {
      display: flex; 
      align-items: flex-end; 
      gap: 8px; 
      margin-bottom: 6px;
      span { font-size: 0.75rem; font-weight: 800; color: var(--grey-500); text-transform: uppercase; }
      .line { flex-grow: 1; border-bottom: 1.5px solid var(--grey-900); height: 16px; }
    }
    .fine-print { font-size: 0.7rem; color: var(--grey-400); font-style: italic; }
  }

  .client-sign {
    h5 { margin: 0 0 10px 0; font-size: 0.75rem; font-weight: 800; color: var(--grey-800); text-transform: uppercase; }
    .stamp-box {
      height: 80px; 
      border: 1.5px dashed var(--grey-300); 
      border-radius: 6px;
      display: grid; 
      place-items: center; 
      color: var(--grey-400); 
      font-size: 0.7rem;
      font-weight: 700; 
      text-transform: uppercase; 
      letter-spacing: 0.5px;
    }
  }

  /* Dark Theme adjustments */
  body.dark-theme & {
    .header-actions {
      background: #0f172a;
      border-color: #1e293b;
      .title-area h3 { color: #f8fafc; }
    }
    .mode-btn {
      background: #1e293b;
      color: var(--primary-300);
      border-color: #334155;
      &:hover { background: #334155; }
    }
    .back-btn {
      background: #1e293b;
      color: #cbd5e1;
      border-color: #334155;
      &:hover { background: #334155; }
    }
    .document-container {
      background: #0f172a;
      border-color: #1e293b;
    }
    .clean-input, .clean-textarea {
      background: #020617;
      border-color: #334155;
      color: #cbd5e1;
      &:focus {
        background: #020617;
        border-color: var(--primary-500);
      }
    }
    .doc-header {
      border-bottom-color: #1e293b;
    }
    .branding .company-text h2 {
      color: #f8fafc;
    }
    .meta-card {
      background: #020617;
      border-color: #1e293b;
      .meta-item .value { color: #cbd5e1; }
    }
    .content-card {
      border-color: #1e293b;
      background: #020617;
      .card-header {
        background: #020617;
        border-bottom-color: #1e293b;
        h4 { color: #cbd5e1; }
      }
    }
    .checkbox-item {
      background: #020617 !important;
      border-color: #1e293b !important;
      &.checked {
        .box { background: var(--primary-500) !important; border-color: var(--primary-500) !important; }
        .lbl { color: #cbd5e1 !important; }
      }
      .lbl { color: #94a3b8 !important; }
      .box { background: #0f172a !important; border-color: #334155 !important; }
    }
    .text-reference-area .reference-text-display {
      color: #cbd5e1;
    }
    .pricing-banner {
      background: #020617;
      border: 1px solid #1e293b;
    }
    .terms-box {
      background: rgba(234, 179, 8, 0.05);
      border-left-color: #eab308;
      h5, p { color: #eab308; }
    }
    .signature-footer {
      border-top-color: #1e293b;
    }
    .sign-line-wrapper span { color: #f8fafc; }
    .sign-line-wrapper .line { border-bottom-color: #cbd5e1; }
    .stamp-box { border-color: #334155 !important; }
  }

  /* Perfect Print Styles layout */
  @media print {
    .no-print { display: none !important; }
    padding: 0 !important; 
    background: white !important;

    .document-container {
      box-shadow: none !important; 
      border: none !important; 
      max-width: 100% !important; 
      padding: 0 !important; 
      color: black !important; 
      background: white !important;
    }

    .clean-input, .clean-textarea {
      border: none !important; 
      background: transparent !important; 
      color: black !important; 
      padding: 0 !important;
      font-size: 0.85rem !important;
      font-weight: 700 !important;
    }

    .pricing-banner {
      background: #f8fafc !important; 
      color: black !important; 
      border: 1.5px solid #000 !important; 
      
      .icon-wrapper { display: none !important; } 
      .price-input, .schedule-input { 
        color: black !important; 
        background: transparent !important; 
        border: none !important; 
        padding: 0 !important; 
        font-size: 1.2rem !important;
      }
      .price-text, .schedule-text { color: black !important; }
      .lbl-tag { color: #475569 !important; }
    }

    .content-card {
      border: 1.5px solid #000 !important; 
      
      .card-header {
        background: #f8fafc !important; 
        color: black !important; 
        border-bottom: 1.5px solid #000 !important; 
        
        svg { display: none !important; }
        h4 { color: black !important; }
      }
    }

    .checkbox-item {
      background: transparent !important;
      border-color: transparent !important;
      padding-left: 0 !important;

      .box {
        border: 1.5px solid #000 !important;
      }
      
      &.checked {
        .box {
          background: black !important;
          border-color: black !important;
          .tick-icon { color: white !important; }
        }
      }
    }

    .terms-box {
      background: white !important; 
      border-left: none !important; 
      border: 1.5px solid #000 !important; 
      
      p { color: black !important; } 
      h5 { color: black !important; }
    }

    .stamp-box {
      border: 1.5px solid #000 !important;
    }

    .sign-line-wrapper .line {
      border-bottom-color: black !important;
    }

    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }
`;

export default EstimationLetter;
