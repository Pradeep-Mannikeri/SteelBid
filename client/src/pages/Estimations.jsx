import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaSearch,
  FaFilter,
  FaDownload,
  FaTrash,
  FaEdit,
  FaEye,
  FaTimes,
  FaBuilding,
  FaTools,
  FaCalendarAlt,
} from "react-icons/fa";
import { EstimationContext } from "../context/EstimationContext";

const Estimations = () => {
  const navigate = useNavigate();
  const contextValue = useContext(EstimationContext) || {
    estimations: [],
    companies: [],
    addEstimation: () => {},
    updateEstimation: () => {},
    deleteEstimation: () => {}
  };
  const { estimations, companies, addEstimation, updateEstimation, deleteEstimation } = contextValue;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [bidFormData, setBidFormData] = useState({
    projectType: "Structural project",
    projectName: "",
    memberQuantity: "",
    companyId: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All");

  const filteredEstimations = estimations.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      item.id.toLowerCase().includes(searchLower) || 
      item.companyName.toLowerCase().includes(searchLower);
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    const itemMonth = item.date ? item.date.split("-")[1] : "";
    const matchesMonth = monthFilter === "All" || itemMonth === monthFilter;
    return matchesSearch && matchesStatus && matchesMonth;
  });

  const sortedEstimations = [...filteredEstimations].sort((a, b) => new Date(b.date) - new Date(a.date));

  const getCompanyHistory = (companyName) => {
    const years = [2024, 2025, 2026];
    const len = companyName ? companyName.length : 5;
    const fallbackValues = {
      2024: 45000 + len * 5000,
      2025: 60000 + len * 8000,
      2026: 85000 + len * 10000,
    };
    return years.map(year => {
      const dbTotal = estimations
        .filter(e => e.companyName === companyName && e.date && e.date.includes(year.toString()))
        .reduce((sum, e) => sum + (e.price || 0), 0);
      return { year, value: dbTotal > 0 ? dbTotal : fallbackValues[year] };
    });
  };

  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    fullAddress: "",
    contactNumber: "",
    email: "",
    status: "Under Bidding",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveClient = (e) => {
    e.preventDefault();
    const newEst = {
      id: "SDLLCE-" + Math.floor(100000 + Math.random() * 900000),
      companyName: formData.companyName || "N/A",
      location: formData.location || "N/A",
      fullAddress: formData.fullAddress || "",
      contactNumber: formData.contactNumber || "N/A",
      email: formData.email || "N/A",
      project: "Unnamed Project",
      date: new Date().toISOString().split("T")[0],
      hours: 0,
      price: 0,
      status: formData.status,
    };
    addEstimation(newEst);
    setIsModalOpen(false);
    setFormData({
      companyName: "",
      location: "",
      fullAddress: "",
      contactNumber: "",
      email: "",
      status: "Under Bidding",
    });
  };

  const handleDeleteOpen = (clientObj) => {
    setItemToDelete(clientObj);
    setIsDeleteModalOpen(true);
  };

  const handleBidOpen = (clientObj) => {
    setSelectedClient(clientObj);
    setBidFormData(prev => ({ ...prev, companyId: clientObj.id }));
    setIsBidModalOpen(true);
  };

  const handleBidChange = (e) => {
    setBidFormData({ ...bidFormData, [e.target.name]: e.target.value });
  };

  const handleCreateBid = (e) => {
    e.preventDefault();
    setIsBidModalOpen(false);

    const clientToUse = selectedClient || companies.find(c => c._id === bidFormData.companyId);

    // Navigate to create estimation page with all data
    navigate("/dashboard/estimations/create", {
      state: {
        client: clientToUse,
        bidDetails: {
          ...bidFormData,
          date: new Date().toISOString().split("T")[0],
          time: new Date().toLocaleTimeString(),
        },
      },
    });

    // Reset bid form
    setBidFormData({
      projectType: "Structural project",
      projectName: "",
      memberQuantity: "",
      companyId: "",
    });
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteEstimation(itemToDelete.id);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleEditOpen = (clientObj) => {
    setSelectedClient({ ...clientObj });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setSelectedClient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    updateEstimation(selectedClient.id, selectedClient);
    setIsEditModalOpen(false);
  };

  const handleViewOpen = (clientObj) => {
    setSelectedClient(clientObj);
    setIsViewModalOpen(true);
  };

  return (
    <Wrapper>
      <div className="header">
        <div>
          <h3>Estimation Repository</h3>
          <p className="subtitle">Manage and track your project estimations below.</p>
        </div>
        <div className="actions">
          <div className="filter-container">
            <FaCalendarAlt />
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
            >
              <option value="All">All Months</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <div className="filter-container">
            <FaFilter />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          <div className="search-container">
            <FaSearch />
            <input 
              type="text" 
              placeholder="Search by ID or Company..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn main-btn" onClick={() => {
            setSelectedClient(null);
            setBidFormData({
              projectType: "Structural project",
              projectName: "",
              memberQuantity: "",
              companyId: "",
            });
            setIsBidModalOpen(true);
          }}>
            Create New Bid
          </button>
        </div>
      </div>

      <div className="table-card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Company ID</th>
                <th>Company Name</th>
                <th>Job ID</th>
                <th>Project</th>
                <th>Date</th>
                <th>Quoted Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedEstimations.map((item) => (
                <tr key={item.id}>
                  <td className="job-id">{item.id.replace(/\D/g, '')}</td>
                  <td title={item.companyName}>
                    {item.companyName && item.companyName.length > 19
                      ? item.companyName.slice(0, 19) + "..."
                      : item.companyName || "N/A"}
                  </td>
                  <td className="job-id">{item.id}</td>
                  <td className="project-name" title={item.project}>
                    {item.project && item.project.length > 20
                      ? item.project.slice(0, 20) + "..."
                      : item.project || "N/A"}
                  </td>
                  <td>{item.date || "N/A"}</td>
                  <td className="price">${item.price?.toLocaleString() || 0}</td>
                  <td>
                    <span
                      className={`status ${item.status?.toLowerCase().replace(" ", "-") || "draft"}`}
                    >
                      {item.status || "Draft"}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button
                        className="icon-btn view"
                        onClick={() => handleViewOpen(item)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="icon-btn edit"
                        onClick={() => handleEditOpen(item)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="icon-btn delete"
                        onClick={() => handleDeleteOpen(item)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ModalOverlay>
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <h3>Add New Company</h3>
                <p>
                  Enter the company and project details to start a new
                  estimation.
                </p>
              </div>
              <button
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSaveClient}>
              <div className="modal-body">
                <div className="form-grid">


                  <div className="form-group">
                    <label>Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Steel Bid LLC"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. New York, NY"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Address</label>
                    <textarea
                      name="fullAddress"
                      value={formData.fullAddress || ""}
                      onChange={handleChange}
                      placeholder="Enter full address"
                      rows="2"
                    />
                  </div>

                  <div className="form-group">
                    <label>Contact Number</label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="e.g. +1 123 456 7890"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email ID</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label>Initial Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Under Bidding">Under Bidding</option>
                      <option value="Draft">Draft</option>
                      <option value="Review">Review</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn outline-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn main-btn">
                  Save Company
                </button>
              </div>
            </form>
          </div>
        </ModalOverlay>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedClient && (
        <ModalOverlay>
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <h3>Edit Company</h3>
                <p>Update information for {selectedClient.id}</p>
              </div>
              <button
                className="close-btn"
                onClick={() => setIsEditModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleEditSave}>
              <div className="modal-body">
                <div className="form-grid">

                  <div className="form-group">
                    <label>Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={selectedClient.companyName}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={selectedClient.location || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Address</label>
                    <textarea
                      name="fullAddress"
                      value={selectedClient.fullAddress || ""}
                      onChange={handleEditChange}
                      rows="2"
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={selectedClient.contactNumber}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email ID</label>
                    <input
                      type="email"
                      name="email"
                      value={selectedClient.email}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={selectedClient.status}
                      onChange={handleEditChange}
                    >
                      <option value="Under Bidding">Under Bidding</option>
                      <option value="Draft">Draft</option>
                      <option value="Review">Review</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn outline-btn"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn main-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </ModalOverlay>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedClient && (
        <ModalOverlay>
          <div className="modal-card view-modal">
            <div className="modal-header">
              <div>
                <h3>Estimation Details</h3>
                <p>
                  {selectedClient.project} &mdash; {selectedClient.companyName} ({selectedClient.id})
                </p>
              </div>
              <button
                className="close-btn"
                onClick={() => setIsViewModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">

                <div className="detail-item">
                  <label>Company Name</label>
                  <p>{selectedClient.companyName}</p>
                </div>
                <div className="detail-item">
                  <label>Location</label>
                  <p>{selectedClient.location || "N/A"}</p>
                </div>
                <div className="detail-item full-width">
                  <label>Address</label>
                  <p>{selectedClient.fullAddress || "N/A"}</p>
                </div>
                <div className="detail-item">
                  <label>Contact Number</label>
                  <p>{selectedClient.contactNumber || "N/A"}</p>
                </div>
                <div className="detail-item">
                  <label>Email ID</label>
                  <p>{selectedClient.email || "N/A"}</p>
                </div>

                <div className="detail-item">
                  <label>Status</label>
                  <p>
                    <span
                      className={`status ${selectedClient.status.toLowerCase().replace(" ", "-")}`}
                    >
                      {selectedClient.status}
                    </span>
                  </p>
                </div>
                <div className="detail-item">
                  <label>Total Earning</label>
                  <p className="price">
                    ${selectedClient.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="chart-section">
                <h4>Business History (Revenue per Year)</h4>
                <div className="css-bar-chart">
                  {getCompanyHistory(selectedClient.companyName).map((data, idx, arr) => {
                    const maxVal = Math.max(...arr.map((d) => d.value), 1);
                    const heightPercent = Math.max(
                      (data.value / maxVal) * 100,
                      10,
                    );
                    return (
                      <div className="bar-group" key={data.year}>
                        <div className="bar-track">
                          <div
                            className="bar-fill"
                            style={{
                              height: `${heightPercent}%`,
                              animationDelay: `${idx * 0.15}s`,
                            }}
                          >
                            <span className="tooltip">
                              ${data.value.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <span className="bar-label">{data.year}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn cancel-btn"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && itemToDelete && (
        <ModalOverlay onClick={() => setIsDeleteModalOpen(false)}>
          <div
            className="modal-card delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h3 style={{ color: "#dc2626" }}>Confirm Delete</h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.9rem",
                    color: "var(--grey-500)",
                  }}
                >
                  Destructive Action
                </p>
              </div>
              <button
                className="close-btn"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <p
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "1rem",
                  color: "var(--grey-800)",
                }}
              >
                Are you sure you want to delete{" "}
                <strong style={{ color: "var(--primary-600)" }}>
                  {itemToDelete.companyName}
                </strong>
                ?
              </p>
              <div
                style={{
                  padding: "1rem",
                  background: "var(--grey-50)",
                  borderRadius: "8px",
                  borderLeft: "4px solid #dc2626",
                  color: "var(--grey-600)",
                  fontSize: "0.9rem",
                }}
              >
                This action cannot be undone. All estimation history for this
                company will be permanently removed from the Steel Bid database.
              </div>
            </div>
            <div className="modal-footer" style={{ marginTop: "2rem" }}>
              <button
                className="btn outline-btn"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn danger-btn" onClick={confirmDelete}>
                Delete Permanently
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* New Bid Creation Modal */}
      {isBidModalOpen && (
        <ModalOverlay>
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <h3>Create New Bid</h3>
                <p>Setup project details for {selectedClient ? selectedClient.companyName : "a new bid"}</p>
              </div>
              <button
                className="close-btn"
                onClick={() => setIsBidModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleCreateBid}>
              <div className="modal-body">
                <div className="form-grid">
                  {!selectedClient && (
                    <div className="form-group full-width">
                      <label>Select Company</label>
                      <select
                        name="companyId"
                        value={bidFormData.companyId}
                        onChange={handleBidChange}
                        required
                        style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--grey-300)", outline: "none", fontSize: "0.95rem", width: "100%", background: "var(--input-bg)", color: "var(--grey-900)" }}
                      >
                        <option value="">-- Select a Company --</option>
                        {companies.map(c => (
                          <option key={c._id} value={c._id}>
                            {c.companyName} ({c._id ? c._id.slice(-6).toUpperCase() : ""})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

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
                        />
                        <div className="option-content">
                          <FaBuilding />
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
                        />
                        <div className="option-content">
                          <FaTools />
                          <span>Miscellaneous project</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label>Project Name</label>
                    <input
                      type="text"
                      name="projectName"
                      value={bidFormData.projectName}
                      onChange={handleBidChange}
                      placeholder="e.g. Riverside Commercial Plaza"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Member Quantity</label>
                    <input
                      type="number"
                      name="memberQuantity"
                      value={bidFormData.memberQuantity}
                      onChange={handleBidChange}
                      placeholder="e.g. 150"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Auto-Set Info</label>
                    <div className="auto-info">
                      <span>{new Date().toLocaleDateString()}</span>
                      <span className="dot">•</span>
                      <span>
                        {new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn outline-btn"
                  onClick={() => setIsBidModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn main-btn">
                  Continue to Calculator
                </button>
              </div>
            </form>
          </div>
        </ModalOverlay>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  font-family: "Roboto", sans-serif;

  input, select, textarea, button {
    font-family: "Roboto", sans-serif;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  h3 {
    font-size: 1.8rem;
    color: var(--grey-900);
    margin: 0;
  }

  .subtitle {
    color: var(--grey-700);
    margin-top: 0.5rem;
    font-size: 0.95rem;
  }

  .actions {
    display: flex;
    gap: 1rem;
    align-items: stretch;
    height: 38px;
  }

  .actions .btn {
    display: flex;
    align-items: center;
    padding: 0 1.2rem;
    margin: 0;
    font-size: 0.85rem;
  }

  .filter-container {
    background: var(--white);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0 1rem;
    border-radius: var(--radius);
    border: 1px solid var(--grey-200);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover, &:focus-within {
      border-color: #031838;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    svg {
      color: #031838;
      font-size: 1rem;
    }
    
    select {
      border: none;
      outline: none;
      background: transparent;
      font-family: inherit;
      color: var(--grey-900);
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      height: 100%;
    }
  }

  .search-container {
    background: var(--white);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0 1.2rem;
    border-radius: var(--radius);
    border: 1px solid var(--grey-200);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    width: 300px;
    transition: all 0.3s ease;

    &:hover, &:focus-within {
      border-color: #031838;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    svg {
      color: #031838;
      font-size: 1rem;
    }
    
    input {
      border: none;
      outline: none;
      width: 100%;
      font-family: inherit;
      color: var(--grey-900);
      background: transparent;
      font-size: 0.85rem;
      height: 100%;
    }
  }

  .table-card {
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--shadow-2);
    overflow: hidden;
    border: 1px solid var(--grey-100);
  }

  .table-container {
    overflow-x: auto;
    width: 100%;
    scrollbar-width: thin;
    scrollbar-color: var(--grey-300) transparent;

    &::-webkit-scrollbar {
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--grey-300);
      border-radius: 4px;
    }
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    white-space: nowrap;
    font-size: 0.93rem;

    th {
      padding: 1.25rem 1.5rem;
      background: var(--grey-50);
      color: var(--grey-700);
      font-weight: 600;
      font-size: 0.83rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid var(--grey-200);
    }

    tbody tr {
      transition: background-color 0.2s ease;
      &:hover {
        background-color: var(--grey-50);
      }
    }

    td {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--grey-100);
      color: var(--grey-800);
      font-size: inherit;
      vertical-align: middle;
    }

    .location {
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .job-id {
      font-weight: 600;
      color: var(--primary-600);
    }

    .dark-theme & .job-id {
      color: #ffffff;
    }

    .price {
      font-weight: 600;
      color: var(--grey-900);
    }
  }

  .status {
    padding: 0.35rem 0.8rem;
    border-radius: 5px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .status.completed {
    background: #d1fae5;
    color: #065f46;
  }
  .status.in-progress {
    background: #dbeafe;
    color: #1e40af;
  }
  .status.review {
    background: #fef3c7;
    color: #92400e;
  }
  .status.draft {
    background: #f1f5f9;
    color: #475569;
  }
  .status.under-bidding {
    background: #ede9fe;
    color: #5b21b6;
  }

  .action-btns {
    display: flex;
    gap: 0.5rem;
  }

  .icon-btn {
    width: 32px;
    height: 32px;
    border-radius: 5px;
    border: none;
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: var(--transition);
    font-size: 1rem;

    &.view {
      background: #eff6ff;
      color: #2563eb;
      &:hover {
        background: #2563eb;
        color: white;
      }
    }
    &.edit {
      background: #f0fdf4;
      color: #16a34a;
      &:hover {
        background: #16a34a;
        color: white;
      }
    }
    &.delete {
      background: #fef2f2;
      color: #dc2626;
      &:hover {
        background: #dc2626;
        color: white;
      }
    }
  }

  body.dark-theme & {
    .status.completed {
      background: rgba(6, 95, 70, 0.3);
      color: #34d399;
    }
    .status.in-progress {
      background: rgba(30, 64, 175, 0.3);
      color: #60a5fa;
    }
    .status.review {
      background: rgba(146, 64, 14, 0.3);
      color: #fbbf24;
    }
    .status.draft {
      background: rgba(71, 85, 105, 0.3);
      color: #94a3b8;
    }
    .status.under-bidding {
      background: rgba(91, 33, 182, 0.3);
      color: #a78bfa;
    }

    .icon-btn {
      &.view {
        background: rgba(37, 99, 235, 0.2);
        color: #60a5fa;
        &:hover {
          background: #2563eb;
          color: white;
        }
      }
      &.edit {
        background: rgba(22, 163, 74, 0.2);
        color: #4ade80;
        &:hover {
          background: #16a34a;
          color: white;
        }
      }
      &.delete {
        background: rgba(220, 38, 38, 0.2);
        color: #f87171;
        &:hover {
          background: #dc2626;
          color: white;
        }
      }
    }

    .btn,
    .secondary-btn,
    .cancel-btn,
    .save-btn {
      color: #ffffff !important;
    }
  }

  .secondary-btn {
    background: var(--white);
    color: var(--grey-700);
    border: 1px solid var(--grey-200);
    box-shadow: var(--shadow-1);
    &:hover {
      background: var(--grey-50);
      border-color: var(--grey-300);
    }
  }
`;

const ModalOverlay = styled.div`
  font-family: "Roboto", sans-serif;

  input, select, textarea, button {
    font-family: "Roboto", sans-serif;
  }

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  z-index: 1000;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .modal-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--white);
    width: 90%;
    max-width: 650px;
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    animation: modalZoomIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--grey-100);
    background: var(--grey-50);

    h3 {
      font-size: 1.4rem;
      color: var(--grey-900);
      margin: 0;
    }

    p {
      color: var(--grey-600);
      font-size: 0.9rem;
      margin-top: 0.25rem;
      margin-bottom: 0;
    }

    .close-btn {
      background: transparent;
      border: none;
      font-size: 1.2rem;
      color: var(--grey-500);
      cursor: pointer;
      transition: all 0.2s;
      display: grid;
      place-items: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      &:hover {
        color: var(--grey-900);
        background: var(--grey-200);
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
    color: var(--grey-700);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  input,
  select,
  textarea {
    padding: 0.75rem 1rem;
    border-radius: var(--radius);
    border: 1px solid var(--grey-200);
    background: var(--grey-50);
    color: var(--grey-900);
    font-family: inherit;
    font-size: 0.95rem;
    transition: all 0.2s;
    outline: none;

    &:focus {
      border-color: var(--primary-500);
      background: var(--white);
      box-shadow: 0 0 0 3px var(--primary-100);
    }
  }

  textarea {
    resize: vertical;
  }

  .modal-footer {
    padding: 1.25rem 2rem;
    border-top: 1px solid var(--grey-100);
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    background: var(--grey-50);

    .btn {
      padding: 0.6rem 1.5rem;
      border-radius: var(--radius);
      font-weight: 500;
      transition: all 0.2s;
      cursor: pointer;
    }

    .cancel-btn {
      background: var(--white);
      border: 1px solid var(--grey-300);
      color: var(--grey-700);
      &:hover {
        background: var(--grey-50);
        border-color: var(--grey-400);
      }
    }

    .save-btn {
      background: var(--primary-600);
      border: 1px solid var(--primary-600);
      color: #ffffff;
      &:hover {
        background: var(--primary-700);
        border-color: var(--primary-700);
      }
    }
  }

  /* View Modal & Chart Styles */
  .view-modal {
    max-width: 700px !important;
  }

  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .detail-item {
    background: var(--grey-50);
    padding: 1rem 1.25rem;
    border-radius: var(--radius);
    border: 1px solid var(--grey-100);

    &.full-width {
      grid-column: 1 / -1;
    }

    label {
      display: block;
      margin-bottom: 0.25rem;
      font-size: 0.75rem;
      color: var(--grey-500);
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    p {
      margin: 0;
      color: var(--grey-900);
      font-weight: 500;
      font-size: 1rem;
    }

    .price {
      color: var(--primary-600);
      font-weight: 700;
      font-size: 1.1rem;
    }

    body.dark-theme & {
      .price {
        color: #60a5fa;
      }
    }
  }

  .chart-section {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--grey-200);

    h4 {
      font-size: 1.1rem;
      color: var(--grey-800);
      margin-bottom: 1.5rem;
      text-align: center;
    }
  }

  .css-bar-chart {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    height: 180px;
    padding: 1rem 0;
    max-width: 500px;
    margin: 0 auto;
  }

  .bar-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 60px;
  }

  .bar-track {
    width: 45px;
    height: 140px;
    background: var(--grey-100);
    border-radius: 5px;
    display: flex;
    align-items: flex-end;
    position: relative;
  }

  .bar-fill {
    width: 100%;
    background: linear-gradient(
      180deg,
      var(--primary-400) 0%,
      var(--primary-600) 100%
    );
    border-radius: 5px;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    animation: growUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;

    &:hover {
      filter: brightness(1.1);

      .tooltip {
        opacity: 1;
        transform: translateY(-10px) translateX(-50%);
        visibility: visible;
      }
    }
  }

  @keyframes growUp {
    from {
      height: 0;
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .tooltip {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateY(0) translateX(-50%);
    background: var(--grey-900);
    color: white;
    padding: 0.35rem 0.6rem;
    border-radius: 5px;
    font-size: 0.75rem;
    font-weight: 600;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    white-space: nowrap;
    z-index: 10;

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 4px 4px 0;
      border-style: solid;
      border-color: var(--grey-900) transparent transparent transparent;
    }
  }

  .bar-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--grey-600);
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
      border: 2px solid var(--grey-200);
      border-radius: 10px;
      transition: all 0.3s;
      background: var(--white);

      svg {
        font-size: 1.5rem;
        color: var(--grey-400);
      }

      span {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--grey-600);
        text-align: center;
      }
    }

    &:hover .option-content {
      border-color: var(--primary-300);
      background: var(--primary-50);
    }

    &.active .option-content {
      border-color: var(--primary-600);
      background: var(--primary-600);
      box-shadow: 0 4px 12px rgba(3, 24, 56, 0.2);

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
    background: var(--grey-100);
    border-radius: 8px;
    color: var(--grey-600);
    font-weight: 500;
    font-size: 0.9rem;

    .dot {
      color: var(--grey-400);
    }
  }
`;

export default Estimations;
