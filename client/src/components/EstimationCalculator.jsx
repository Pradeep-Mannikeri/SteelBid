import React, { useState } from "react";
import styled from "styled-components";

const sheetOneWorkList = [
  // MAIN SHEET DETAILING (Structural Project)
  {
    category: "Main sheet detailing",
    name: "Anchor bolt Plans",
    baseTimeMin: 30,
  },
  {
    category: "Main sheet detailing",
    name: "Anchor bolt sections details",
    baseTimeMin: 20,
  },
  { category: "Main sheet detailing", name: "Erection Plans", baseTimeMin: 60 },
  {
    category: "Main sheet detailing",
    name: "Eelevation views",
    baseTimeMin: 30,
  },
  { category: "Main sheet detailing", name: "E sections", baseTimeMin: 15 },
  { category: "Main sheet detailing", name: "Columns", baseTimeMin: 6 },
  {
    category: "Main sheet detailing",
    name: "Beams (Sclip or shear tab)",
    baseTimeMin: 6,
  },
  {
    category: "Main sheet detailing",
    name: "Moment connection beams",
    baseTimeMin: 8,
  },
  {
    category: "Main sheet detailing",
    name: "Manual connection beams",
    baseTimeMin: 10,
  },
  {
    category: "Main sheet detailing",
    name: "Angle & Bent plates",
    baseTimeMin: 3,
  },
  { category: "Main sheet detailing", name: "V.Brace", baseTimeMin: 5 },
  { category: "Main sheet detailing", name: "Knee bracing", baseTimeMin: 10 },
  { category: "Main sheet detailing", name: "Parapet brace", baseTimeMin: 10 },
  { category: "Main sheet detailing", name: "Channels", baseTimeMin: 5 },
  { category: "Main sheet detailing", name: "Lintels", baseTimeMin: 5 },
  { category: "Main sheet detailing", name: "Bearing Plate", baseTimeMin: 5 },
  {
    category: "Main sheet detailing",
    name: "Stiffener Plates",
    baseTimeMin: 5,
  },
  { category: "Main sheet detailing", name: "Gusset Plates", baseTimeMin: 5 },
  { category: "Main sheet detailing", name: "Girts", baseTimeMin: 5 },
  { category: "Main sheet detailing", name: "Sag Rod", baseTimeMin: 5 },
  { category: "Main sheet detailing", name: "Embed Plates", baseTimeMin: 5 },
  { category: "Main sheet detailing", name: "RTU Frames", baseTimeMin: 15 },
  { category: "Main sheet detailing", name: "Joist", baseTimeMin: 3 },
  { category: "Main sheet detailing", name: "Deck angles", baseTimeMin: 5 },

  // MISC STEEL DETAILING (Miscellaneous Project)
  {
    category: "Misc Steel Detailing",
    name: "Anchor bolt Plans",
    baseTimeMin: 30,
  },
  {
    category: "Misc Steel Detailing",
    name: "Anchor bolt sections details",
    baseTimeMin: 20,
  },
  { category: "Misc Steel Detailing", name: "Erection Plans", baseTimeMin: 30 },
  {
    category: "Misc Steel Detailing",
    name: "Eelevation views",
    baseTimeMin: 30,
  },
  { category: "Misc Steel Detailing", name: "E sections", baseTimeMin: 15 },
  { category: "Misc Steel Detailing", name: "Stair Flights", baseTimeMin: 20 },
  { category: "Misc Steel Detailing", name: "Stair Rail", baseTimeMin: 15 },
  { category: "Misc Steel Detailing", name: "Railing", baseTimeMin: 15 },
  {
    category: "Misc Steel Detailing",
    name: "Landings Railing",
    baseTimeMin: 15,
  },
  { category: "Misc Steel Detailing", name: "Landings", baseTimeMin: 15 },
  { category: "Misc Steel Detailing", name: "Ladder", baseTimeMin: 20 },
  { category: "Misc Steel Detailing", name: "Bollards", baseTimeMin: 2 },
  { category: "Misc Steel Detailing", name: "Gate", baseTimeMin: 15 },
  { category: "Misc Steel Detailing", name: "Sump", baseTimeMin: 5 },
  { category: "Misc Steel Detailing", name: "Hoist Beam", baseTimeMin: 5 },
  { category: "Misc Steel Detailing", name: "Bent plate", baseTimeMin: 5 },
  { category: "Misc Steel Detailing", name: "Wall Rails", baseTimeMin: 10 },
  { category: "Misc Steel Detailing", name: "Grating", baseTimeMin: 5 },
  { category: "Misc Steel Detailing", name: "Misc", baseTimeMin: 3 },
];

