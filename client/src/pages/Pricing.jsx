import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaArrowLeft,
  FaCheck,
  FaTimes,
  FaCreditCard,
  FaBuilding,
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
} from "react-icons/fa";

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState("annual"); // "monthly" or "annual"
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentSubmitting, setPaymentSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Checkout Form State
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    company: "",
    email: "",
    cardNumber: "4111 1111 1111 1111",
    expiry: "12/28",
    cvc: "123",
  });

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  const handleBuyNow = (plan) => {
    if (plan.title === "Enterprise") {
      // Enterprise goes to contact/sales directly
      navigate("/");
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
      return;
    }
    setSelectedPlan(plan);
    setCheckoutModalOpen(true);
  };

  const handleFormChange = (e) => {
    setCheckoutForm({ ...checkoutForm, [e.target.name]: e.target.value });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setPaymentSubmitting(true);
    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setPaymentSubmitting(false);
    setPaymentSuccess(true);
  };

  const closeCheckout = () => {
    setCheckoutModalOpen(false);
    setPaymentSuccess(false);
    setCheckoutForm({
      name: "",
      company: "",
      email: "",
      cardNumber: "4111 1111 1111 1111",
      expiry: "12/28",
      cvc: "123",
    });
  };

  const handleActivation = () => {
    closeCheckout();
    // Route to registration with the purchased plan state
    navigate("/register", { state: { plan: selectedPlan.title } });
  };

  const plans = [
    {
      title: "Basic",
      priceMonthly: 49,
      priceAnnual: 39,
      desc: "Perfect for freelancers and small shops starting out.",
      features: [
        "Up to 5 Projects / mo",
        "Standard Estimator",
        "Client Repository",
        "Email Support (24h response)",
        "Single User Account",
        "Standard Quote Templates",
      ],
      featured: false,
    },
    {
      title: "Professional",
      priceMonthly: 99,
      priceAnnual: 79,
      desc: "Best for growing teams needing full detailing tools.",
      features: [
        "Unlimited Projects",
        "Advanced Estimator Engine",
        "Invoice & Invoice Tracker",
        "Priority Support (2h response)",
        "PDF & Spreadsheet Exports",
        "Custom Rate Templates",
        "Automatic Backups",
      ],
      featured: true,
    },
    {
      title: "Enterprise",
      priceMonthly: "Custom",
      priceAnnual: "Custom",
      desc: "Dedicated solutions for large-scale steel detailing firms.",
      features: [
        "Multi-user Access",
        "Custom Brand Formatting",
        "API Workflows Integration",
        "Dedicated Account Manager",
        "Custom Detailing Calculator Modules",
        "SLA Support Agreement",
      ],
      featured: false,
    },
  ];

  return (
    <Wrapper>
      <div className="pricing-header-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <span className="branding-title">Steel Bid Premium</span>
      </div>

      <header className="page-intro">
        <span className="pill-tag">Flexible Pricing Plans</span>
        <h2>Choose the plan that scales with your business</h2>
        <p>Get instant access to accurate detailing hours estimation and competitive bid scheduling.</p>

        {/* Toggle Switch */}
        <div className="cycle-toggle-wrapper">
          <span className={billingCycle === "monthly" ? "cycle-label active" : "cycle-label"}>Monthly</span>
          <button 
            className="toggle-track" 
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
          >
            <div className={`toggle-thumb ${billingCycle}`} />
          </button>
          <span className={billingCycle === "annual" ? "cycle-label active" : "cycle-label"}>
            Billed Annually <span className="discount-tag">Save 20%</span>
          </span>
        </div>
      </header>

      {/* Plan Cards Grid */}
      <section className="plans-grid">
        {plans.map((p, i) => {
          const isCustom = p.priceMonthly === "Custom";
          const displayPrice = isCustom
            ? "Custom"
            : billingCycle === "monthly"
            ? `$${p.priceMonthly}`
            : `$${p.priceAnnual}`;

          return (
            <div className={`plan-card ${p.featured ? "featured" : ""}`} key={i}>
              {p.featured && <div className="featured-banner">Most Popular</div>}
              <h3>{p.title}</h3>
              <div className="price-box">
                <span className="currency-symbol">{isCustom ? "" : "$"}</span>
                <span className="price-amount">{isCustom ? "Custom" : billingCycle === "monthly" ? p.priceMonthly : p.priceAnnual}</span>
                {!isCustom && <span className="billing-period">/ month</span>}
              </div>
              {billingCycle === "annual" && !isCustom && (
                <div className="annual-billed-info">Billed annually (${p.priceAnnual * 12}/yr)</div>
              )}
              <p className="desc">{p.desc}</p>
              
              <ul className="plan-features">
                {p.features.map((f, j) => (
                  <li key={j}>
                    <FaCheck className="tick-icon" /> {f}
                  </li>
                ))}
              </ul>

              <button 
                type="button" 
                className={`buy-btn ${p.featured ? "primary-buy" : "secondary-buy"}`}
                onClick={() => handleBuyNow(p)}
              >
                {isCustom ? "Talk to Sales" : "Buy Plan Service"}
              </button>
            </div>
          );
        })}
      </section>

      {/* Features Comparison Matrix */}
      <section className="matrix-section">
        <h3>Compare plan features in detail</h3>
        <div className="table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Features</th>
                <th>Basic</th>
                <th>Professional</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="feat-name">Monthly Projects</td>
                <td>Up to 5</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td className="feat-name">Estimator Capabilities</td>
                <td>Structural Steel Detailing</td>
                <td>Structural & Misc Steel</td>
                <td>Fully Customizable Classes</td>
              </tr>
              <tr>
                <td className="feat-name">PDF Quotation Generator</td>
                <td><FaCheck className="cell-tick" /></td>
                <td><FaCheck className="cell-tick" /></td>
                <td><FaCheck className="cell-tick" /></td>
              </tr>
              <tr>
                <td className="feat-name">Invoice Tracker</td>
                <td className="cell-cross">—</td>
                <td><FaCheck className="cell-tick" /></td>
                <td><FaCheck className="cell-tick" /></td>
              </tr>
              <tr>
                <td className="feat-name">Export to Excel / CSV</td>
                <td className="cell-cross">—</td>
                <td><FaCheck className="cell-tick" /></td>
                <td><FaCheck className="cell-tick" /></td>
              </tr>
              <tr>
                <td className="feat-name">Support Tier</td>
                <td>Email (24-hour response)</td>
                <td>Priority (2-hour response)</td>
                <td>Dedicated Account Manager 24/7</td>
              </tr>
              <tr>
                <td className="feat-name">Team Collaboration</td>
                <td className="cell-cross">—</td>
                <td className="cell-cross">—</td>
                <td>Unlimited Users</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Stripe-style Mock Checkout Modal */}
      {checkoutModalOpen && (
        <ModalOverlay onClick={closeCheckout}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={closeCheckout}>
              <FaTimes />
            </CloseBtn>

            {paymentSuccess ? (
              <SuccessContainer>
                <div className="success-icon-wrap">
                  <FaCheck />
                </div>
                <h3>Upgrade Successful!</h3>
                <p className="success-msg">
                  Thank you! Your payment for the <strong>Steel Bid {selectedPlan?.title}</strong> subscription has been processed successfully.
                </p>
                <div className="transaction-box">
                  <div className="txn-row">
                    <span>Transaction ID:</span>
                    <strong>SB-{Math.floor(10000000 + Math.random() * 90000000)}</strong>
                  </div>
                  <div className="txn-row">
                    <span>Plan:</span>
                    <strong>{selectedPlan?.title} Plan ({billingCycle})</strong>
                  </div>
                  <div className="txn-row">
                    <span>Status:</span>
                    <span className="success-badge">Paid & Active</span>
                  </div>
                </div>
                <p className="activate-note">
                  To apply this license and access the dashboard, please complete your user registration.
                </p>
                <button type="button" className="action-btn" onClick={handleActivation}>
                  Activate License & Register Account
                </button>
              </SuccessContainer>
            ) : (
              <CheckoutGrid>
                {/* Checkout Summary Column */}
                <CheckoutSummary>
                  <h4>Order Summary</h4>
                  <div className="plan-summary-card">
                    <h5>Steel Bid {selectedPlan?.title}</h5>
                    <p className="summary-desc">{selectedPlan?.desc}</p>
                    <div className="price-row">
                      <span>Subtotal ({billingCycle})</span>
                      <strong>
                        ${selectedPlan ? (billingCycle === "monthly" ? selectedPlan.priceMonthly : selectedPlan.priceAnnual) : 0}/mo
                      </strong>
                    </div>
                    {billingCycle === "annual" && (
                      <div className="annual-billed">Billed annually (${selectedPlan ? selectedPlan.priceAnnual * 12 : 0}/yr)</div>
                    )}
                  </div>
                  
                  <div className="pricing-math">
                    <div className="math-row">
                      <span>Billed Amount:</span>
                      <span>
                        ${selectedPlan ? (billingCycle === "monthly" ? selectedPlan.priceMonthly : selectedPlan.priceAnnual * 12) : 0}.00
                      </span>
                    </div>
                    <div className="math-row">
                      <span>Taxes (0%):</span>
                      <span>$0.00</span>
                    </div>
                    <div className="math-row total">
                      <span>Total Due Today:</span>
                      <span>
                        ${selectedPlan ? (billingCycle === "monthly" ? selectedPlan.priceMonthly : selectedPlan.priceAnnual * 12) : 0}.00
                      </span>
                    </div>
                  </div>

                  <div className="secure-badge">
                    <FaLock /> Secured 256-bit SSL Transaction
                  </div>
                </CheckoutSummary>

                {/* Checkout Payment Form Column */}
                <CheckoutForm onSubmit={handlePaymentSubmit}>
                  <h4>Secure Payment Details</h4>
                  
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <div className="input-wrap">
                      <FaUser className="input-icon" />
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        placeholder="e.g. John Doe"
                        value={checkoutForm.name}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="form-group-row">
                    <div className="form-group">
                      <label>Company Name</label>
                      <div className="input-wrap">
                        <FaBuilding className="input-icon" />
                        <input 
                          type="text" 
                          name="company" 
                          required 
                          placeholder="e.g. Metalworks LLC"
                          value={checkoutForm.company}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Billing Email</label>
                      <div className="input-wrap">
                        <FaEnvelope className="input-icon" />
                        <input 
                          type="email" 
                          name="email" 
                          required 
                          placeholder="billing@company.com"
                          value={checkoutForm.email}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Credit Card Number</label>
                    <div className="input-wrap">
                      <FaCreditCard className="input-icon" />
                      <input 
                        type="text" 
                        name="cardNumber" 
                        required 
                        placeholder="4111 1111 1111 1111"
                        value={checkoutForm.cardNumber}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="form-group-row">
                    <div className="form-group">
                      <label>Expiration Date</label>
                      <div className="input-wrap">
                        <FaCalendarAlt className="input-icon" />
                        <input 
                          type="text" 
                          name="expiry" 
                          required 
                          placeholder="MM/YY"
                          value={checkoutForm.expiry}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>CVC / CVV</label>
                      <div className="input-wrap">
                        <FaLock className="input-icon" />
                        <input 
                          type="text" 
                          name="cvc" 
                          required 
                          placeholder="3 digits"
                          value={checkoutForm.cvc}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="pay-submit-btn"
                    disabled={paymentSubmitting}
                  >
                    {paymentSubmitting ? (
                      <span className="spinner-wrapper">
                        <span className="checkout-spinner" /> Processing Securely...
                      </span>
                    ) : (
                      <>
                        <FaLock /> Pay and Complete Purchase
                      </>
                    )}
                  </button>
                </CheckoutForm>
              </CheckoutGrid>
            )}
          </ModalContainer>
        </ModalOverlay>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  background: var(--grey-50);
  font-family: "Roboto", sans-serif;
  color: var(--grey-900);
  padding: 0 0 8rem 0;

  .pricing-header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 5%;
    background: var(--white);
    border-bottom: 1px solid var(--grey-200);

    .back-btn {
      background: none;
      border: none;
      font-weight: 700;
      color: var(--grey-600);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.95rem;
      transition: all 0.3s;
      &:hover {
        color: var(--primary-600);
        transform: translateX(-3px);
      }
    }

    .branding-title {
      font-weight: 900;
      font-size: 1.15rem;
      background: linear-gradient(135deg, var(--primary-700) 0%, var(--primary-400) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .page-intro {
    text-align: center;
    padding: 5rem 5% 3.5rem;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .pill-tag {
      font-size: 0.72rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--primary-600);
      background: var(--primary-50);
      border: 1px solid var(--primary-200);
      padding: 0.3rem 0.9rem;
      border-radius: 999px;
      margin-bottom: 1.25rem;
    }

    h2 {
      font-size: 2.75rem;
      font-weight: 900;
      letter-spacing: -0.03em;
      line-height: 1.15;
      margin-bottom: 1rem;
      color: var(--grey-900);
    }

    p {
      color: var(--grey-500);
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2.5rem;
    }
  }

  /* Cycle Toggle Switch */
  .cycle-toggle-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: var(--white);
    padding: 0.5rem 1.25rem;
    border-radius: 100px;
    border: 1px solid var(--grey-200);
    box-shadow: var(--shadow-1);

    .cycle-label {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--grey-400);
      transition: all 0.3s;
      &.active {
        color: var(--grey-900);
      }

      .discount-tag {
        font-size: 0.7rem;
        background: #ecfdf5;
        color: #059669;
        border: 1px solid #a7f3d0;
        padding: 0.15rem 0.5rem;
        border-radius: 99px;
        font-weight: 700;
        margin-left: 0.25rem;
      }
    }

    .toggle-track {
      background: var(--primary-100);
      border: none;
      width: 48px;
      height: 26px;
      border-radius: 100px;
      padding: 3px;
      cursor: pointer;
      position: relative;
    }

    .toggle-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--primary-600);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      &.monthly {
        transform: translateX(0);
      }
      &.annual {
        transform: translateX(22px);
      }
    }
  }

  /* Plans Cards Grid */
  .plans-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 5%;
    align-items: stretch;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
      max-width: 450px;
    }
  }

  .plan-card {
    background: var(--white);
    border: 1px solid var(--grey-200);
    border-radius: 20px;
    padding: 3rem 2rem 2.5rem;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: var(--shadow-1);

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.06);
    }

    &.featured {
      border: 2px solid var(--primary-600);
      box-shadow: 0 15px 35px rgba(3, 24, 56, 0.08);
      transform: scale(1.03);

      &:hover {
        transform: translateY(-8px) scale(1.03);
      }

      @media (max-width: 992px) {
        transform: scale(1);
        &:hover { transform: translateY(-8px) scale(1); }
      }
    }

    .featured-banner {
      position: absolute;
      top: 1.25rem;
      right: 1.5rem;
      font-size: 0.7rem;
      font-weight: 800;
      color: var(--primary-700);
      background: var(--primary-50);
      border: 1px solid var(--primary-200);
      padding: 0.3rem 0.8rem;
      border-radius: 99px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    h3 {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--grey-900);
      margin-bottom: 1rem;
    }

    .price-box {
      display: flex;
      align-items: baseline;
      margin-bottom: 0.5rem;

      .currency-symbol {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--grey-800);
      }

      .price-amount {
        font-size: 3.5rem;
        font-weight: 900;
        color: var(--grey-900);
        letter-spacing: -0.03em;
        line-height: 1;
      }

      .billing-period {
        font-size: 0.95rem;
        color: var(--grey-500);
        margin-left: 0.35rem;
        font-weight: 500;
      }
    }

    .annual-billed-info {
      font-size: 0.78rem;
      color: #059669;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }

    .desc {
      color: var(--grey-600);
      font-size: 0.95rem;
      line-height: 1.5;
      margin-bottom: 2rem;
      min-height: 48px;
    }

    .plan-features {
      list-style: none;
      padding: 0;
      margin: 0 0 2.5rem 0;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      flex: 1;

      li {
        display: flex;
        align-items: flex-start;
        gap: 0.65rem;
        font-size: 0.95rem;
        color: var(--grey-700);
        line-height: 1.4;

        .tick-icon {
          color: var(--primary-500);
          font-size: 0.85rem;
          margin-top: 0.25rem;
          flex-shrink: 0;
        }
      }
    }

    .buy-btn {
      width: 100%;
      padding: 0.9rem;
      border-radius: 10px;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s;
      border: 2px solid transparent;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .primary-buy {
      background: var(--primary-600);
      color: white;
      &:hover {
        background: var(--primary-700);
        transform: translateY(-2px);
        box-shadow: 0 10px 20px -8px rgba(3, 24, 56, 0.4);
      }
    }

    .secondary-buy {
      background: transparent;
      border-color: var(--primary-600);
      color: var(--primary-600);
      &:hover {
        background: var(--primary-50);
        transform: translateY(-2px);
      }
    }
  }

  /* Comparison Matrix Section */
  .matrix-section {
    max-width: 1000px;
    margin: 6rem auto 0;
    padding: 0 5%;

    h3 {
      text-align: center;
      font-size: 1.75rem;
      font-weight: 800;
      margin-bottom: 2.5rem;
    }

    .table-wrapper {
      background: var(--white);
      border-radius: 16px;
      border: 1px solid var(--grey-200);
      box-shadow: var(--shadow-1);
      overflow-x: auto;
    }

    .comparison-table {
      width: 100%;
      border-collapse: collapse;
      text-align: center;

      th, td {
        padding: 1.2rem 1.5rem;
        border-bottom: 1px solid var(--grey-100);
      }

      th {
        font-weight: 700;
        color: var(--grey-800);
        background: var(--grey-50);
        font-size: 0.95rem;
        &:first-child { text-align: left; }
      }

      td {
        font-size: 0.95rem;
        color: var(--grey-700);
        &:first-child { 
          text-align: left; 
          font-weight: 600;
          color: var(--grey-900);
        }
      }

      tr:last-child td { border-bottom: none; }

      .cell-tick {
        color: #10b981;
        font-size: 1rem;
      }

      .cell-cross {
        color: var(--grey-300);
      }
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(8px);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;

  @keyframes fadeIn {
    to { opacity: 1; }
  }
`;

const ModalContainer = styled.div`
  background: var(--white);
  border-radius: 20px;
  width: 100%;
  max-width: 900px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
  transform: scale(0.95) translateY(20px);
  animation: modalEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  @keyframes modalEnter {
    to {
      transform: scale(1) translateY(0);
    }
  }

  @media (max-width: 768px) {
    max-height: 90vh;
    overflow-y: auto;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: var(--grey-100);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 0.95rem;
  color: var(--grey-500);
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s;

  &:hover {
    background: var(--grey-200);
    color: var(--grey-900);
    transform: rotate(90deg);
  }
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  min-height: 520px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CheckoutSummary = styled.div`
  background: #f8fafc;
  border-right: 1px solid var(--grey-200);
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid var(--grey-200);
  }

  h4 {
    font-size: 1.15rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    color: var(--grey-800);
  }

  .plan-summary-card {
    background: var(--white);
    border: 1px solid var(--grey-200);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: var(--shadow-1);
    margin-bottom: 2rem;

    h5 {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--primary-700);
      margin-bottom: 0.35rem;
    }
    
    .summary-desc {
      font-size: 0.85rem;
      color: var(--grey-500);
      line-height: 1.4;
      margin-bottom: 1rem;
    }

    .price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--grey-100);
      padding-top: 0.85rem;
      span { font-size: 0.88rem; font-weight: 600; color: var(--grey-600); }
      strong { font-size: 1.1rem; font-weight: 800; color: var(--grey-900); }
    }

    .annual-billed {
      font-size: 0.72rem;
      color: #059669;
      font-weight: 700;
      margin-top: 0.25rem;
      text-align: right;
    }
  }

  .pricing-math {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 2rem;

    .math-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      color: var(--grey-600);
      
      &.total {
        border-top: 2px solid var(--grey-200);
        padding-top: 0.85rem;
        font-weight: 800;
        font-size: 1.1rem;
        color: var(--grey-900);
      }
    }
  }

  .secure-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--grey-500);
    svg {
      color: #10b981;
    }
  }
`;

const CheckoutForm = styled.form`
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h4 {
    font-size: 1.15rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    color: var(--grey-800);
  }

  .form-group-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1.25rem;

    label {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--grey-500);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;

    .input-icon {
      position: absolute;
      left: 1rem;
      color: var(--grey-400);
      font-size: 0.9rem;
    }

    input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 1.5px solid var(--grey-200);
      border-radius: 8px;
      font-size: 0.92rem;
      color: var(--grey-900);
      background: #f8fafc;
      transition: all 0.2s;
      outline: none;

      &:focus {
        border-color: var(--primary-500);
        background: white;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
      }
    }
  }

  .pay-submit-btn {
    width: 100%;
    padding: 1rem;
    background: var(--primary-600);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    margin-top: 1rem;

    &:hover {
      background: var(--primary-700);
      transform: translateY(-2px);
      box-shadow: 0 10px 20px -8px rgba(3, 24, 56, 0.45);
    }

    &:disabled {
      background: var(--grey-300);
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  }

  .spinner-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .checkout-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid white;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  }
`;

const SuccessContainer = styled.div`
  padding: 4rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: modalSuccessScale 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  @keyframes modalSuccessScale {
    from {
      opacity: 0;
      transform: scale(0.92);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .success-icon-wrap {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #ecfdf5;
    border: 2px solid #a7f3d0;
    color: #10b981;
    display: grid;
    place-items: center;
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 10px 20px rgba(16, 185, 129, 0.1);
  }

  h3 {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--grey-900);
    margin-bottom: 0.75rem;
    letter-spacing: -0.02em;
  }

  .success-msg {
    font-size: 1.05rem;
    color: var(--grey-600);
    line-height: 1.5;
    max-width: 480px;
    margin-bottom: 2rem;
  }

  .transaction-box {
    background: #f8fafc;
    border: 1px solid var(--grey-200);
    border-radius: 12px;
    padding: 1.25rem 2rem;
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 2.5rem;

    .txn-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
      span { color: var(--grey-500); }
      strong { color: var(--grey-900); font-weight: 700; }
      .success-badge {
        font-size: 0.75rem;
        font-weight: 700;
        background: #ecfdf5;
        color: #059669;
        border: 1px solid #a7f3d0;
        padding: 0.15rem 0.5rem;
        border-radius: 99px;
      }
    }
  }

  .activate-note {
    font-size: 0.85rem;
    color: var(--grey-500);
    margin-bottom: 1.5rem;
    max-width: 400px;
    line-height: 1.4;
  }

  .action-btn {
    padding: 1rem 2.5rem;
    background: var(--primary-600);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 10px 20px -8px rgba(3, 24, 56, 0.45);

    &:hover {
      background: var(--primary-700);
      transform: translateY(-2px);
    }
  }
`;

export default Pricing;
