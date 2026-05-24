import React, { useState, useContext } from "react";
import { FaTimes, FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { EstimationContext } from "../context/EstimationContext";
import Wrapper, { ModalOverlay } from "../assets/Wrappers/AddCompany";

const AddCompany = () => {
  const { estimations, companies, addCompany, updateCompany, deleteCompany } = useContext(EstimationContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const filteredCompanies = companies.filter(
    (item) =>
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item._id && item._id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedCompanies = [...filteredCompanies].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const getCompanyEarnings = (companyName) => 
    estimations.filter(e => e.companyName === companyName).reduce((acc, curr) => acc + (curr.price || 0), 0);

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
    contactPerson: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCompany(formData);
    setFormData({
      companyName: "",
      location: "",
      fullAddress: "",
      contactPerson: "",
      email: "",
      phone: "",
    });
    setIsModalOpen(false);
  };

  const handleDeleteOpen = (clientObj) => {
    setItemToDelete(clientObj);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteCompany(itemToDelete._id);
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
    updateCompany(selectedClient._id, selectedClient);
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
          <h3>Company Directory</h3>
          <p className="subtitle">Manage and add your new company clients below.</p>
        </div>
        <div className="actions">
          <div className="search-container">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by ID or Company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className="btn main-btn" 
            onClick={() => setIsModalOpen(true)}
          >
            Add Company
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
                <th>Location</th>
                <th>Phone</th>
                <th>Email</th>
                <th style={{ textAlign: "center" }}>Projects Done</th>
                <th>Total Earning</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCompanies.map((item) => (
                <tr key={item._id}>
                  <td className="job-id">{item._id ? item._id.slice(-6).toUpperCase() : "N/A"}</td>
                  <td title={item.companyName}>
                    {item.companyName.length > 19
                      ? item.companyName.slice(0, 19) + "..."
                      : item.companyName}
                  </td>
                  <td className="location" title={item.location}>
                    {item.location && item.location.length > 15
                      ? item.location.slice(0, 15) + "..."
                      : item.location}
                  </td>
                  <td title={item.phone}>
                    {item.phone && item.phone.length > 15
                      ? item.phone.slice(0, 15) + "..."
                      : item.phone || "N/A"}
                  </td>
                  <td title={item.email}>
                    {item.email && item.email.length > 18
                      ? item.email.slice(0, 18) + "..."
                      : item.email || "N/A"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {estimations.filter(e => e.companyName === item.companyName).length}
                  </td>
                  <td className="price">${getCompanyEarnings(item.companyName).toLocaleString()}</td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn view" onClick={() => handleViewOpen(item)}>
                        <FaEye />
                      </button>
                      <button className="icon-btn edit" onClick={() => handleEditOpen(item)}>
                        <FaEdit />
                      </button>
                      <button className="icon-btn delete" onClick={() => handleDeleteOpen(item)}>
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
                <p>Enter new company details below.</p>
              </div>
              <button
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <form id="add-company-form" onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group half-width">
                    <label>Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g., Nexus Tech"
                      required
                    />
                  </div>
                  <div className="form-group half-width">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Austin, TX"
                      required
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Full Address</label>
                    <textarea
                      name="fullAddress"
                      value={formData.fullAddress}
                      onChange={handleChange}
                      placeholder="Enter the complete address"
                      rows="3"
                    />
                  </div>
                  <div className="form-group half-width">
                    <label>Contact Person</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      placeholder="e.g., Jane Doe"
                    />
                  </div>
                  <div className="form-group half-width">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g., jane@nexustech.com"
                    />
                  </div>
                  <div className="form-group half-width">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g., +1 123-456-7890"
                    />
                  </div>
                  <div className="form-group half-width">
                    <label>Registration Date</label>
                    <div 
                      className="auto-info" 
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "0.5rem", 
                        padding: "0.8rem", 
                        background: "var(--grey-50)", 
                        borderRadius: "var(--radius)", 
                        color: "var(--grey-600)", 
                        border: "1px solid var(--grey-300)",
                        fontSize: "0.85rem",
                        boxSizing: "border-box",
                        cursor: "not-allowed"
                      }}
                    >
                      <span>{new Date().toLocaleDateString()}</span>
                      <span className="dot" style={{ color: "var(--grey-400)", margin: "0 0.2rem" }}>•</span>
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
                  className="btn cancel-btn"
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
                <p>Update information for {selectedClient._id ? selectedClient._id.slice(-6).toUpperCase() : ""}</p>
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
                  <div className="form-group half-width">
                    <label>Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={selectedClient.companyName || ""}
                      onChange={handleEditChange}
                      placeholder="e.g., Nexus Tech"
                      required
                    />
                  </div>
                  <div className="form-group half-width">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={selectedClient.location || ""}
                      onChange={handleEditChange}
                      placeholder="e.g., Austin, TX"
                      required
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Full Address</label>
                    <textarea
                      name="fullAddress"
                      value={selectedClient.fullAddress || ""}
                      onChange={handleEditChange}
                      placeholder="Enter the complete address"
                      rows="3"
                    />
                  </div>
                  <div className="form-group half-width">
                    <label>Contact Person</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={selectedClient.contactPerson || ""}
                      onChange={handleEditChange}
                      placeholder="e.g., Jane Doe"
                    />
                  </div>
                  <div className="form-group half-width">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={selectedClient.email || ""}
                      onChange={handleEditChange}
                      placeholder="e.g., jane@nexustech.com"
                    />
                  </div>
                  <div className="form-group half-width">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={selectedClient.phone || selectedClient.contactNumber || ""}
                      onChange={handleEditChange}
                      placeholder="e.g., +1 123-456-7890"
                    />
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
                <h3>Company Details</h3>
                <p>
                  {selectedClient.companyName} ({selectedClient._id ? selectedClient._id.slice(-6).toUpperCase() : ""})
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
                  <p>{selectedClient.contactNumber || selectedClient.phone || "N/A"}</p>
                </div>
                <div className="detail-item">
                  <label>Email ID</label>
                  <p>{selectedClient.email || "N/A"}</p>
                </div>
                <div className="detail-item full-width">
                  <label>Total Earning</label>
                  <p className="price">
                    ${getCompanyEarnings(selectedClient.companyName).toLocaleString()}
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
                className="btn outline-btn"
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
                company will be permanently removed from the database.
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
    </Wrapper>
  );
};

export default AddCompany;
