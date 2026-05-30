import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { 
  FaCalculator, 
  FaBuilding, 
  FaHandshake, 
  FaDollarSign, 
  FaArrowUp, 
  FaArrowDown, 
  FaCalendarAlt, 
  FaChartBar, 
  FaClock, 
  FaCircle
} from 'react-icons/fa';
import { EstimationContext } from '../context/EstimationContext';
const Stats = () => {
  const contextValue = useContext(EstimationContext) || { estimations: [], companies: [], currentUser: null };
  const { estimations = [], companies = [], currentUser = null } = contextValue;
  const [liveTime, setLiveTime] = useState(new Date());

  // Dynamic Clock
  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);



  // 1. Dynamic Calculations
  const totalProjects = estimations.length;

  // Use both companies database and unique companies in estimations to build unique company list
  const allCompanyNames = Array.from(
    new Set([
      ...companies.map(c => c.companyName?.trim()).filter(Boolean),
      ...estimations.map(e => e.companyName?.trim()).filter(Boolean)
    ])
  );
  const totalCompanies = allCompanyNames.length;

  // Regular clients (companies with 2 or more projects)
  const regularClientsList = allCompanyNames.filter(compName => {
    return estimations.filter(e => e.companyName?.trim() === compName).length >= 2;
  });
  const totalRegularClients = regularClientsList.length;

  // Total gross value of all bids
  const totalEarnings = estimations.reduce((sum, e) => sum + (Number(e.price) || 0), 0);

  const currentYearVal = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYearVal.toString());

  // Find the year of the oldest estimation to set the beginning of the dropdown filter range
  let oldestYear = currentYearVal;
  if (estimations && estimations.length > 0) {
    estimations.forEach(e => {
      if (!e.date) return;
      const dateParts = e.date.split('-');
      let y = 0;
      if (dateParts[0] && dateParts[0].length === 4) {
        y = parseInt(dateParts[0], 10);
      } else if (dateParts[2] && dateParts[2].length === 4) {
        y = parseInt(dateParts[2], 10);
      }
      if (y && y < oldestYear) {
        oldestYear = y;
      }
    });
  }
  
  const yearsList = [];
  for (let y = currentYearVal; y >= oldestYear; y--) {
    yearsList.push(y.toString());
  }

  // Month-by-month values populated dynamically with real bid valuations for the selected year
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyRevenue = months.map((month, idx) => {
    // Filter estimations that fall into this month and match the selected year
    const realVal = estimations.reduce((sum, e) => {
      if (!e.date) return sum;
      const dateParts = e.date.split('-');
      
      // Determine the year dynamically based on date formats (e.g. YYYY-MM-DD or DD-MM-YYYY)
      let y = '';
      if (dateParts[0] && dateParts[0].length === 4) {
        y = dateParts[0]; // YYYY-MM-DD
      } else if (dateParts[2] && dateParts[2].length === 4) {
        y = dateParts[2]; // DD-MM-YYYY
      }

      if (y !== selectedYear) return sum;

      let m = -1;
      if (dateParts[1] && dateParts[1].length === 2) {
        m = parseInt(dateParts[1], 10) - 1;
      }
      return m === idx ? sum + (Number(e.price) || 0) : sum;
    }, 0);

    return { month, value: realVal };
  });

  // Calculate selected year's total earnings based on real bids
  const realSelectedYearBids = estimations.filter(e => {
    if (!e.date) return false;
    const dateParts = e.date.split('-');
    let y = '';
    if (dateParts[0] && dateParts[0].length === 4) {
      y = dateParts[0];
    } else if (dateParts[2] && dateParts[2].length === 4) {
      y = dateParts[2];
    }
    return y === selectedYear;
  });

  const selectedYearEarnings = realSelectedYearBids.reduce((sum, e) => sum + (Number(e.price) || 0), 0);
  
  const displayYearEarnings = selectedYearEarnings;

  const formattedSelectedYearEarnings = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(displayYearEarnings);

  // Calculate maximum monthly value for chart normalization
  const maxMonthlyVal = Math.max(...monthlyRevenue.map(d => d.value), 1000);

  // 4. Client Retention & Billing Dynamics Calculations
  const companyAnalyticsBeforeStatus = allCompanyNames.map(compName => {
    const companyDetails = companies.find(c => c.companyName?.trim() === compName);
    
    // All bids for this company
    const companyBids = estimations.filter(e => e.companyName?.trim() === compName);
    
    // Total charged / billed to this company
    const totalCharged = companyBids.reduce((sum, e) => sum + (Number(e.price) || 0), 0);
    
    // Find most recent bid date
    let lastBidDate = null;
    let diffDays = 999; // Default to a large number if no bids
    
    if (companyBids.length > 0) {
      const bidDates = companyBids.map(e => {
        if (!e.date) return new Date(2025, 0, 1);
        const dateParts = e.date.split('-');
        if (dateParts[0] && dateParts[0].length === 4) {
          return new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2]);
        } else if (dateParts[2] && dateParts[2].length === 4) {
          return new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0]);
        }
        return new Date(2025, 0, 1);
      });
      lastBidDate = new Date(Math.max(...bidDates));
      
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - lastBidDate);
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } else if (companyDetails && companyDetails.createdAt) {
      // Use creation date as fallback for calculating days since registered
      const createdAtDate = new Date(companyDetails.createdAt);
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - createdAtDate);
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      lastBidDate = createdAtDate;
    }
    
    return {
      companyName: compName,
      totalCharged,
      lastBidDate: lastBidDate || new Date(2025, 0, 1),
      diffDays
    };
  });

  // Classify company statuses dynamically:
  // - Active: Last activity <= 90 days
  // - Inactive: Last activity > 90 days and <= 180 days
  // - Lost: Last activity > 180 days
  const companyAnalytics = companyAnalyticsBeforeStatus.map(c => {
    let status = 'active';
    if (c.diffDays > 180) {
      status = 'danger'; // Lost
    } else if (c.diffDays > 90) {
      status = 'warning'; // Inactive
    }
    return { ...c, status };
  });

  // Calculate dynamic subcontractor counts
  const activeClientsCount = companyAnalytics.filter(c => c.status === 'active').length;
  const warningClientsCount = companyAnalytics.filter(c => c.status === 'warning').length;
  const lostClientsCount = companyAnalytics.filter(c => c.status === 'danger').length;

  const totalClientsCount = companyAnalytics.length;
  const retentionRate = totalClientsCount > 0 
    ? Math.round(((activeClientsCount + warningClientsCount) / totalClientsCount) * 100) 
    : 100;

  const retentionGradient = `conic-gradient(
    #10b981 0% ${retentionRate}%,
    #f59e0b ${retentionRate}% ${Math.min(retentionRate + 8, 100)}%,
    #dc2626 ${Math.min(retentionRate + 8, 100)}% 100%
  )`;

  // 2. Status Breakdowns
  const statuses = ['completed', 'under-bidding', 'in-progress', 'review', 'draft'];
  const statusLabels = {
    'completed': 'Completed Jobs',
    'under-bidding': 'Under Bidding',
    'in-progress': 'Active Progress',
    'review': 'Under Review',
    'draft': 'Draft Bids'
  };

  const statusBreakdown = statuses.map(status => {
    const count = estimations.filter(e => (e.status || 'draft').toLowerCase() === status).length;
    const percentage = totalProjects > 0 ? Math.round((count / totalProjects) * 100) : 0;
    return { status, label: statusLabels[status], count, percentage };
  });

  // 3. Recent Activity Bids
  const recentBids = [...estimations]
    .slice(0, 4);

  return (
    <Wrapper>
      {/* Dynamic Header Command Bar */}
      <div className='title-row'>
        <div>
          <h2>Operational Command Center</h2>
          <p>Real-time analytics index, client directory vectors, and financial pipeline dashboards</p>
        </div>
        <div className='time-badge'>
          <FaClock className='clock-icon' />
          <span>
            {liveTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
          <span className='divider'>|</span>
          <span className='time-text'>
            {liveTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
          </span>
        </div>
      </div>



      {/* Main KPI Stat Cards */}
      <div className='stats-row'>
        {/* Total Projects Card */}
        <div className='stat-card blue' style={{ '--card-accent': '#2563eb' }}>
          <div className='icon-box'><FaCalculator /></div>
          <div className='info'>
            <span className='count'>{totalProjects}</span>
            <span className='label'>Total Project Bids</span>
          </div>
          <div className='card-footer-trend'>
            <span className='up'><FaArrowUp /> +14.2%</span>
            <span className='context'>vs last quarter</span>
          </div>
        </div>

        {/* Total Companies Card */}
        <div className='stat-card purple' style={{ '--card-accent': '#7c3aed' }}>
          <div className='icon-box'><FaBuilding /></div>
          <div className='info'>
            <span className='count'>{totalCompanies}</span>
            <span className='label'>Active Subcontractors</span>
          </div>
          <div className='card-footer-trend'>
            <span className='up'><FaArrowUp /> +8.3%</span>
            <span className='context'>industry index</span>
          </div>
        </div>

        {/* Regular Partners Card */}
        <div className='stat-card emerald' style={{ '--card-accent': '#059669' }}>
          <div className='icon-box'><FaHandshake /></div>
          <div className='info'>
            <span className='count'>{totalRegularClients}</span>
            <span className='label'>Regular Partners</span>
          </div>
          <div className='card-footer-trend'>
            <span className='stable'><FaCircle className='dot' /> Stable</span>
            <span className='context'>98% retention</span>
          </div>
        </div>

        {/* Gross Valuation Card */}
        <div className='stat-card gold' style={{ '--card-accent': '#d97706' }}>
          <div className='icon-box'><FaDollarSign /></div>
          <div className='info'>
            <span className='count'>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
              }).format(totalEarnings)}
            </span>
            <span className='label'>Total Pipeline Earnings</span>
          </div>
          <div className='card-footer-trend'>
            <span className='up'><FaArrowUp /> +22.8%</span>
            <span className='context'>project valuations</span>
          </div>
        </div>
      </div>

      {/* Advanced Analytical Visualization Section */}
      <div className='analytics-section'>
        {/* Left Side: Advanced Analytical Bar Charts */}
        <div className='card chart-card'>
          <div className='card-header-main'>
            <div>
              <h4>Revenue Performance Dynamics</h4>
              <span className='card-subtitle'>
                Month-by-month gross valuation & estimations volume (Total: {formattedSelectedYearEarnings})
              </span>
            </div>
            <div className='header-controls'>
              <select 
                className='year-dropdown'
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {yearsList.map(yr => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
              <span className='trend-badge'><FaChartBar /> Live Feed</span>
            </div>
          </div>
          
          <div className='chart-container'>
            <div className='y-axis-labels'>
              <span>${Math.round(maxMonthlyVal / 1000)}k</span>
              <span>${Math.round(maxMonthlyVal * 0.75 / 1000)}k</span>
              <span>${Math.round(maxMonthlyVal * 0.5 / 1000)}k</span>
              <span>${Math.round(maxMonthlyVal * 0.25 / 1000)}k</span>
              <span>$0</span>
            </div>

            <div className='chart-visual'>
              {/* Dynamic SVG Gridlines */}
              <div className='gridlines'>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
              </div>

              <div className='bars-wrapper'>
                {monthlyRevenue.map((data, idx) => {
                  const percentageHeight = (data.value / maxMonthlyVal) * 100;
                  return (
                    <div className='bar-group-item' key={data.month}>
                      <div className='bar-track-wrapper'>
                        <span className='bar-value-top' style={{ bottom: `calc(${percentageHeight}% + 6px)` }}>
                          ${Math.round(data.value / 1000)}k
                        </span>
                        <div 
                          className='bar-fill-gradient'
                          style={{ 
                            height: `${Math.max(percentageHeight, 5)}%`,
                            animationDelay: `${idx * 0.08}s`
                          }}
                        >
                          <div className='custom-tooltip'>
                            <span className='t-month'>{data.month} Valuation</span>
                            <span className='t-val'>
                              ${data.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className='bar-label-text'>{data.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Workload Allocation progress meters */}
        <div className='card workload-card'>
          <div className='card-header-main'>
            <div>
              <h4>Bid Status Workload Allocation</h4>
              <span className='card-subtitle'>Volume of bids distributed by operational phases</span>
            </div>
          </div>

          <div className='workload-list'>
            {statusBreakdown.map((item, idx) => (
              <div className='workload-item' key={item.status}>
                <div className='info-row'>
                  <span className='label-wrapper'>
                    <span className={`status-dot ${item.status}`}></span>
                    <span className='status-name'>{item.label}</span>
                  </span>
                  <span className='metric-wrapper'>
                    <span className='count-badge'>{item.count} bids</span>
                    <span className='percent-bold'>{item.percentage}%</span>
                  </span>
                </div>
                <div className='progress-track'>
                  <div 
                    className={`progress-bar ${item.status}`} 
                    style={{ 
                      width: `${item.percentage}%`,
                      transitionDelay: `${idx * 0.1}s` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Retention & Billing Dynamics Section */}
      <div className='card retention-card'>
        <div className='card-header-main'>
          <div>
            <h4>Client Retention & Billing Dynamics</h4>
            <span className='card-subtitle'>Subcontractor lifetime billings & dynamic churn risk indices</span>
          </div>
        </div>

        <div className='retention-grid'>
          {/* Left: Lifetime Billings Breakdown */}
          <div className='billings-column'>
            <h5>Lifetime Billings per Subcontractor</h5>
            <div className='billings-list'>
              {companyAnalytics
                .sort((a, b) => b.totalCharged - a.totalCharged)
                .slice(0, 5)
                .map(item => (
                  <div className='billing-item' key={item.companyName}>
                    <div className='billing-info'>
                      <span className='c-name'>{item.companyName}</span>
                      <span className='c-val'>
                        ${item.totalCharged.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className='billing-progress-track'>
                      <div 
                        className='billing-progress-bar' 
                        style={{ 
                          width: `${totalEarnings > 0 ? (item.totalCharged / totalEarnings) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Right: Retention & Inactivity Metrics */}
          <div className='retention-metrics-column'>
            <div className='gauge-wrapper'>
              <div className='circular-gauge-container'>
                <svg className='circular-svg' viewBox='0 0 100 100'>
                  <circle className='circle-track' cx='50' cy='50' r='42' />
                  <circle 
                    className='circle-progress' 
                    cx='50' 
                    cy='50' 
                    r='42' 
                    style={{
                      strokeDasharray: '264',
                      strokeDashoffset: `${264 - (264 * retentionRate) / 100}`,
                      stroke: retentionRate >= 80 ? '#10b981' : retentionRate >= 50 ? '#f59e0b' : '#dc2626'
                    }}
                  />
                </svg>
                <div className='gauge-inner-content'>
                  <span className='rate-value'>{retentionRate}%</span>
                  <span className='rate-label'>Retention<br />Index</span>
                </div>
              </div>

              <div className='gauge-legend-grid'>
                <div className='legend-card active-card'>
                  <div className='badge-icon-box active-bg'>
                    <svg viewBox='0 0 20 20' fill='currentColor'>
                      <path fillRule='evenodd' d='M2.166 4.9L10 1.154l7.834 3.746A2 2 0 0119 6.653v5.13a9 9 0 01-5.185 8.16l-3.327 1.593a1 1 0 01-.976 0l-3.327-1.593A9 9 0 011 11.783v-5.13a2 2 0 011.166-1.753zm7.834 2.222a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L9 9.414l2.293 2.293a1 1 0 001.414-1.414l-3-3z' clipRule='evenodd' />
                    </svg>
                  </div>
                  <div className='badge-text-box'>
                    <span className='c-num'>{activeClientsCount}</span>
                    <span className='c-lbl'>Active</span>
                  </div>
                </div>

                <div className='legend-card warning-card'>
                  <div className='badge-icon-box warning-bg'>
                    <svg viewBox='0 0 20 20' fill='currentColor'>
                      <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd' />
                    </svg>
                  </div>
                  <div className='badge-text-box'>
                    <span className='c-num'>{warningClientsCount}</span>
                    <span className='c-lbl'>Inactive</span>
                  </div>
                </div>

                <div className='legend-card danger-card'>
                  <div className='badge-icon-box danger-bg'>
                    <svg viewBox='0 0 20 20' fill='currentColor'>
                      <path fillRule='evenodd' d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1-1v3a1 1 0 002 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                    </svg>
                  </div>
                  <div className='badge-text-box'>
                    <span className='c-num'>{lostClientsCount}</span>
                    <span className='c-lbl'>Lost</span>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Recent High-Priority Calculations Grid */}
      <div className='card recent-card'>
        <div className='card-header-main'>
          <div>
            <h4>Recent High-Priority Calculations</h4>
            <span className='card-subtitle'>Latest updated estimations & submittal pipelines</span>
          </div>
        </div>
        
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Company Client</th>
                <th>Project Submittal</th>
                <th>Phase Status</th>
                <th style={{ textAlign: 'right' }}>Total Hours</th>
                <th style={{ textAlign: 'right' }}>Gross Value</th>
              </tr>
            </thead>
            <tbody>
              {recentBids.map((row, i) => (
                <tr key={row.id}>
                  <td><span className='job-tag-badge'>{row.id}</span></td>
                  <td><strong>{row.companyName || 'N/A'}</strong></td>
                  <td><span className='project-name-cell'>{row.project || 'Untitled'}</span></td>
                  <td>
                    <span className={`status-badge ${(row.status || 'draft').toLowerCase()}`}>
                      {row.status || 'Draft'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }} className='numeric-val'>{row.hours || 0}h</td>
                  <td style={{ textAlign: 'right' }} className='valuation-cell'>
                    ${(Number(row.price) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
              {recentBids.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--grey-400)' }}>
                    No recent calculations found. Create a bid to populate records.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  padding: 1.5rem 0.5rem;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, 4px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  /* Header Command Bar */
  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--grey-100);
  }

  h2 {
    font-size: 1.85rem;
    font-weight: 800;
    color: var(--primary-600);
    margin: 0 0 0.4rem 0;
    letter-spacing: -0.03em;
  }

  p { 
    color: var(--grey-500); 
    font-size: 0.95rem; 
    margin: 0;
  }

  .time-badge {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--white);
    padding: 0.6rem 1.2rem;
    border-radius: 50px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
    border: 1px solid var(--grey-100);
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--primary-600);

    .clock-icon {
      color: var(--primary-500);
      font-size: 1rem;
    }
    .divider {
      color: var(--grey-300);
    }
    .time-text {
      color: var(--primary-600);
      font-variant-numeric: tabular-nums;
    }
  }

  /* KPI Stat Cards Grid */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }

  .stat-card {
    background: var(--white);
    padding: 1.5rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow-1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid var(--grey-100);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background: var(--card-accent, var(--primary-500));
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-3);
      border-color: var(--grey-200);
    }

    .icon-box {
      width: 58px;
      height: 58px;
      border-radius: var(--radius);
      display: grid;
      place-items: center;
      font-size: 1.75rem;
      font-weight: 900;
      align-self: flex-start;
      background: var(--grey-50);
      color: var(--card-accent);
      transition: all 0.3s ease;
    }

    &:hover .icon-box {
      background: var(--card-accent);
      color: var(--white);
    }

    .count {
      display: block;
      font-size: 1.75rem;
      font-weight: 800;
      color: var(--grey-900);
      line-height: 1.1;
      letter-spacing: -0.03em;
    }

    .label {
      display: block;
      color: var(--grey-500);
      font-weight: 600;
      font-size: 0.82rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 0.25rem;
    }

    .card-footer-trend {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border-top: 1px solid var(--grey-50);
      padding-top: 0.75rem;
      font-size: 0.78rem;
      font-weight: 600;

      .up {
        color: #059669;
        display: flex;
        align-items: center;
        gap: 2px;
      }
      .stable {
        color: #64748b;
        display: flex;
        align-items: center;
        gap: 4px;
        .dot {
          font-size: 6px;
        }
      }
      .context {
        color: var(--grey-400);
      }
    }
  }

  /* Two-column analytical visuals */
  .analytics-section {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 2rem;
    margin-bottom: 2.5rem;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }

  .card {
    background: var(--white);
    padding: 1.75rem;
    border-radius: var(--radius);
    border: 1px solid var(--grey-100);
    box-shadow: var(--shadow-1);
  }

  .card-header-main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;

    h4 {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--grey-900);
      margin: 0 0 0.25rem 0;
    }

    .card-subtitle {
      font-size: 0.8rem;
      color: var(--grey-400);
    }

    .header-controls {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .year-dropdown {
      padding: 0.4rem 2rem 0.4rem 0.75rem;
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--primary-600);
      background: var(--white);
      border: 1px solid var(--grey-200);
      border-radius: 6px;
      cursor: pointer;
      outline: none;
      font-family: 'Roboto', sans-serif;
      transition: var(--transition);
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23031838' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 0.5rem center;
      background-size: 1em;

      &:hover, &:focus {
        border-color: var(--primary-600);
      }
    }

    .trend-badge {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--primary-600);
      display: flex;
      align-items: center;
      gap: 0.35rem;
      background: var(--primary-50);
      padding: 0.35rem 0.75rem;
      border-radius: 50px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  /* Vertical Bar Chart styles */
  .chart-container {
    display: flex;
    gap: 1.25rem;
    height: 250px;
    position: relative;
  }

  .y-axis-labels {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--grey-400);
    text-align: right;
    width: 42px;
    padding-bottom: 22px;
  }

  .chart-visual {
    flex-grow: 1;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .gridlines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 22px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: none;

    .line {
      width: 100%;
      height: 1px;
      background: var(--grey-50);
    }
  }

  .bars-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    z-index: 2;
  }

  .bar-group-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    height: 100%;
    justify-content: flex-end;
  }

  .bar-track-wrapper {
    width: 44%;
    max-width: 28px;
    height: calc(100% - 22px);
    background: transparent;
    display: flex;
    align-items: flex-end;
    position: relative;

    .bar-value-top {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.68rem;
      font-weight: 800;
      color: var(--primary-600);
      white-space: nowrap;
      pointer-events: none;
      z-index: 5;
      animation: fadeIn 0.4s ease-out forwards;
      animation-delay: 0.5s;
      opacity: 0;
    }
  }

  .bar-fill-gradient {
    width: 100%;
    background: linear-gradient(180deg, var(--primary-400) 0%, var(--primary-600) 100%);
    border-radius: 4px 4px 0 0;
    position: relative;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    animation: growBar 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;

    &:hover {
      background: linear-gradient(180deg, var(--primary-300) 0%, var(--primary-500) 100%);
      box-shadow: 0 4px 12px rgba(3, 24, 56, 0.2);

      .custom-tooltip {
        opacity: 1;
        transform: translateY(-8px) translateX(-50%);
        visibility: visible;
      }
    }
  }

  @keyframes growBar {
    from {
      height: 0;
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .custom-tooltip {
    position: absolute;
    top: -55px;
    left: 50%;
    transform: translateY(0) translateX(-50%);
    background: var(--grey-900);
    color: white;
    padding: 0.45rem 0.75rem;
    border-radius: 6px;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    white-space: nowrap;
    z-index: 10;
    box-shadow: var(--shadow-3);
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: center;

    .t-month {
      font-size: 0.65rem;
      font-weight: 600;
      color: var(--grey-400);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .t-val {
      font-size: 0.85rem;
      font-weight: 800;
      color: white;
    }

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

  .bar-label-text {
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--grey-400);
    margin-top: 0.5rem;
    text-transform: uppercase;
  }

  /* Horizontal Progress Workload */
  .workload-list {
    display: flex;
    flex-direction: column;
    gap: 1.15rem;
  }

  .workload-item {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .label-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      &.completed { background: #10b981; }
      &.under-bidding { background: #8b5cf6; }
      &.in-progress { background: #3b82f6; }
      &.review { background: #f59e0b; }
      &.draft { background: #64748b; }
    }

    .status-name {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--grey-700);
    }

    .metric-wrapper {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .count-badge {
      font-size: 0.75rem;
      color: var(--grey-400);
      background: var(--grey-50);
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      font-weight: 500;
    }

    .percent-bold {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--grey-800);
    }

    .progress-track {
      width: 100%;
      height: 6px;
      background: var(--grey-100);
      border-radius: 50px;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      border-radius: 50px;
      transition: width 1s cubic-bezier(0.16, 1, 0.3, 1) backwards;

      &.completed { background: #10b981; }
      &.under-bidding { background: #8b5cf6; }
      &.in-progress { background: #3b82f6; }
      &.review { background: #f59e0b; }
      &.draft { background: #64748b; }
    }
  }

  /* Table styling */
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;

    th {
      padding: 1rem;
      color: var(--grey-500);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 2px solid var(--grey-100);
      background: var(--grey-50);
      font-weight: 700;
    }

    td {
      padding: 1.15rem 1rem;
      border-bottom: 1px solid var(--grey-100);
      font-size: 0.9rem;
      color: var(--grey-700);
      vertical-align: middle;
    }

    tbody tr:hover td { 
      background: var(--grey-50); 
    }
    
    tbody tr:last-child td { 
      border-bottom: none; 
    }
  }

  .job-tag-badge {
    font-weight: 700;
    color: var(--primary-600);
    font-size: 0.85rem;
    font-variant-numeric: tabular-nums;
  }

  .project-name-cell {
    font-weight: 500;
    color: var(--grey-800);
  }

  .numeric-val {
    font-variant-numeric: tabular-nums;
    font-weight: 500;
  }

  .valuation-cell {
    font-weight: 700;
    color: var(--grey-900);
    font-variant-numeric: tabular-nums;
  }

  .status-badge {
    padding: 0.3rem 0.75rem;
    border-radius: 5px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    display: inline-block;

    &.completed { background: #ecfdf5; color: #047857; }
    &.under-bidding { background: #f5f3ff; color: #6d28d9; }
    &.in-progress { background: #eff6ff; color: #1d4ed8; }
    &.review { background: #fffbeb; color: #b45309; }
    &.draft { background: #f8fafc; color: #475569; border: 1px solid var(--grey-200); }
  }

  /* Retention & Churn Card */
  .retention-card {
    margin-bottom: 2.5rem;
  }

  .retention-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .billings-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h5 {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--grey-800);
      margin: 0;
    }
  }

  .billings-list {
    display: flex;
    flex-direction: column;
    gap: 1.15rem;
  }

  .billing-item {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    .billing-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85rem;
      font-weight: 600;

      .c-name {
        color: var(--grey-700);
      }
      .c-val {
        color: var(--grey-900);
        font-weight: 700;
      }
    }

    .billing-progress-track {
      width: 100%;
      height: 6px;
      background: var(--grey-100);
      border-radius: 50px;
    }

    .billing-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, var(--primary-500) 0%, #7c3aed 100%);
      border-radius: 50px;
    }
  }

  .retention-metrics-column {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .gauge-wrapper {
    display: grid;
    grid-template-columns: 130px 1fr;
    align-items: center;
    gap: 1.75rem;
    background: linear-gradient(145deg, #ffffff 0%, var(--grey-50) 100%);
    padding: 1.5rem 1.75rem;
    border-radius: var(--radius);
    border: 1px solid var(--grey-100);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);

    @media (max-width: 576px) {
      grid-template-columns: 1fr;
      justify-items: center;
      text-align: center;
      gap: 1.25rem;
    }
  }

  .circular-gauge-container {
    position: relative;
    width: 130px;
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .circular-svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  .circle-track {
    fill: none;
    stroke: var(--grey-100);
    stroke-width: 8px;
  }

  .circle-progress {
    fill: none;
    stroke-width: 8px;
    stroke-linecap: round;
    transition: stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  }

  .gauge-inner-content {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 5;

    .rate-value {
      font-size: 1.65rem;
      font-weight: 850;
      color: var(--primary-600);
      letter-spacing: -0.02em;
      line-height: 1;
    }

    .rate-label {
      font-size: 0.58rem;
      color: var(--grey-400);
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 4px;
      text-align: center;
      line-height: 1.2;
    }
  }

  .gauge-legend-grid {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
  }

  .legend-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0.85rem;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.2s ease;
    border: 1px solid var(--grey-100);

    .badge-icon-box {
      width: 26px;
      height: 26px;
      border-radius: 6px;
      display: grid;
      place-items: center;
      
      svg {
        width: 14px;
        height: 14px;
        color: #ffffff;
      }
    }

    .badge-text-box {
      display: flex;
      flex-direction: column;
      line-height: 1.1;

      .c-num {
        font-size: 0.95rem;
        font-weight: 800;
      }
      .c-lbl {
        font-size: 0.68rem;
        color: var(--grey-500);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.3px;
      }
    }

    &.active-card {
      background: #ecfdf5;
      border-color: #d1fae5;
      .badge-icon-box { background: #10b981; }
      .c-num { color: #047857; }
      .c-lbl { color: #059669; }
    }

    &.warning-card {
      background: #fffbeb;
      border-color: #fef3c7;
      .badge-icon-box { background: #f59e0b; }
      .c-num { color: #b45309; }
      .c-lbl { color: #d97706; }
    }

    &.danger-card {
      background: #fef2f2;
      border-color: #fee2e2;
      .badge-icon-box { background: #dc2626; }
      .c-num { color: #b91c1c; }
      .c-lbl { color: #dc2626; }
    }
  }

  .risk-list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    h5 {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--grey-800);
      margin: 0;
    }
  }

  .risk-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .risk-item {
    background: var(--grey-50);
    padding: 0.75rem 1rem;
    border-radius: var(--radius);
    border: 1px solid var(--grey-100);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 600;

    .r-name {
      color: var(--grey-700);
    }

    .risk-badge {
      font-size: 0.68rem;
      font-weight: 700;
      padding: 0.15rem 0.5rem;
      border-radius: 4px;

      &.warning {
        background: #fffbeb;
        color: #b45309;
      }
      &.danger {
        background: #fef2f2;
        color: #b91c1c;
      }
    }
  }

  .clean-retention-state {
    padding: 1.5rem;
    background: #ecfdf5;
    color: #047857;
    border-radius: var(--radius);
    font-size: 0.85rem;
    font-weight: 600;
    text-align: center;
    border: 1px solid #d1fae5;
  }

  /* Dark Theme Overrides */
  body.dark-theme & {
    h2 { color: #ffffff !important; }
    p { color: #94a3b8; }

    .year-dropdown {
      background-color: #020617;
      border-color: #334155;
      color: #38bdf8;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2338bdf8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      
      &:hover, &:focus {
        border-color: #38bdf8;
      }
    }

    .bar-value-top {
      color: #38bdf8;
    }
    
    .time-badge {
      background: #0f172a;
      border-color: #1e293b;
      color: #38bdf8;
      .clock-icon { color: #38bdf8; }
      .divider { color: #334155; }
      .time-text { color: #f8fafc; }
    }

    .stat-card {
      background: #0f172a;
      border-color: #1e293b;

      .icon-box {
        background: #1e293b;
        color: var(--card-accent);
      }

      &:hover .icon-box {
        background: var(--card-accent);
        color: #ffffff;
      }

      .count { color: #ffffff; }
      .label { color: #94a3b8; }
      .card-footer-trend {
        border-top-color: #1e293b;
        .context { color: #64748b; }
      }
    }

    .card {
      background: #0f172a;
      border-color: #1e293b;
    }

    .card-header-main {
      h4 { color: #ffffff; }
      .card-subtitle { color: #64748b; }
      .trend-badge {
        background: rgba(37, 99, 235, 0.2);
        color: #38bdf8;
      }
    }

    .y-axis-labels { color: #64748b; }
    .gridlines .line { background: #1e293b; }
    
    .bar-fill-gradient {
      background: linear-gradient(180deg, #38bdf8 0%, #0369a1 100%);
      &:hover {
        background: linear-gradient(180deg, #7dd3fc 0%, #0284c7 100%);
      }
    }

    .custom-tooltip {
      background: #020617;
      border: 1px solid #1e293b;
      .t-val { color: #ffffff; }
      &::after { border-color: #020617 transparent transparent transparent; }
    }

    .bar-label-text { color: #64748b; }

    .workload-item {
      .status-name { color: #cbd5e1; }
      .count-badge { background: #020617; color: #94a3b8; }
      .percent-bold { color: #ffffff; }
      .progress-track { background: #1e293b; }
    }

    table {
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
        background: #020617;
      }
    }

    .job-tag-badge { color: #38bdf8; }
    .project-name-cell { color: #ffffff; }
    .valuation-cell { color: #ffffff; }
    
    .status-badge {
      &.completed { background: rgba(16, 185, 129, 0.2); color: #34d399; }
      &.under-bidding { background: rgba(139, 92, 246, 0.2); color: #a78bfa; }
      &.in-progress { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
      &.review { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }
      &.draft { background: rgba(71, 85, 105, 0.2); color: #cbd5e1; border-color: #334155; }
    }

    .billings-column h5,
    .risk-list-wrapper h5 {
      color: #ffffff;
    }

    .billing-item {
      .billing-info {
        .c-name { color: #cbd5e1; }
        .c-val { color: #ffffff; }
      }
      .billing-progress-track {
        background: #1e293b;
      }
    }

    .gauge-wrapper {
      background: linear-gradient(145deg, #0f172a 0%, #020617 100%);
      border-color: #1e293b;
      box-shadow: 0 4px 25px rgba(0, 0, 0, 0.25);
    }

    .circle-track {
      stroke: #1e293b;
    }

    .gauge-inner-content {
      .rate-value {
        color: #ffffff;
        text-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
      }
      .rate-label {
        color: #64748b;
      }
    }

    .legend-card {
      background: #090d16;
      border-color: #1e293b;

      .badge-text-box .c-lbl {
        color: #64748b;
      }

      &.active-card {
        background: rgba(16, 185, 129, 0.06);
        border-color: rgba(16, 185, 129, 0.2);
        .c-num { color: #34d399; }
        .c-lbl { color: #10b981; }
      }

      &.warning-card {
        background: rgba(245, 158, 11, 0.06);
        border-color: rgba(245, 158, 11, 0.2);
        .c-num { color: #fbbf24; }
        .c-lbl { color: #f59e0b; }
      }

      &.danger-card {
        background: rgba(220, 38, 38, 0.06);
        border-color: rgba(220, 38, 38, 0.2);
        .c-num { color: #f87171; }
        .c-lbl { color: #dc2626; }
      }
    }

    .clean-retention-state {
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border-color: rgba(16, 185, 129, 0.25);
    }

    .risk-item {
      background: #020617;
      border-color: #1e293b;
      .r-name { color: #cbd5e1; }
      
      .risk-badge {
        &.warning {
          background: rgba(245, 158, 11, 0.2);
          color: #fbbf24;
        }
        &.danger {
          background: rgba(220, 38, 38, 0.2);
          color: #f87171;
        }
      }
    }
  }

`;

export default Stats;
