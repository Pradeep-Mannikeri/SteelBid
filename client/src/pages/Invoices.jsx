import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaFileDownload, 
  FaEdit, 
  FaExternalLinkAlt, 
  FaFilter, 
  FaCheckCircle, 
  FaClock, 
  FaTimesCircle, 
  FaSpinner, 
  FaFileAlt,
  FaBuilding,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCalculator 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { pdf } from '@react-pdf/renderer';
import EstimationPDF from '../components/EstimationPDF';
import { EstimationContext } from '../context/EstimationContext';
const Invoices = () => {
  const navigate = useNavigate();
  const contextValue = useContext(EstimationContext) || { estimations: [], companies: [] };
  const { estimations = [], companies = [] } = contextValue;

  // Parse estimations into structured bid objects
  const displayInvoices = estimations.map(est => ({
    id: est.id,
    companyName: est.companyName || 'N/A',
    project: est.project || 'N/A',
    date: est.date || '2026-05-17',
    amount: Number(est.price) || 0,
    status: est.status || 'Draft',
    originalData: est
  }));

  // State hooks for filters
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all years dynamically from data
  const availableYears = ['All', ...Array.from(new Set(displayInvoices.map(inv => {
    if (!inv.date) return null;
    const parts = inv.date.split('-');
    return parts[0]?.length === 4 ? parts[0] : parts[2]?.length === 4 ? parts[2] : null;
  }).filter(Boolean))).sort((a, b) => b - a)];

  const [selectedBidForView, setSelectedBidForView] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Open the detailed view-only summary modal
  const handleViewClick = (inv) => {
    setSelectedBidForView(inv);
    setIsViewModalOpen(true);
  };

  // Route to the editable summary view
  const handleEditClick = (inv) => {
    navigate(`/dashboard/estimations/totalsheet`, { 
      state: { 
        estimation: inv.originalData,
        formData: inv.originalData.formData || {},
        clientData: {
          companyName: inv.companyName,
          location: inv.originalData.location || ""
        },
        steps: inv.originalData.steps || [],
        readOnly: false
      } 
    });
  };

  // Filter application logic
  const filteredInvoices = displayInvoices.filter(inv => {
    // 1. Year Filter
    let yearMatches = true;
    if (selectedYear !== 'All') {
      const parts = inv.date.split('-');
      const y = parts[0]?.length === 4 ? parts[0] : parts[2]?.length === 4 ? parts[2] : '';
      yearMatches = y === selectedYear;
    }

    // 2. Status Filter
    let statusMatches = true;
    if (selectedStatus !== 'All') {
      statusMatches = inv.status.toLowerCase() === selectedStatus.toLowerCase();
    }

    // 3. Search Filter
    let searchMatches = true;
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      searchMatches = 
        inv.id.toLowerCase().includes(query) ||
        inv.companyName.toLowerCase().includes(query) ||
        inv.project.toLowerCase().includes(query);
    }

    return yearMatches && statusMatches && searchMatches;
  });

  // Calculate status counts for filter tabs
  const getStatusCount = (statusName) => {
    return displayInvoices.filter(inv => {
      // If filtering by year is active, sync counts to match the year filter
      if (selectedYear !== 'All') {
        const parts = inv.date.split('-');
        const y = parts[0]?.length === 4 ? parts[0] : parts[2]?.length === 4 ? parts[2] : '';
        if (y !== selectedYear) return false;
      }
      return statusName === 'All' || inv.status.toLowerCase() === statusName.toLowerCase();
    }).length;
  };

  const getModalSteps = (bid) => {
    if (!bid) return [];
    if (bid.originalData?.steps && bid.originalData.steps.length > 0) {
      return bid.originalData.steps;
    }
    
    // Fallback: Generate mock steel estimation steps if they are missing (e.g. for historical database bids)
    const hours = Number(bid.originalData?.hours || (bid.originalData?.price ? (Number(bid.originalData.price) / 40) : 0));
    const price = Number(bid.amount || bid.originalData?.price || 0);
    
    if (hours === 0 && price === 0) return [];
    
    return [
      { stepName: "S-1.1 Anchor Bolt Plan & Detailing", hours: (hours * 0.25), price: (price * 0.25) },
      { stepName: "S-1.2 Structural Steel Framing Design", hours: (hours * 0.40), price: (price * 0.40) },
      { stepName: "S-1.3 Miscellaneous Framing Detail", hours: (hours * 0.20), price: (price * 0.20) },
      { stepName: "S-1.4 QA & Structural Stamp Review", hours: (hours * 0.15), price: (price * 0.15) },
    ];
  };

  const handleDownload = async (e, inv) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (!inv) return;
    
    const rawData = inv.originalData || inv;
    const finalData = {
      ...rawData,
      id: inv.id || rawData.id,
      companyName: inv.companyName || rawData.companyName || "N/A",
      project: inv.project || rawData.project || "N/A",
      price: inv.amount || rawData.price || 0,
      location: rawData.location || "N/A",
      steps: rawData.steps && rawData.steps.length > 0 ? rawData.steps : getModalSteps(inv)
    };

    try {
      const blob = await pdf(<EstimationPDF data={finalData} />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Failed to generate PDF. Please check the console.");
    }
  };

  return (
    <Wrapper>
      <div className='header'>
        <div className="title-box">
          <h3>Bid Management</h3>
          <p className="subtitle">Real-time analytical repository & pipeline status</p>
        </div>
      </div>

      {/* FILTER & CONTROL TOOLBAR */}
      <div className='toolbar-section'>
        
        {/* Search Input bar */}
        <div className='search-box-wrapper'>
          <FaSearch className='search-icon' />
          <input 
            type='text' 
            placeholder='Search Bid ID, Client, Project...' 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Year Filter Segment */}
        <div className='filter-segment'>
          <span className='filter-label'><FaCalendarAlt /> Year:</span>
          <div className='select-wrapper'>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className='year-select'
            >
              {availableYears.map(yr => (
                <option key={yr} value={yr}>
                  {yr === 'All' ? 'All Years' : yr}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* STATUS TABS CONTROLLER */}
      <div className='status-tabs-container'>
        {['All', 'Completed', 'Under-Bidding', 'In-Progress', 'Review', 'Draft'].map(st => {
          const count = getStatusCount(st);
          return (
            <button 
              key={st}
              className={`status-tab-btn ${selectedStatus === st ? 'active' : ''}`}
              onClick={() => setSelectedStatus(st)}
            >
              <span className="tab-name">{st.replace('-', ' ')}</span>
              <span className="tab-badge">{count}</span>
            </button>
          );
        })}
      </div>

      {/* DIRECTORY DIRECT LISTING */}
      <div className='list-wrapper'>
        {filteredInvoices.length > 0 ? (
          <div className='table-responsive'>
            <table className='bid-table'>
              <thead>
                <tr>
                  <th>Bid ID</th>
                  <th>Client & Project</th>
                  <th>Valuation</th>
                  <th>Date Created</th>
                  <th>Status</th>
                  <th className='text-center'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} onClick={() => handleViewClick(inv)}>
                    <td className='bid-id-cell'>
                      <span className="id-txt">{inv.id}</span>
                    </td>
                    <td>
                      <div className='client-details'>
                        <div className='c-name'>{inv.companyName}</div>
                        <div className='p-title'>{inv.project}</div>
                      </div>
                    </td>
                    <td className='valuation-cell'>
                      <span className='amt-txt'>${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </td>
                    <td className='date-cell'>
                      <span className='dt-txt'>{inv.date}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${inv.status.toLowerCase().replace(' ', '-')}`}>
                        {inv.status.toLowerCase() === 'completed' && <FaCheckCircle className="status-ico" />}
                        {inv.status.toLowerCase() === 'in progress' && <FaSpinner className="status-ico spinning" />}
                        {inv.status.toLowerCase() === 'under bidding' && <FaClock className="status-ico" />}
                        {inv.status.toLowerCase() === 'review' && <FaClock className="status-ico" />}
                        {inv.status.toLowerCase() === 'draft' && <FaFileAlt className="status-ico" />}
                        {inv.status}
                      </span>
                    </td>
                    <td>
                      <div className='action-cell' onClick={(e) => e.stopPropagation()}>
                        <button 
                          className='btn-action download' 
                          title="Download PDF"
                          onClick={(e) => handleDownload(e, inv)}
                        >
                          <FaFileDownload />
                          <span>PDF</span>
                        </button>
                        <button 
                          className='btn-action edit' 
                          title="Edit Bid Details"
                          onClick={() => handleEditClick(inv)}
                        >
                          <FaEdit />
                          <span>Edit</span>
                        </button>
                        <button 
                          className='btn-action view' 
                          title="View Quotation Letter"
                          onClick={() => handleViewClick(inv)}
                        >
                          <FaExternalLinkAlt />
                          <span>View</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='empty-state-box'>
            <div className='empty-icon-box'><FaFilter /></div>
            <h4>No matched bids found</h4>
            <p>Adjust your year, status filters, or search keywords to locate details.</p>
            <button 
              className='btn-clear'
              onClick={() => {
                setSelectedYear('All');
                setSelectedStatus('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* VIEW MODAL POPUP */}
      {isViewModalOpen && selectedBidForView && (() => {
        const companyInfo = companies.find(
          c => c.companyName?.trim().toLowerCase() === selectedBidForView?.companyName?.trim().toLowerCase()
        );
        return (
          <div className="view-modal-overlay" onClick={() => {
            setIsViewModalOpen(false);
            setSelectedBidForView(null);
          }}>
            <div className="view-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-title-box">
                <span className="bid-badge">{selectedBidForView.id}</span>
                <h3>{selectedBidForView.project}</h3>
                <p className="company-subtitle"><FaBuilding className="ico" /> {selectedBidForView.companyName}</p>
              </div>
              <button className="close-modal-btn" onClick={() => {
                setIsViewModalOpen(false);
                setSelectedBidForView(null);
              }}>×</button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="modal-body">
              <div className="modal-content-grid">
                
                {/* Left Column: Project Identity & Client Info */}
                <div className="modal-column">
                  
                  {/* Card 1: Project Identity */}
                  <div className="modal-card">
                    <div className="modal-card-header">
                      <FaFileAlt className="ico" />
                      <h4>Project Identity</h4>
                    </div>
                    <div className="modal-card-body">
                      <div className="modal-field-group">
                        <label>Estimation Number</label>
                        <span className="field-val highlight">{selectedBidForView.id}</span>
                      </div>
                      <div className="modal-field-group">
                        <label>Project Name</label>
                        <span className="field-val bold">{selectedBidForView.project}</span>
                      </div>
                      <div className="modal-field-row">
                        <div className="modal-field-group">
                          <label>Bid Doc Received Date</label>
                          <span className="field-val">
                            <FaCalendarAlt className="field-ico" /> 
                            {selectedBidForView.originalData?.receivedDate || selectedBidForView.originalData?.formData?.bidDocReceivedDate || "N/A"}
                          </span>
                        </div>
                        <div className="modal-field-group">
                          <label>Bid Date</label>
                          <span className="field-val">
                            <FaCalendarAlt className="field-ico" /> 
                            {selectedBidForView.date || selectedBidForView.originalData?.bidDate || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Client Information */}
                  <div className="modal-card">
                    <div className="modal-card-header">
                      <FaBuilding className="ico" />
                      <h4>Client Information</h4>
                    </div>
                    <div className="modal-card-body">
                      <div className="modal-field-group">
                        <label>Client / Company Name</label>
                        <span className="field-val bold">{selectedBidForView.companyName}</span>
                      </div>
                      <div className="modal-field-group">
                        <label>Address</label>
                        <span className="field-val address">
                          <FaMapMarkerAlt className="field-ico" />
                          {companyInfo?.fullAddress || companyInfo?.location || selectedBidForView.originalData?.fullAddress || selectedBidForView.originalData?.location || "N/A"}
                        </span>
                      </div>
                      <div className="modal-field-row">
                        <div className="modal-field-group">
                          <label>Contact Person</label>
                          <span className="field-val">
                            <FaUser className="field-ico" />
                            {companyInfo?.contactPerson || selectedBidForView.originalData?.contactPerson || "N/A"}
                          </span>
                        </div>
                        <div className="modal-field-group">
                          <label>Phone Number</label>
                          <span className="field-val">
                            <FaPhone className="field-ico" style={{ transform: 'scaleX(-1)' }} />
                            {companyInfo?.phone || companyInfo?.contactNumber || selectedBidForView.originalData?.phone || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: Calculator, Scope & Remarks */}
                <div className="modal-column">
                  
                  {/* Card 3: Project Financials & Estimation Steps */}
                  <div className="modal-card HighlightCard">
                    <div className="modal-card-header space-between">
                      <div className="header-title">
                        <FaCalculator className="ico" />
                        <h4>Estimation calculator</h4>
                      </div>
                      <div className="modal-total-badge">
                        <span className="lbl">Total Price:</span>
                        <span className="val">${selectedBidForView.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                    <div className="modal-card-body">
                      {/* Dynamic Steps table */}
                      <div className="modal-table-wrapper">
                        <table className="modal-table">
                          <thead>
                            <tr>
                              <th>Detail Description / Step</th>
                              <th style={{ textAlign: 'center', width: '25%' }}>Total Hours</th>
                              <th style={{ textAlign: 'right', width: '25%' }}>Price ($)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getModalSteps(selectedBidForView).map((st, idx) => (
                              <tr key={idx}>
                                <td className="step-name">{st.stepName || `Step ${idx + 1}`}</td>
                                <td style={{ textAlign: 'center' }}>{Number(st.hours || 0).toFixed(2)} hrs</td>
                                <td style={{ textAlign: 'right', fontWeight: '700' }}>${Number(st.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="totals-row">
                              <td>Project Totals</td>
                              <td style={{ textAlign: 'center', fontWeight: '700' }}>{Number(selectedBidForView.originalData?.hours || 0).toFixed(2)} hrs</td>
                              <td style={{ textAlign: 'right', fontWeight: '800', color: 'var(--primary-600)' }}>${selectedBidForView.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Scope & Remarks */}
                  <div className="modal-card">
                    <div className="modal-card-header">
                      <FaFileAlt className="ico" />
                      <h4>Scope & Internal Remarks</h4>
                    </div>
                    <div className="modal-card-body scope-body">
                      <div className="scope-box">
                        <label>Inclusions</label>
                        <p className="scope-text">{selectedBidForView.originalData?.inclusions || "No inclusions specified."}</p>
                      </div>
                      <div className="scope-box">
                        <label>Exclusions</label>
                        <p className="scope-text">{selectedBidForView.originalData?.exclusions || "No exclusions specified."}</p>
                      </div>
                      <div className="scope-box remark">
                        <label>Internal Remarks</label>
                        <p className="scope-text remark-text">{selectedBidForView.originalData?.remarks || selectedBidForView.originalData?.formData?.remarks || "No internal remarks."}</p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="modal-footer">
              <button className="btn-modal-action close" onClick={() => {
                setIsViewModalOpen(false);
                setSelectedBidForView(null);
              }}>
                Close Summary
              </button>
              <button 
                className="btn-modal-action download" 
                onClick={(e) => {
                  handleDownload(e, selectedBidForView);
                }}
              >
                <FaFileDownload /> Export Bid PDF
              </button>
            </div>
          </div>
        </div>
        );
      })()}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 1.5rem 0.5rem;
  font-family: 'Roboto', sans-serif !important;

  * {
    font-family: 'Roboto', sans-serif !important;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    
    .title-box {
      h3 {
        font-size: 1.75rem;
        font-weight: 800;
        color: var(--primary-900);
        margin: 0 0 0.25rem 0;
        letter-spacing: -0.02em;
      }
      .subtitle {
        font-size: 0.9rem;
        color: var(--grey-500);
        margin: 0;
      }
    }
  }

  /* TOOLBAR DESIGN */
  .toolbar-section {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
    justify-content: space-between;
    background: var(--white);
    padding: 1rem 1.25rem;
    border-radius: 12px;
    box-shadow: var(--shadow-1);
    border: 1px solid var(--grey-100);
    margin-bottom: 1.5rem;
  }

  .search-box-wrapper {
    position: relative;
    flex: 1;
    min-width: 280px;
    display: flex;
    align-items: center;

    .search-icon {
      position: absolute;
      left: 1rem;
      color: var(--grey-400);
      font-size: 0.95rem;
    }

    input {
      width: 100%;
      padding: 0.65rem 1rem 0.65rem 2.5rem;
      border: 1.5px solid var(--grey-200);
      border-radius: var(--radius);
      font-size: 0.9rem;
      color: var(--grey-800);
      transition: all 0.2s ease;
      outline: none;

      &:focus {
        border-color: var(--primary-500);
        box-shadow: 0 0 0 3px rgba(3, 24, 56, 0.08);
      }
    }
  }

  .filter-segment {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .filter-label {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--grey-600);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  .select-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: var(--grey-50);
    border: 1.5px solid var(--grey-200);
    border-radius: var(--radius);
    padding: 0.15rem 0.5rem;
    transition: all 0.2s ease;
    
    &:focus-within {
      border-color: var(--primary-500);
      box-shadow: 0 0 0 3px rgba(3, 24, 56, 0.08);
    }
  }

  .year-select {
    background: none;
    border: none;
    outline: none;
    padding: 0.45rem 1.75rem 0.45rem 0.5rem;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--grey-800);
    cursor: pointer;
    width: 130px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    
    /* Custom SVG down arrow */
    background-image: url("data:image/svg+xml;utf8,<svg fill='%231e293b' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position: right 4px top 50%;
    background-size: 20px;
  }

  /* STATUS FILTER TABS */
  .status-tabs-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1.5rem;

    .status-tab-btn {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      background: var(--white);
      border: 1px solid var(--grey-200);
      padding: 0.5rem 1rem;
      border-radius: var(--radius);
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--grey-600);
      box-shadow: var(--shadow-1);
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--primary-200);
        color: var(--primary-700);
      }

      &.active {
        background: var(--primary-900);
        border-color: var(--primary-900);
        color: var(--white);
        box-shadow: 0 4px 12px rgba(3, 24, 56, 0.15);

        .tab-badge {
          background: rgba(255, 255, 255, 0.2);
          color: var(--white);
        }
      }

      .tab-name {
        text-transform: capitalize;
      }

      .tab-badge {
        background: var(--grey-100);
        color: var(--grey-700);
        font-size: 0.75rem;
        font-weight: 700;
        padding: 0.15rem 0.5rem;
        border-radius: 20px;
      }
    }
  }

  /* DIRECTORY DIRECT TABLE LISTING */
  .list-wrapper {
    background: var(--white);
    border-radius: 12px;
    box-shadow: var(--shadow-2);
    border: 1px solid var(--grey-100);
    overflow: hidden;
  }

  .table-responsive {
    overflow-x: auto;
  }

  .bid-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;

    th {
      background: var(--grey-50);
      color: var(--grey-600);
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 1rem 1.5rem;
      border-bottom: 1.5px solid var(--grey-200);
    }

    td {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--grey-100);
      vertical-align: middle;
      font-size: 0.9rem;
      color: var(--grey-800);
      transition: background 0.15s ease;
    }

    tbody tr {
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover td {
        background: rgba(3, 24, 56, 0.015);
      }
      
      &:last-child td {
        border-bottom: none;
      }
    }
  }

  /* CELL TYPES */
  .bid-id-cell {
    font-weight: 750;
    
    .id-txt {
      color: var(--primary-700);
      letter-spacing: -0.01em;
    }
  }

  .client-details {
    .c-name {
      font-weight: 700;
      color: var(--grey-900);
      font-size: 0.95rem;
    }
    .p-title {
      font-size: 0.8rem;
      color: var(--grey-500);
      margin-top: 0.15rem;
      font-weight: 500;
    }
  }

  .valuation-cell {
    .amt-txt {
      font-weight: 800;
      color: var(--grey-900);
      font-family: inherit;
    }
  }

  .date-cell {
    .dt-txt {
      color: var(--grey-600);
      font-weight: 500;
    }
  }

  /* STATUS BADGES */
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.75rem;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.3px;

    .status-ico {
      font-size: 0.8rem;
      
      &.spinning {
        animation: spin 1.5s linear infinite;
      }
    }

    &.completed {
      background: #d1fae5;
      color: #065f46;
    }
    &.in-progress {
      background: #dbeafe;
      color: #1e40af;
    }
    &.under-bidding {
      background: #fef3c7;
      color: #92400e;
    }
    &.review {
      background: #ffedd5;
      color: #9a3412;
    }
    &.draft {
      background: #f3f4f6;
      color: #4b5563;
    }
  }

  /* FLAT ACTION ROW */
  .action-cell {
    display: flex;
    gap: 0.65rem;
    justify-content: flex-end;
  }

  .btn-action {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    background: var(--grey-50);
    border: 1px solid var(--grey-200);
    color: var(--grey-700);
    padding: 0.35rem 0.75rem;
    border-radius: var(--radius);
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;

    svg {
      font-size: 0.8rem;
    }

    &:hover {
      background: var(--grey-100);
      color: var(--grey-900);
      border-color: var(--grey-300);
    }

    &.download:hover {
      background: rgba(16, 185, 129, 0.08);
      color: #10b981;
      border-color: rgba(16, 185, 129, 0.3);
    }

    &.edit:hover {
      background: rgba(245, 158, 11, 0.08);
      color: #f59e0b;
      border-color: rgba(245, 158, 11, 0.3);
    }

    &.view:hover {
      background: rgba(3, 24, 56, 0.08);
      color: var(--primary-700);
      border-color: var(--primary-200);
    }
  }

  /* EMPTY STATE DESIGN */
  .empty-state-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;

    .empty-icon-box {
      width: 60px;
      height: 60px;
      background: var(--grey-50);
      color: var(--grey-400);
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 1.5rem;
      margin-bottom: 1.25rem;
      border: 1.5px solid var(--grey-200);
    }

    h4 {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--grey-800);
      margin: 0 0 0.5rem 0;
    }

    p {
      font-size: 0.88rem;
      color: var(--grey-500);
      margin: 0 0 1.5rem 0;
      max-width: 320px;
    }

    .btn-clear {
      background: var(--primary-900);
      color: var(--white);
      border: none;
      padding: 0.5rem 1.25rem;
      border-radius: var(--radius);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: var(--shadow-1);
      transition: all 0.2s ease;

      &:hover {
        background: var(--primary-800);
        box-shadow: var(--shadow-2);
      }
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* DARK THEME SUPPORT OVERRIDES */
  body.dark-theme & {
    .header .title-box h3 {
      color: #ffffff;
    }
    
    .toolbar-section {
      background: #0f172a;
      border-color: #1e293b;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }

    .search-box-wrapper input {
      background: #020617;
      border-color: #1e293b;
      color: #ffffff;
      
      &:focus {
        border-color: var(--primary-400);
      }
    }

    .filter-segment .filter-label {
      color: #ffffff;
      svg {
        color: #ffffff;
      }
    }

    .select-wrapper {
      background: #020617;
      border-color: #1e293b;

      &:focus-within {
        border-color: #38bdf8;
      }
    }

    .year-select {
      color: #ffffff;
      background-image: url("data:image/svg+xml;utf8,<svg fill='%23ffffff' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
      
      option {
        background: #0f172a;
        color: #ffffff;
      }
    }

    .status-tabs-container .status-tab-btn {
      background: #0f172a;
      border-color: #1e293b;
      color: #cbd5e1;
      
      &:hover {
        border-color: #38bdf8;
        color: #38bdf8;
      }

      &.active {
        background: #38bdf8;
        border-color: #38bdf8;
        color: #020617;
        
        .tab-badge {
          background: rgba(2, 6, 23, 0.15);
          color: #020617;
        }
      }

      .tab-badge {
        background: #1e293b;
        color: #cbd5e1;
      }
    }

    .list-wrapper {
      background: #0f172a;
      border-color: #1e293b;
    }

    .bid-table {
      th {
        background: #020617;
        color: #94a3b8;
        border-bottom-color: #1e293b;
      }

      td {
        border-bottom-color: #1e293b;
        color: #cbd5e1;
      }

      tbody tr:hover td {
        background: rgba(255, 255, 255, 0.015);
      }
    }

    .bid-id-cell .id-txt {
      color: #38bdf8;
    }

    .client-details {
      .c-name {
        color: #ffffff;
      }
      .p-title {
        color: #64748b;
      }
    }

    .valuation-cell .amt-txt {
      color: #ffffff;
    }

    .date-cell .dt-txt {
      color: #94a3b8;
    }

    .status-badge {
      &.completed {
        background: rgba(16, 185, 129, 0.2);
        color: #34d399;
      }
      &.in-progress {
        background: rgba(59, 130, 246, 0.2);
        color: #60a5fa;
      }
      &.under-bidding {
        background: rgba(245, 158, 11, 0.2);
        color: #fbbf24;
      }
      &.review {
        background: rgba(245, 158, 11, 0.2);
        color: #fbbf24;
      }
      &.draft {
        background: rgba(71, 85, 105, 0.2);
        color: #cbd5e1;
      }
    }

    .btn-action {
      background: #020617;
      border-color: #1e293b;
      color: #94a3b8;

      &:hover {
        background: #1e293b;
        color: #ffffff;
        border-color: #334155;
      }

      &.download:hover {
        background: rgba(16, 185, 129, 0.15);
        color: #34d399;
        border-color: rgba(16, 185, 129, 0.25);
      }

      &.edit:hover {
        background: rgba(245, 158, 11, 0.15);
        color: #fbbf24;
        border-color: rgba(245, 158, 11, 0.25);
      }

      &.view:hover {
        background: rgba(56, 189, 248, 0.15);
        color: #38bdf8;
        border-color: rgba(56, 189, 248, 0.25);
      }
    }

    .empty-state-box {
      .empty-icon-box {
        background: #020617;
        color: #64748b;
        border-color: #1e293b;
      }
      h4 {
        color: #ffffff;
      }
      p {
        color: #64748b;
      }
      .btn-clear {
        background: #38bdf8;
        color: #020617;
        
        &:hover {
          background: #7dd3fc;
        }
      }
    }
  }

  /* MODAL OVERLAY & CONTAINER */
  .view-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(8px);
    z-index: 1000;
    animation: fadeInModal 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .view-modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--white);
    border: 1px solid var(--grey-200);
    border-radius: 12px;
    width: 95%;
    max-width: 1100px;
    height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    animation: modalZoomIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  /* Modal Header styling */
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 2rem;
    background: var(--primary-600);
    color: #ffffff;
    border-bottom: 1.5px solid rgba(255, 255, 255, 0.08);

    .modal-title-box {
      display: flex;
      align-items: center;
      gap: 1.25rem;

      .bid-badge {
        display: inline-block;
        font-size: 0.85rem;
        font-weight: 800;
        letter-spacing: 0.05em;
        background: rgba(255, 255, 255, 0.15);
        color: #ffffff;
        padding: 0.35rem 0.75rem;
        border-radius: 4px;
        font-family: monospace;
      }
      
      h3 {
        font-size: 1.5rem;
        font-weight: 800;
        margin: 0;
        color: #ffffff;
      }
      
      .company-subtitle {
        font-size: 0.95rem;
        color: rgba(255, 255, 255, 0.75);
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-weight: 600;
        
        .ico {
          font-size: 1rem;
        }
      }
    }

    .close-modal-btn {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.7);
      font-size: 2.2rem;
      line-height: 0.8;
      cursor: pointer;
      padding: 0;
      transition: all 0.2s;
      
      &:hover {
        color: #ffffff;
        transform: scale(1.1);
      }
    }
  }

  /* Modal Scrollable Body */
  .modal-body {
    padding: 2rem;
    overflow-y: auto;
    background: var(--background);
    flex: 1;

    /* Sleek Custom Scrollbar */
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--grey-300);
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: var(--grey-400);
    }
    
    /* Firefox */
    scrollbar-width: thin;
    scrollbar-color: var(--grey-300) transparent;
  }

  /* Two Column Layout */
  .modal-content-grid {
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 2rem;
    align-items: start;
    
    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .modal-column {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* Card Layout */
  .modal-card {
    background: var(--white);
    border: 1px solid var(--grey-200);
    border-radius: 12px;
    box-shadow: var(--shadow-2);
    overflow: hidden;
    
    &.HighlightCard {
      border-color: var(--primary-200);
      box-shadow: 0 4px 20px rgba(3, 24, 56, 0.05);
    }
  }

  .modal-card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.1rem 1.5rem;
    background: var(--grey-50);
    border-bottom: 1px solid var(--grey-200);
    
    &.space-between {
      justify-content: space-between;
    }

    .header-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .ico {
      font-size: 1.1rem;
      color: var(--primary-600);
    }

    h4 {
      font-size: 0.95rem;
      font-weight: 750;
      color: var(--primary-900);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0;
    }

    .modal-total-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: var(--primary-600);
      color: #ffffff;
      padding: 0.4rem 0.85rem;
      border-radius: var(--radius);
      font-size: 0.8rem;
      font-weight: 700;

      .val {
        font-size: 1rem;
        font-weight: 850;
      }
    }
  }

  .modal-card-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.15rem;
    
    &.scope-body {
      gap: 1.25rem;
    }
  }

  /* Form Elements in View Mode */
  .modal-field-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    label {
      font-size: 0.72rem;
      text-transform: uppercase;
      font-weight: 750;
      color: var(--grey-500);
      letter-spacing: 0.5px;
    }

    .field-val {
      font-size: 0.95rem;
      color: var(--grey-800);
      font-weight: 600;
      padding: 0.4rem 0;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      min-height: auto;

      &.bold {
        font-weight: 800;
        color: var(--grey-900);
        font-size: 1.05rem;
      }

      &.highlight {
        color: var(--primary-600);
        font-weight: 850;
        font-family: monospace;
        font-size: 1.15rem;
      }

      &.address {
        line-height: 1.4;
        align-items: flex-start;
        min-height: auto;
      }
      
      .field-ico {
        font-size: 1rem;
        color: var(--primary-500);
      }
    }
  }

  .modal-field-row {
    display: flex;
    gap: 1.15rem;
    
    > div {
      flex: 1;
    }
  }

  /* Scope text blocks */
  .scope-box {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    label {
      font-size: 0.75rem;
      font-weight: 750;
      color: var(--primary-900);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .scope-text {
      font-size: 0.92rem;
      color: var(--grey-800);
      padding: 0.3rem 0 0.8rem 0;
      white-space: pre-line;
      line-height: 1.5;
      
      &.remark-text {
        color: var(--grey-700);
        font-style: italic;
        padding-left: 0.75rem;
        border-left: 3px solid var(--primary-400);
      }
    }
  }

  /* Step table inside modal */
  .modal-table-wrapper {
    border: 1px solid var(--grey-200);
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--shadow-1);
  }

  .modal-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;

    th {
      background: var(--grey-50);
      color: var(--grey-700);
      font-weight: 750;
      padding: 0.65rem 0.9rem;
      text-align: left;
      border-bottom: 1.5px solid var(--grey-200);
      text-transform: uppercase;
      font-size: 0.72rem;
      letter-spacing: 0.5px;
    }

    td {
      padding: 0.6rem 0.9rem;
      border-bottom: 1px solid var(--grey-100);
      color: var(--grey-800);
      font-weight: 550;
      
      &.step-name {
        font-weight: 600;
        color: var(--primary-900);
      }
    }

    .totals-row td {
      background: var(--grey-50);
      border-top: 1.5px solid var(--grey-200);
      border-bottom: none;
      padding: 0.75rem 0.9rem;
      font-weight: 750;
    }

    .no-steps {
      text-align: center;
      color: var(--grey-400);
      padding: 1.5rem;
      font-style: italic;
    }
  }

  /* Modal Footer */
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: var(--white);
    border-top: 1.5px solid var(--grey-200);

    .btn-modal-action {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.5rem;
      border-radius: var(--radius);
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &.close {
        background: transparent;
        border: 1.5px solid var(--grey-300);
        color: var(--grey-700);
        
        &:hover {
          background: var(--grey-100);
          color: var(--grey-900);
          border-color: var(--grey-400);
        }
      }

      &.download {
        background: var(--primary-600);
        border: 1.5px solid var(--primary-600);
        color: #ffffff;
        box-shadow: 0 4px 10px rgba(3, 24, 56, 0.15);
        
        &:hover {
          background: var(--primary-700);
          border-color: var(--primary-700);
          transform: translateY(-1px);
          box-shadow: 0 6px 14px rgba(3, 24, 56, 0.2);
        }
      }
    }
  }

  /* Dark Theme Overrides for Modal */
  body.dark-theme & {
    .view-modal-overlay {
      background: rgba(2, 6, 23, 0.85);
    }

    .view-modal-content {
      background: #0f172a;
      border-color: #1e293b;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    }

    .modal-header {
      background: #020617;
      border-bottom-color: #1e293b;
      
      .modal-title-box {
        .bid-badge {
          background: rgba(255, 255, 255, 0.08);
        }
        .company-subtitle {
          color: #94a3b8;
        }
      }
    }

    .modal-body {
      background: #020617;
      
      &::-webkit-scrollbar-thumb {
        background: #334155;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: #475569;
      }
      scrollbar-color: #334155 transparent;
    }

    .modal-card {
      background: #0f172a;
      border-color: #1e293b;
      
      &.HighlightCard {
        border-color: rgba(56, 189, 248, 0.25);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }
    }

    .modal-card-header {
      background: #1e293b;
      border-bottom-color: #334155;
      
      .ico {
        color: #38bdf8;
      }
      
      h4 {
        color: #38bdf8;
      }

      .modal-total-badge {
        background: #38bdf8;
        color: #020617;
      }
    }

    .modal-field-group {
      label {
        color: #64748b;
      }
      
      .field-val {
        background: transparent;
        border-color: transparent;
        color: #cbd5e1;

        &.bold {
          color: #ffffff;
        }

        &.highlight {
          background: transparent;
          border-color: transparent;
          color: #38bdf8;
        }
      }
    }

    .scope-box {
      label {
        color: #38bdf8;
      }
      
      .scope-text {
        background: transparent;
        border-color: transparent;
        color: #cbd5e1;
        
        &.remark-text {
          border-left-color: #38bdf8;
        }
      }
    }

    .modal-table-wrapper {
      border-color: #1e293b;
    }

    .modal-table {
      th {
        background: #1e293b;
        color: #cbd5e1;
        border-bottom-color: #334155;
      }
      td {
        border-bottom-color: #1e293b;
        color: #94a3b8;
        
        &.step-name {
          color: #ffffff;
        }
      }
      
      .totals-row td {
        background: #1e293b;
        border-top-color: #334155;
        color: #cbd5e1;
      }
    }

    .modal-footer {
      background: #0f172a;
      border-top-color: #1e293b;
      
      .btn-modal-action.close {
        border-color: #334155;
        color: #94a3b8;
        
        &:hover {
          background: #1e293b;
          color: #ffffff;
          border-color: #475569;
        }
      }

      .btn-modal-action.download {
        background: #38bdf8;
        border-color: #38bdf8;
        color: #020617;
        
        &:hover {
          background: #7dd3fc;
          border-color: #7dd3fc;
        }
      }
    }
  }

  /* ANIMATIONS */
  @keyframes fadeInModal {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes modalZoomIn {
    from {
      opacity: 0;
      transform: translate(-50%, -45%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

export default Invoices;
