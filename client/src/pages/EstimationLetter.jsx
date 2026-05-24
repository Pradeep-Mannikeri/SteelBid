import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGlobe, FaEnvelope, FaPhoneAlt, FaArrowLeft, FaPrint, FaBuilding, FaClipboardList, FaPaperPlane, FaPencilRuler, FaImage, FaDollarSign, FaCalendarAlt } from "react-icons/fa";
import logo from "../assets/logo.svg";

const EstimationLetter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialEstimation = location.state?.estimation || {
    id: "SDLLCE-250021",
    companyName: "",
    location: "",
    project: "",
    date: "03-03-2026",
    hours: 0,
    price: 0,
  };

  const [estimation, setEstimation] = useState(initialEstimation);

  const handleInfoChange = (field, value) => {
    setEstimation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Wrapper>
      <div className="no-print header-actions">
        <button className="btn back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <div className="title-area">
          <h3>Letter of Quotation</h3>
          <p>Preview and edit your quotation document</p>
        </div>
        <button className="btn print-btn" onClick={() => window.print()}>
          <FaPrint /> Export PDF
        </button>
      </div>

      <div className="document-container">
        {/* Modern Header */}
        <div className="doc-header">
          <div className="branding">
            <div className="logo-box">
              <img src={logo} alt="Steel Dimension LLC" />
            </div>
            <div className="company-text">
              <h2>Steel Dimension LLC</h2>
              <p className="tagline">Precision in Every Detail, Strength in Every Structure...!</p>
              <div className="contact-links">
                <span><FaGlobe /> www.SteelDimension.com</span>
                <span><FaEnvelope /> Estimation@SteelDimension.com</span>
                <span><FaPhoneAlt /> +1 727-378-1270</span>
              </div>
            </div>
          </div>
          
          <div className="meta-card">
            <h1 className="doc-title">Quotation</h1>
            <div className="meta-grid">
              <div className="meta-item">
                <span className="label">Quotation No.</span>
                <input type="text" className="clean-input value highlight" value={estimation.id} readOnly />
              </div>
              <div className="meta-item">
                <span className="label">Received Date</span>
                <input type="date" className="clean-input value" />
              </div>
              <div className="meta-item">
                <span className="label">Job Name</span>
                <input type="text" className="clean-input value" value={estimation.project} onChange={(e) => handleInfoChange('project', e.target.value)} placeholder="Enter Job Name" />
              </div>
              <div className="meta-item">
                <span className="label">Submission Date</span>
                <input type="date" className="clean-input value" defaultValue="2026-03-03" />
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Section: Client & Submittal Scope */}
        <div className="grid-2-col">
          <div className="content-card">
            <div className="card-header">
              <FaBuilding /> <h4>Client Information</h4>
            </div>
            <div className="card-body form-grid">
              <div className="form-group">
                <label>Client Name</label>
                <input type="text" className="clean-input" value={estimation.companyName} onChange={(e) => handleInfoChange('companyName', e.target.value)} placeholder="Company Name" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" className="clean-input" value={estimation.location} onChange={(e) => handleInfoChange('location', e.target.value)} placeholder="Full Address" />
              </div>
              <div className="form-group">
                <label>Project Manager</label>
                <input type="text" className="clean-input" placeholder="Manager Name" />
              </div>
              <div className="form-group">
                <label>Contact Details</label>
                <input type="text" className="clean-input" placeholder="Phone / Email" />
              </div>
            </div>
          </div>

          <div className="content-card highlight-card">
            <div className="card-header">
              <FaClipboardList /> <h4>Scope for Submittal</h4>
            </div>
            <div className="card-body list-grid">
              <div className="list-item"><span>Shop Drawings</span> <span className="status">Approval</span></div>
              <div className="list-item"><span>Erection Drawings</span> <span className="status">Re-Approval</span></div>
              <div className="list-item"><span>Reports</span> <span className="status">Review and Comment</span></div>
              <div className="list-item"><span>3D Model</span> <span className="status">Fabrication</span></div>
              <div className="list-item"><span>Extra:</span> <input type="text" className="clean-input" style={{width: '120px'}} /></div>
            </div>
          </div>
        </div>

        {/* Two Column Section: Sending By & Drawing Req */}
        <div className="grid-2-col">
          <div className="content-card">
            <div className="card-header">
              <FaPaperPlane /> <h4>Sending By</h4>
            </div>
            <div className="card-body list-grid">
              <div className="list-item"><span>Email</span> <span className="status">Messenger</span></div>
              <div className="list-item"><span>FTP</span> <span className="status">FEDEX</span></div>
            </div>
          </div>

          <div className="content-card">
            <div className="card-header">
              <FaPencilRuler /> <h4>Drawing Requirement</h4>
            </div>
            <div className="card-body list-grid">
              <div className="list-item"><span>Structural Detailing</span> <span className="status">Deck Drawing</span></div>
              <div className="list-item"><span>Structural Engineering</span> <span className="status">Structural Estimation</span></div>
            </div>
          </div>
        </div>

        {/* Scope of Work (Image) */}
        <div className="content-card">
          <div className="card-header">
            <FaImage /> <h4>Scope of Work</h4>
          </div>
          <div className="card-body image-area">
             <div className="placeholder-model">
                <span>3D Model Reference Area</span>
                <p>Click to upload or attach CAD reference</p>
             </div>
          </div>
        </div>

        {/* Pricing & Schedule Banner */}
        <div className="pricing-banner">
          <div className="price-box">
            <div className="icon-wrapper"><FaDollarSign /></div>
            <div className="info">
              <span className="label">Project Price</span>
              <div className="input-wrapper">
                <span className="currency">$</span>
                <input type="number" className="clean-input price-input" value={estimation.price || ''} onChange={(e) => handleInfoChange('price', e.target.value)} placeholder="0.00" />
              </div>
            </div>
          </div>
          <div className="schedule-box">
            <div className="icon-wrapper"><FaCalendarAlt /></div>
            <div className="info">
              <span className="label">Schedule for Approval</span>
              <input type="text" className="clean-input schedule-input" placeholder="e.g., 2 Weeks" />
            </div>
          </div>
        </div>

        {/* Please Note */}
        <div className="terms-box">
          <h5>Please Note:</h5>
          <p>
            This quote is based solely on the current directions and files provided. Any additional
            members required due to revised, updated, or newly issued section detail drawings may
            impact both the cost and schedule.
          </p>
        </div>

        {/* Signatures */}
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
  padding: 2rem;
  background: var(--background);
  min-height: 100vh;
  color: var(--grey-900);

  .header-actions {
    max-width: 1000px;
    margin: 0 auto 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-area {
      text-align: center;
      h3 { margin: 0; font-size: 1.5rem; color: var(--grey-900); }
      p { margin: 0; font-size: 0.9rem; color: var(--grey-500); }
    }
  }

  .btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.2rem;
    border-radius: var(--radius);
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: var(--transition);
  }

  .back-btn { background: var(--white); border: 1px solid var(--grey-200); color: var(--grey-700); &:hover { background: var(--grey-100); } }
  .print-btn { background: var(--primary-600); color: var(--white); &:hover { background: var(--primary-700); } }

  .document-container {
    max-width: 1000px;
    margin: 0 auto;
    background: var(--white);
    border-radius: 12px;
    box-shadow: var(--shadow-3);
    padding: 3.5rem;
    border: 1px solid var(--grey-100);
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  /* Shared Input Style */
  .clean-input {
    border: 1px solid transparent;
    background: transparent;
    padding: 0.4rem 0;
    font-family: inherit;
    font-size: 0.95rem;
    color: var(--grey-900);
    width: 100%;
    transition: var(--transition);
    border-bottom: 1px solid var(--grey-200);
    &:hover, &:focus {
      border-bottom-color: var(--primary-500);
      outline: none;
      background: var(--primary-50);
      padding: 0.4rem;
      border-radius: 4px 4px 0 0;
    }
  }

  /* Header */
  .doc-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 2px solid var(--grey-100);
    padding-bottom: 2rem;
  }

  .branding {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    .logo-box {
      width: 80px; height: 80px;
      background: var(--primary-50);
      border-radius: 12px;
      display: grid; place-items: center;
      img { width: 60px; }
    }
    .company-text {
      h2 { margin: 0; font-size: 1.8rem; color: var(--primary-600); font-weight: 900; letter-spacing: -0.5px; }
      .tagline { margin: 0 0 10px 0; font-size: 0.8rem; color: var(--primary-500); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
      .contact-links {
        display: flex; flex-direction: column; gap: 4px;
        span { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--grey-600); }
      }
    }
  }

  .meta-card {
    background: var(--grey-50);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--grey-200);
    min-width: 350px;
    .doc-title { margin: 0 0 1rem; font-size: 1.6rem; color: var(--grey-900); text-align: right; text-transform: uppercase; letter-spacing: 2px; }
    .meta-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
    }
    .meta-item {
      display: flex; flex-direction: column; gap: 4px;
      .label { font-size: 0.7rem; font-weight: 700; color: var(--grey-500); text-transform: uppercase; }
      .value { font-weight: 600; font-size: 0.9rem; }
      .highlight { color: var(--primary-600); font-weight: 800; }
    }
  }

  /* Grids & Cards */
  .grid-2-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .content-card {
    border: 1px solid var(--grey-200);
    border-radius: 8px;
    overflow: hidden;
    
    .card-header {
      background: var(--grey-50);
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--grey-200);
      display: flex; align-items: center; gap: 10px;
      color: var(--primary-600);
      h4 { margin: 0; font-size: 1.1rem; }
    }
    .card-body { padding: 1.5rem; }
    
    &.highlight-card {
       border-color: var(--primary-200);
       .card-header { background: var(--primary-50); color: var(--primary-700); border-bottom-color: var(--primary-200); }
    }
  }

  .form-grid {
    display: flex; flex-direction: column; gap: 1rem;
    .form-group {
      display: flex; flex-direction: column; gap: 5px;
      label { font-size: 0.8rem; font-weight: 600; color: var(--grey-500); }
    }
  }

  .list-grid {
    display: flex; flex-direction: column; gap: 1rem;
    .list-item {
      display: flex; justify-content: space-between; align-items: center;
      padding-bottom: 0.5rem; border-bottom: 1px dashed var(--grey-200);
      span { font-size: 0.95rem; color: var(--grey-800); }
      .status { font-weight: 600; color: var(--primary-600); }
      &:last-child { border-bottom: none; padding-bottom: 0; }
    }
  }

  /* Image Area */
  .image-area {
    padding: 2rem !important;
    .placeholder-model {
      height: 300px;
      border: 2px dashed var(--grey-300);
      border-radius: 8px;
      background: var(--grey-50);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      color: var(--grey-400); gap: 10px;
      transition: var(--transition);
      cursor: pointer;
      &:hover { border-color: var(--primary-400); color: var(--primary-500); background: var(--primary-50); }
      span { font-size: 1.2rem; font-weight: 600; }
      p { font-size: 0.9rem; }
    }
  }

  /* Pricing Banner */
  .pricing-banner {
    display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;
    background: var(--primary-600);
    border-radius: 12px;
    padding: 2rem;
    color: white;
    
    .price-box, .schedule-box {
      display: flex; align-items: center; gap: 1.5rem;
      .icon-wrapper {
        width: 50px; height: 50px; border-radius: 50%; background: rgba(255,255,255,0.1);
        display: grid; place-items: center; font-size: 1.5rem; color: var(--primary-200);
      }
      .info {
        display: flex; flex-direction: column; gap: 5px; flex-grow: 1;
        .label { font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--primary-200); }
      }
    }
    
    .input-wrapper {
      display: flex; align-items: center; gap: 5px;
      .currency { font-size: 1.8rem; font-weight: 800; }
    }
    
    .clean-input {
      color: white; border-bottom-color: rgba(255,255,255,0.3);
      &::placeholder { color: rgba(255,255,255,0.5); }
      &:hover, &:focus { background: rgba(255,255,255,0.1); border-bottom-color: white; }
    }
    .price-input { font-size: 1.8rem; font-weight: 800; }
    .schedule-input { font-size: 1.2rem; font-weight: 600; }
  }

  /* Terms */
  .terms-box {
    background: #fffbeb;
    border-left: 4px solid #f59e0b;
    padding: 1.5rem;
    border-radius: 4px;
    h5 { margin: 0 0 5px 0; color: #b45309; font-size: 1rem; }
    p { margin: 0; color: #78350f; font-size: 0.95rem; line-height: 1.6; font-style: italic; }
  }

  /* Signatures */
  .signature-footer {
    display: flex; justify-content: space-between; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--grey-200);
  }
  
  .sign-block {
    width: 45%;
    .sign-logo img { width: 80px; opacity: 0.8; margin-bottom: 10px; }
    .sign-line-wrapper {
      display: flex; align-items: flex-end; gap: 10px; margin-bottom: 10px;
      span { font-weight: 600; color: var(--grey-800); }
      .line { flex-grow: 1; border-bottom: 2px solid var(--grey-900); height: 20px; }
    }
    .fine-print { font-size: 0.8rem; color: var(--grey-500); font-style: italic; }
  }

  .client-sign {
    h5 { margin: 0 0 15px 0; font-size: 1rem; color: var(--grey-900); }
    .stamp-box {
      height: 120px; border: 2px dashed var(--grey-300); border-radius: 8px;
      display: grid; place-items: center; color: var(--grey-400); font-weight: 600; text-transform: uppercase; letter-spacing: 1px;
    }
  }

  /* Dark Theme Adjustments */
  body.dark-theme & {
    .document-container { background: #0f172a; border-color: #1e293b; }
    .clean-input { color: #f8fafc; border-bottom-color: #334155; &:hover, &:focus { background: #1e293b; border-bottom-color: var(--primary-500); } }
    .doc-header { border-bottom-color: #1e293b; }
    .branding .logo-box { background: #1e293b; }
    .meta-card { background: #020617; border-color: #1e293b; .doc-title { color: #f8fafc; } }
    .content-card { border-color: #1e293b; .card-header { background: #020617; border-bottom-color: #1e293b; } }
    .highlight-card { border-color: var(--primary-900); .card-header { background: var(--primary-900); border-bottom-color: var(--primary-800); } }
    .list-item { border-bottom-color: #334155 !important; span { color: #cbd5e1 !important; } .status { color: var(--primary-400) !important; } }
    .placeholder-model { background: #020617; border-color: #334155; }
    .terms-box { background: rgba(245, 158, 11, 0.1); }
    .signature-footer { border-top-color: #1e293b; }
    .sign-line-wrapper span { color: #f8fafc; }
    .sign-line-wrapper .line { border-bottom-color: #f8fafc; }
    .stamp-box { border-color: #334155 !important; }
  }

  @media print {
    .no-print { display: none; }
    padding: 0; background: white;
    .document-container { box-shadow: none; border: none; max-width: 100%; padding: 0; color: black !important; background: white !important; }
    .clean-input { border: none !important; background: transparent !important; color: black !important; padding: 0 !important; }
    .pricing-banner { background: #f8fafc !important; color: black !important; border: 2px solid #000; .icon-wrapper { display: none; } .clean-input { color: black !important; } .label { color: #333 !important; } }
    .content-card { border: 1px solid #000 !important; .card-header { background: #f8fafc !important; color: black !important; border-bottom: 1px solid #000 !important; svg { display: none; } } }
    .terms-box { background: white !important; border-left: none; border: 2px solid #000; p { color: black !important; } h5 { color: black !important; } }
    .placeholder-model { border: 1px solid #000 !important; }
    .stamp-box { border: 1px solid #000 !important; }
    * { -webkit-print-color-adjust: exact; }
  }
`;

export default EstimationLetter;
