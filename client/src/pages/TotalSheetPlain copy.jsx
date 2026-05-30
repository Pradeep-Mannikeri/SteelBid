import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";
import EstimationPDF from "../components/EstimationPDF";
import { EstimationContext } from "../context/EstimationContext";

const TotalSheetPlain = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { estimations, updateEstimation } = useContext(EstimationContext);

  const { estimation, formData, clientData, steps } = location.state || {};

  const [estimationData, setEstimationData] = useState(estimation || {});
  const [localFormData, setLocalFormData] = useState(formData || {});
  const [localClientData, setLocalClientData] = useState(clientData || {});
  const [localSteps, setLocalSteps] = useState(steps || []);

  // Auto-fetch logic: If state is missing, try to find it in the context by ID (if we had one)
  // For now, we rely on location.state but we add a safeguard.
  useEffect(() => {
    if (!estimation && estimations.length > 0) {
      // Fallback: use the most recent estimation if none provided in state
      const latest = estimations[0];
      setEstimationData(latest);
      setLocalClientData({
        companyName: latest.companyName,
        location: latest.location,
      });
      // Steps and formData are not in context yet, but we show what we have
    }
  }, [estimation, estimations]);

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

    // Recalculate totals if hours or price changed
    if (field === "hours" || field === "price") {
      const totalHours = newSteps.reduce(
        (sum, s) => sum + (parseFloat(s.hours) || 0),
        0,
      );
      const totalPrice = newSteps.reduce(
        (sum, s) => sum + (parseFloat(s.price) || 0),
        0,
      );
      setEstimationData((prev) => ({
        ...prev,
        hours: totalHours.toFixed(2),
        price: totalPrice.toFixed(2),
      }));
    }
  };

  const handleSaveToRepository = async () => {
    if (estimationData.id) {
      const finalData = {
        ...estimationData,
        companyName: localClientData.companyName,
        location: localClientData.location,
        steps: localSteps,
      };
      
      updateEstimation(estimationData.id, finalData);
      
      try {
        // Generate PDF blob
        const blob = await pdf(<EstimationPDF data={finalData} />).toBlob();
        const url = URL.createObjectURL(blob);
        
        // Open PDF in a new tab
        window.open(url, "_blank");
      } catch (error) {
        console.error("PDF Generation Error:", error);
        alert("Failed to generate PDF. Please check the console for details.");
      }
    }
  };

  // Ensure we have exactly 10 rows for the table body to match the Excel sheet layout
  const displaySteps = [...localSteps];
  while (displaySteps.length < 10) {
    displaySteps.push({ stepName: "", hours: 0, price: 0 });
  }

  const halfway = Math.ceil(displaySteps.length / 2);

  return (
    <Wrapper>
      <div className="header no-print">
        <div>
          <div className="badge">Draft Estimation</div>
          <h3>Final Estimation Sheet</h3>
          <p className="subtitle">
            Refine your estimation details. Changes made here are for this
            document only.
          </p>
        </div>
        <div className="actions">
          <button
            className="btn back-btn"
            onClick={() => navigate("/dashboard/estimations")}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Repository
          </button>
          <button className="btn save-btn" onClick={handleSaveToRepository}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Save Changes
          </button>
        </div>
      </div>

      <div className="table-card">
        <div className="table-container">
          <table className="excel-table">
          <tbody>
            {/* Row 1-3: Header Section */}
            <tr>
              <td
                colSpan="2"
                rowSpan="3"
                className="company-info-cell"
                style={{ borderTop: "none", borderLeft: "none" }}
              >
                {/* Empty cell for letterhead printing */}
              </td>
              <td className="label-cell" style={{ width: "15%" }}>Estimation Number</td>
              <td className="value-cell center" style={{ width: "35%" }}>
                <input
                  className="sheet-input center"
                  value={estimationData.id}
                  onChange={(e) => handleEstimationChange("id", e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="label-cell">Bid doc received date</td>
              <td className="value-cell center">
                <input
                  type="date"
                  className="sheet-input center"
                  value={localFormData?.bidDocReceivedDate || ""}
                  onChange={(e) =>
                    handleFormChange("bidDocReceivedDate", e.target.value)
                  }
                />
              </td>
            </tr>
            <tr>
              <td className="label-cell">Bid date</td>
              <td className="value-cell center">
                <input
                  type="date"
                  className="sheet-input center"
                  value={localFormData?.bidDate || estimationData.date}
                  onChange={(e) => handleFormChange("bidDate", e.target.value)}
                />
              </td>
            </tr>

            {/* Client Details Section */}
            <tr>
              <td className="label-cell" style={{ width: "15%" }}>Client Name:</td>
              <td colSpan="3" className="value-cell">
                <input
                  className="sheet-input"
                  value={localClientData?.companyName || localFormData?.clientName || "N/A"}
                  onChange={(e) =>
                    handleClientChange("companyName", e.target.value)
                  }
                />
              </td>
            </tr>
            <tr>
              <td className="label-cell">Address:</td>
              <td colSpan="3" className="value-cell">
                <input
                  className="sheet-input"
                  value={localClientData?.location || localFormData?.address || "N/A"}
                  onChange={(e) =>
                    handleClientChange("location", e.target.value)
                  }
                />
              </td>
            </tr>
            <tr>
              <td className="label-cell">Contact Person:</td>
              <td colSpan="3" className="value-cell">
                <input
                  className="sheet-input"
                  value={localClientData?.contactPerson || localFormData?.projectManager || ""}
                  onChange={(e) =>
                    handleClientChange("contactPerson", e.target.value)
                  }
                />
              </td>
            </tr>
            <tr>
              <td className="label-cell">Phone:</td>
              <td className="value-cell">
                <input
                  className="sheet-input"
                  value={localClientData?.phone || ""}
                  onChange={(e) => handleClientChange("phone", e.target.value)}
                />
              </td>
              <td className="label-cell ">Email:</td>
              <td className="value-cell">
                <input
                  className="sheet-input small-text"
                  value={localClientData?.email || localFormData?.contactDetails || ""}
                  onChange={(e) => handleClientChange("email", e.target.value)}
                />
              </td>
            </tr>

            {/* Project Details */}
            <tr>
              <td className="label-cell">Project Name:</td>
              <td colSpan="3" className="value-cell center-left">
                <input
                  className="sheet-input center-left"
                  value={estimationData.project}
                  onChange={(e) =>
                    handleEstimationChange("project", e.target.value)
                  }
                />
              </td>
            </tr>

            {/* Data Table Headers */}
            <tr>
              <td className="bold center label-cell" style={{ width: "40%" }}>DD</td>
              <td className="bold center label-cell" style={{ width: "12%" }}>Total Hours</td>
              <td className="bold center label-cell" style={{ width: "12%" }}>Price</td>
              <td className="label-cell" style={{ width: "36%" }}></td>
            </tr>

            {/* Data Table Rows */}
            {displaySteps.map((step, idx) => (
              <tr key={idx}>
                <td className="center">
                  <input
                    className="sheet-input center"
                    value={step.stepName || ""}
                    onChange={(e) =>
                      handleStepChange(idx, "stepName", e.target.value)
                    }
                  />
                </td>
                <td className="right">
                  <input
                    type="number"
                    className="sheet-input right"
                    value={step.hours ? Number(step.hours).toFixed(2) : ""}
                    onChange={(e) =>
                      handleStepChange(idx, "hours", e.target.value)
                    }
                  />
                </td>
                <td className="right">
                  <input
                    type="number"
                    className="sheet-input right"
                    value={step.price ? Number(step.price).toFixed(2) : ""}
                    onChange={(e) =>
                      handleStepChange(idx, "price", e.target.value)
                    }
                  />
                </td>
                {idx === 0 && (
                  <td rowSpan={halfway} className="center">
                    <textarea
                      className="sheet-textarea center"
                      style={{ height: "100%", minHeight: "150px" }}
                      value={estimationData.drawingQualityRating || ""}
                      placeholder="Drawing quality rating"
                      onChange={(e) => handleEstimationChange("drawingQualityRating", e.target.value)}
                    />
                  </td>
                )}
                {idx === halfway && (
                  <td
                    rowSpan={displaySteps.length - halfway}
                    className="center"
                  >
                    <textarea
                      className="sheet-textarea center"
                      style={{ height: "100%", minHeight: "150px" }}
                      value={estimationData.projectSchedule || ""}
                      placeholder="Project schedule"
                      onChange={(e) => handleEstimationChange("projectSchedule", e.target.value)}
                    />
                  </td>
                )}
              </tr>
            ))}

            {/* Total Row */}
            <tr>
              <td className="bold center text-lg">Total</td>
              <td className="right bold text-lg">
                {Number(estimationData.hours || 0).toFixed(2)}
              </td>
              <td className="right bold text-lg">
                {Number(estimationData.price || 0).toFixed(2)}
              </td>
              <td></td>
            </tr>

            {/* Exclusion */}
            <tr>
              <td className="label-cell center">
                Exclusion
              </td>
              <td colSpan="3">
                <textarea
                  className="sheet-textarea"
                  placeholder="List exclusions here..."
                  value={estimationData.exclusions || ""}
                  onChange={(e) => handleEstimationChange("exclusions", e.target.value)}
                ></textarea>
              </td>
            </tr>

            {/* Inclusion */}
            <tr>
              <td className="label-cell center">
                Inclusion
              </td>
              <td colSpan="3">
                <textarea
                  className="sheet-textarea"
                  placeholder="List inclusions here..."
                  value={estimationData.inclusions || ""}
                  onChange={(e) => handleEstimationChange("inclusions", e.target.value)}
                ></textarea>
              </td>
            </tr>

            {/* Scope of Work Reference */}
            <tr>
              <td className="label-cell center">
                Scope of Work Reference
              </td>
              <td colSpan="3">
                <textarea
                  className="sheet-textarea"
                  placeholder="List scope of work reference documents..."
                  value={estimationData.scopeOfWork || ""}
                  onChange={(e) => handleEstimationChange("scopeOfWork", e.target.value)}
                ></textarea>
              </td>
            </tr>

            {/* Remark and Signature */}
            <tr>
              <td className="label-cell center">
                Remark
              </td>
              <td colSpan="3">
                <textarea
                  className="sheet-textarea"
                  placeholder="Add remarks..."
                  value={estimationData.remarks || ""}
                  onChange={(e) => handleEstimationChange("remarks", e.target.value)}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 3rem 2rem;
  background: var(--background);
  font-family: "Roboto", sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background 0.3s ease;

  .page-header {
    width: 100%;
    max-width: 1000px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    padding: 1.5rem 2rem;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.03);
  }

  .badge {
    background: #e0f2fe;
    color: #0369a1;
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    width: fit-content;
    margin-bottom: 0.75rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;
    
    h3 {
      font-size: 1.8rem;
      color: var(--grey-900);
      font-weight: 800;
      margin: 0;
      letter-spacing: -0.02em;
    }
    
    .subtitle {
      color: var(--grey-500);
      margin-top: 0.4rem;
      font-size: 0.95rem;
      max-width: 500px;
    }
  }

  .actions {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.4s ease;
    border: 2px solid transparent;
    overflow: hidden;
    z-index: 1;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      width: 0;
      height: 100%;
      background: #ffffff;
      transition: all 0.4s cubic-bezier(0.77, 0, 0.175, 1);
      z-index: -1;
    }

    &::before {
      left: 50%;
    }

    &::after {
      right: 50%;
    }

    &:hover::before {
      left: 0;
      width: 51%;
    }

    &:hover::after {
      right: 0;
      width: 51%;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    }
  }

  .back-btn {
    background: var(--grey-100);
    color: var(--grey-700);
    border-color: var(--grey-100);
    &:hover {
      color: var(--primary-600);
      border-color: var(--primary-600);
    }
  }

  .save-btn {
    background: #22c55e;
    color: #ffffff;
    border-color: #22c55e;
    &:hover {
      color: #22c55e;
      border-color: #22c55e;
    }
  }

  .table-card {
    background: var(--white);
    border-radius: 12px;
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.08);
    border: 1px solid var(--grey-200);
    overflow: hidden;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    
    @media print {
      box-shadow: none;
      border: none;
    }
  }

  .table-container {
    overflow-x: auto;
    padding: 2rem;
  }

  .excel-table {
    width: 100%;
    border-collapse: collapse;
    font-family: "Roboto", sans-serif;
    font-size: 13px;
    color: var(--grey-800);
    table-layout: fixed;

    td {
      border: 1px solid var(--grey-300);
      padding: 0 10px;
      height: 32px;
      overflow: hidden;
    }

    /* Independent Column Widths handled via JSX style */
  }

  .sheet-input {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0 8px;
    font-family: inherit;
    font-size: inherit;
    background: transparent;
    color: inherit;
    outline: none;
    transition: background 0.2s;

    &:focus {
      background: var(--grey-50);
    }

    &.center {
      text-align: center;
    }
    &.right {
      text-align: right;
    }
    &.center-left {
      text-align: left;
      padding-left: 15px;
    }

    /* Hide arrows for number inputs */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &::-webkit-calendar-picker-indicator {
      cursor: pointer;
      filter: invert(0);
    }

    :global(body.dark-theme) & {
      &::-webkit-calendar-picker-indicator {
        filter: invert(1);
      }
    }
  }

  .sheet-textarea {
    width: 100%;
    height: 60px;
    border: none;
    padding: 8px;
    font-family: inherit;
    font-size: inherit;
    background: transparent;
    color: inherit;
    outline: none;
    resize: none;
    display: block;

    &:focus {
      background: #f0f9ff;
    }

    &.center {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .company-info-cell {
    padding: 1rem !important;
    vertical-align: top;
  }

  .label-cell {
    background-color: var(--grey-100);
    font-weight: 600;
    padding: 0 8px !important;
    color: var(--grey-700);
  }

  .value-cell {
    background-color: var(--white);
  }

  .center {
    text-align: center;
    vertical-align: middle;
  }

  .center-left {
    text-align: center;
  }

  .right {
    text-align: right;
  }

  .bold {
    font-weight: bold;
  }

  .small-text {
    font-size: 11px !important;
  }

  .text-lg {
    font-size: 14px;
  }

  .align-top {
    vertical-align: top;
  }

  .align-bottom {
    vertical-align: bottom;
  }

  @media print {
    .no-print {
      display: none !important;
    }

    .sheet-container {
      box-shadow: none;
      padding: 0;
      max-width: 100%;
    }

    body {
      background: #fff;
    }
  }
`;

export default TotalSheetPlain;