const EstimationCalculator = ({
  projectRate = 40,
  estimationNumber,
  projectName,
  projectType,
  onSave,
  isDemo = false,
  onSubmitDemo,
}) => {
  const [currentStepName, setCurrentStepName] = useState("S-1.1");
  const [availableSteps, setAvailableSteps] = useState(["S-1.1"]);
  const [rate, setRate] = useState(projectRate);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmitClick = async () => {
    if (isDemo && onSubmitDemo) {
      const success = await onSubmitDemo();
      if (success) {
        setHasSubmitted(true);
      }
    } else {
      setHasSubmitted(true);
    }
  };
  const [stepsData, setStepsData] = useState({
    "S-1.1": {
      counts: {},
      catTotalHoursOverrides: {},
    },
  });

  const handleInputChange = (field, key, value) => {
    if (isDemo && hasSubmitted) {
      setHasSubmitted(false);
    }
    setStepsData((prev) => {
      const stepData = prev[currentStepName] || {};
      return {
        ...prev,
        [currentStepName]: {
          ...stepData,
          [field]: {
            ...(stepData[field] || {}),
            [key]: value,
          },
        },
      };
    });
  };

  const categories =
    projectType === "Miscellaneous project"
      ? ["Misc Steel Detailing"]
      : ["Main sheet detailing"];

  const stepsTotals = availableSteps.map((step) => {
    const sData = stepsData[step] || {};
    const sCounts = sData.counts || {};
    const sCatTotalHoursOverrides = sData.catTotalHoursOverrides || {};

    let stepModelMin = 0;
    let stepDetailingMin = 0;

    categories.forEach((category) => {
      const items = sheetOneWorkList
        .map((item, idx) => ({ ...item, originalIndex: idx }))
        .filter((item) => item.category === category);
      items.forEach((item) => {
        const count = parseInt(sCounts[item.originalIndex]) || 0;
        stepModelMin += count * item.baseTimeMin;
        stepDetailingMin += count * item.baseTimeMin;
      });
    });

    const categoryName = categories[0];
    let stepHours = 0;
    const over = sCatTotalHoursOverrides[categoryName];
    if (over !== undefined && over !== "") {
      stepHours = parseFloat(over) || 0;
    } else {
      stepHours = (stepModelMin + stepDetailingMin) / 60;
    }

    return {
      stepName: step,
      hours: stepHours,
      price: stepHours * rate,
    };
  });

  const activeStepTotal = stepsTotals.find((s) => s.stepName === currentStepName) || { hours: 0, price: 0 };
  const currentHours = activeStepTotal.hours;
  const currentPrice = activeStepTotal.price;

  const totalProjectHours = stepsTotals.reduce((sum, s) => sum + s.hours, 0);
  const totalProjectPrice = stepsTotals.reduce((sum, s) => sum + s.price, 0);

  const renderTableBody = () => {
    return categories.map((category) => {
      const items = sheetOneWorkList
        .map((item, idx) => ({ ...item, originalIndex: idx }))
        .filter((item) => item.category === category);

      let catModelMinCalc = 0;
      let catDetailingMinCalc = 0;

      const sData = stepsData[currentStepName] || {};
      const sCounts = sData.counts || {};
      const sCatTotalHoursOverrides = sData.catTotalHoursOverrides || {};

      items.forEach((item) => {
        const count = parseInt(sCounts[item.originalIndex]) || 0;
        catModelMinCalc += count * item.baseTimeMin;
        catDetailingMinCalc += count * item.baseTimeMin;
      });

      const isMain = category === "Main sheet detailing";
      const catClass = isMain ? "cat-main" : "cat-misc";

      return items.map((item, index) => {
        const countStr = sCounts[item.originalIndex] !== undefined ? sCounts[item.originalIndex] : "";
        const isFirstRow = index === 0;

        return (
          <tr key={item.originalIndex}>
            {isFirstRow && (
              <td
                rowSpan={items.length}
                className={`category-cell ${catClass}`}
              >
                <div className="vertical-text">{category}</div>
              </td>
            )}
            <td className={`member-name ${item.isRed ? "text-red" : ""}`}>
              {item.name}
            </td>

            <td className="input-cell editable">
              <input
                type="number"
                value={countStr}
                onChange={(e) =>
                  handleInputChange(
                    "counts",
                    item.originalIndex,
                    e.target.value,
                  )
                }
              />
            </td>

            {isFirstRow && (
              <td
                rowSpan={items.length}
                className="input-cell editable merged-input"
              >
                <input
                  type="number"
                  value={
                    sCatTotalHoursOverrides[category] !== undefined
                      ? sCatTotalHoursOverrides[category]
                      : ((catModelMinCalc + catDetailingMinCalc) / 60).toFixed(2)
                  }
                  onChange={(e) =>
                    handleInputChange(
                      "catTotalHoursOverrides",
                      category,
                      e.target.value,
                    )
                  }
                />
              </td>
            )}
          </tr>
        );
      });
    });
  };

  const bodyContent = renderTableBody();

  const handleNext = () => {
    const nextNum = availableSteps.length + 1;
    const nextStepName = `S-1.${nextNum}`;

    if (!availableSteps.includes(nextStepName)) {
      setAvailableSteps((prev) => [...prev, nextStepName]);
      setStepsData((prev) => ({
        ...prev,
        [nextStepName]: {
          counts: {},
          catTotalHoursOverrides: {},
        },
      }));
    }
    setCurrentStepName(nextStepName);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        hours: totalProjectHours.toFixed(2),
        price: totalProjectPrice.toFixed(2),
        steps: stepsTotals.map((s) => ({
          stepName: s.stepName,
          hours: parseFloat(s.hours.toFixed(2)),
          price: parseFloat(s.price.toFixed(2)),
        })),
      });
    }
  };

  return (
    <Wrapper>
      <div className="sheet-name-selector">
        <label>Current Sheet (DD):</label>
        <div className="sheet-tabs">
          {availableSteps.map((step) => (
            <button
              key={step}
              type="button"
              className={`sheet-tab-btn ${currentStepName === step ? "active" : ""}`}
              onClick={() => setCurrentStepName(step)}
            >
              {step}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table className="excel-table">
          <thead>
            <tr>
              <th
                className="th-category"
                style={{
                  width: "40px",
                  backgroundColor:
                    projectType === "Miscellaneous project"
                      ? "#a6c9ec"
                      : "#ffc700",
                }}
              >
                {currentStepName}
              </th>
              <th
                className="th-members"
                style={{
                  width: "200px",
                  backgroundColor:
                    projectType === "Miscellaneous project"
                      ? "#a6c9ec"
                      : "#ffc700",
                }}
              >
                Members
              </th>
              <th className="th-count" style={{ width: "80px" }}>
                Count
              </th>
              <th className="th-total-hours" style={{ width: "120px" }}>
                Total Hours
              </th>
            </tr>
          </thead>
          <tbody>{bodyContent}</tbody>
          <tfoot>
            <tr className="footer-row">
              <td colSpan="3" className="footer-label">
                Total Hours (Current Step)
              </td>
              <td className="footer-total-hours">{currentHours.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="sticky-footer">
        <div className="footer-content">
          <div className="footer-stats">
            <div className="stat">
              <span className="stat-label">Total Hours (All Steps):</span>
              <span className="stat-value">
                {isDemo && !hasSubmitted ? "0.00" : totalProjectHours.toFixed(2)}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Project Rate:</span>
              <div className="rate-input-wrapper">
                <span>$</span>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => {
                    if (isDemo && hasSubmitted) {
                      setHasSubmitted(false);
                    }
                    setRate(parseFloat(e.target.value) || 0);
                  }}
                />
                <span>/hr</span>
              </div>
            </div>
            <div className="stat highlight">
              <span className="stat-label">Grand Total Price:</span>
              <span className="stat-value">
                {isDemo && !hasSubmitted ? "$0.00" : "$" + totalProjectPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
          <div className="footer-actions">
            <button className="btn secondary-btn" onClick={handleNext}>
              Next Step (S-1.{availableSteps.length + 1})
            </button>
            {isDemo ? (
              <button className="btn main-btn" onClick={handleSubmitClick}>
                Submit
              </button>
            ) : (
              <button className="btn main-btn" onClick={handleSave}>
                Save Estimation
              </button>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: "Roboto", sans-serif;
  margin-top: 3rem;

  input, select, textarea, button {
    font-family: "Roboto", sans-serif;
  }

  .saved-steps-summary {
    background: var(--grey-50);
    border: 1px solid var(--grey-200);
    padding: 1rem 1.5rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;

    h4 {
      margin: 0 0 0.8rem 0;
      font-size: 0.9rem;
      color: var(--grey-600);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .steps-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
    }

    .step-badge {
      background: var(--white);
      border: 1px solid var(--grey-300);
      color: var(--grey-700);
      padding: 0.4rem 0.8rem;
      border-radius: 50px;
      font-size: 0.85rem;
      transition: all 0.2s ease;
      
      strong {
        font-weight: 800;
        color: var(--grey-900);
      }
      
      &.active {
        border-color: var(--primary-500);
        background: var(--primary-50);
        color: var(--primary-700);
        strong {
          color: var(--primary-900);
        }
      }
    }
  }

  .sheet-name-selector {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    background: var(--white);
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    border: 1px solid var(--grey-200);
    box-shadow: var(--shadow-1);
    width: fit-content;

    label {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--grey-700);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .sheet-tabs {
      display: flex;
      gap: 0.5rem;
    }

    .sheet-tab-btn {
      padding: 0.5rem 1rem;
      border: 1px solid var(--grey-300);
      background: var(--grey-50);
      color: var(--grey-700);
      border-radius: 6px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background: var(--grey-100);
        border-color: var(--grey-400);
      }
      
      &.active {
        background: var(--primary-600);
        color: white;
        border-color: var(--primary-600);
        box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
      }
    }
  }

  .section-header {
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--grey-100);
  }

  .section-title {
    font-size: 1.3rem;
    color: var(--grey-900);
    margin: 0;
  }

  .table-container {
    background: var(--white);
    border-radius: 5px;
    box-shadow: var(--shadow-2);
    overflow-x: auto;
    border: 1px solid var(--grey-200);
  }

  .excel-table {
    width: 100%;
    border-collapse: collapse;
    font-family: inherit;
    font-size: 0.85rem;
    color: var(--grey-900);

    th,
    td {
      border: 1px solid var(--table-border);
      padding: 0;
      text-align: right;
    }

    th {
      background-color: var(--table-header-bg);
      color: var(--grey-900);
      font-weight: 600;
      padding: 0.75rem 0.5rem;
      text-align: center;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .th-category {
      background-color: var(--cat-yellow);
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      color: #031838 !important;
    }
    .th-members {
      background-color: var(--cat-yellow);
      text-align: center;
      color: #031838 !important;
    }

    td {
      height: 30px;
    }

    .category-cell {
      padding: 0.5rem;
      font-weight: 700;
      text-align: center;
      background-color: #ffc700;
    }

    .cat-main {
      background-color: #ffc700 !important;
    }

    .cat-misc {
      background-color: #a6c9ec !important;
    }

    .vertical-text {
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      white-space: nowrap;
      margin: 0 auto;
    }

    .member-name {
      text-align: left;
      padding: 0 0.75rem;
      color: var(--member-text);

      &.text-red {
        color: #d32f2f;
      }
    }

    .input-cell {
      background-color: var(--input-bg);
      position: relative;

      input {
        width: 100%;
        height: 100%;
        min-height: 30px;
        border: none;
        background: transparent;
        color: var(--grey-900);
        text-align: right;
        padding: 0 0.5rem;
        font-family: inherit;
        font-size: 0.85rem;
        outline: none;

        &:focus {
          background: var(--white);
          box-shadow: inset 0 0 0 2px var(--primary-500);
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        &[type="number"] {
          -moz-appearance: textfield;
        }
      }
    }

    .merged-input {
      input {
        text-align: center;
        font-weight: 600;
      }
    }

    .editable {
      background-color: var(--editable-bg);

      &:hover {
        background-color: var(--editable-hover);
      }
    }

    .footer-row {
      background-color: var(--table-header-bg);
      font-weight: 700;
    }

    .footer-label {
      text-align: center;
      padding: 0.75rem;
    }

    .footer-total,
    .footer-total-hours {
      text-align: center;
      padding: 0.75rem;
    }
  }

  .sticky-footer {
    position: sticky;
    bottom: 0;
    margin-top: 1rem;
    background: var(--white);
    border-top: 1px solid var(--grey-100);
    padding: 0.4rem 1.25rem;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
    z-index: 50;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .footer-stats {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  .footer-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    
    .btn {
      min-width: 180px;
      white-space: nowrap;
      padding: 0.8rem 1.5rem;
    }
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    &.highlight {
      background: linear-gradient(135deg, var(--primary-50) 0%, #fff5f3 100%);
      border: 1px solid #031838;
      border-radius: 4px;
      padding: 0.25rem 0.75rem;
      min-width: 150px;
      box-shadow: 0 1px 4px rgba(222, 61, 40, 0.05);

      .stat-value {
        color: var(--primary-700);
        font-size: 1.2rem;
        font-weight: 900;
      }

      .stat-label {
        color: var(--primary-600);
      }
    }
  }

  .stat-label {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--grey-500);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .stat-value {
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--grey-900);
  }

  .rate-input-wrapper {
    display: flex;
    align-items: center;
    background: var(--grey-50);
    border: 1px solid var(--grey-200);
    border-radius: 8px;
    padding: 0.25rem 0.5rem;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--grey-700);
    transition: all 0.2s ease;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);

    &:focus-within {
      border-color: var(--primary-500);
      background: var(--white);
      box-shadow: 0 0 0 3px var(--primary-50), inset 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    span {
      color: var(--grey-500);
    }

    input {
      width: 45px;
      border: none;
      background: transparent;
      color: var(--grey-900);
      font-weight: 800;
      text-align: center;
      outline: none;
      padding: 0;
      font-size: 1rem;
      
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      &[type="number"] {
        -moz-appearance: textfield;
      }
    }
  }

  .btn.main-btn,
  .btn.secondary-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  body.dark-theme & {
    .saved-steps-summary {
      background: #0f172a;
      border-color: #1e293b;
      h4 { color: #94a3b8; }
      .step-badge {
        background: #1e293b;
        border-color: #334155;
        color: #f8fafc;
        strong { color: #ffffff; }
        &.active {
          border-color: var(--primary-500);
          background: rgba(37, 99, 235, 0.15);
        }
      }
    }

    .sheet-name-selector {
      background: #0f172a;
      border-color: #1e293b;
      label { color: #94a3b8; }
      .sheet-tab-btn {
        background: #1e293b;
        border-color: #334155;
        color: #94a3b8;
        &:hover {
          background: #334155;
        }
        &.active {
          background: var(--primary-600);
          color: white;
          border-color: var(--primary-600);
        }
      }
    }

    .table-container {
      background: #0f172a;
      border-color: #1e293b;
    }

    .excel-table {
      color: #f8fafc;
      th {
        background-color: #1e293b;
        color: #f8fafc;
        border-color: #334155;
      }
      td {
        border-color: #334155;
      }
      .input-cell input {
        color: #f8fafc;
        &:focus {
          background: #1e293b;
        }
      }
      .editable {
        background-color: #020617;
        &:hover {
          background-color: #1e293b;
        }
      }
      .category-cell {
        color: #031838;
      }
      .footer-row {
        background-color: #1e293b;
        color: #ffffff;
      }
    }

    .sticky-footer {
      background: #0f172a;
      border-color: #1e293b;
      box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.3);
    }

    .stat-label { color: #94a3b8; }
    .stat-value { color: #ffffff; }

    .rate-input-wrapper {
      background: #020617;
      border-color: #334155;
      color: #cbd5e1;
      
      &:focus-within {
        border-color: var(--primary-500);
        background: #0f172a;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
      }
      
      input {
        color: #f8fafc;
      }
    }
  }
`;

export default EstimationCalculator;
