import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { FaLock, FaEnvelope, FaUser, FaCheckCircle, FaArrowRight, FaShieldAlt, FaArrowLeft, FaPhone, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import { Country, City } from "country-state-city";
import { getCountryFromCountryName } from "country-codes-flags-phone-codes";
import logo from "../assets/images/logo1.png";
import illustration from "../assets/images/singup.svg";
import { EstimationContext } from "../context/EstimationContext";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const purchasedPlan = location.state?.plan || "";
  const { loadData } = useContext(EstimationContext);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phoneNumber: "", country: "", city: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Retrieve sorted list of countries
  const countriesList = Country.getAllCountries().sort((a, b) => a.name.localeCompare(b.name));

  // Find the selected country object
  const selectedCountryObj = countriesList.find(c => c.name === formData.country);

  // Retrieve unique sorted list of cities for the selected country
  const availableCities = selectedCountryObj 
    ? Array.from(new Set(City.getCitiesOfCountry(selectedCountryObj.isoCode).map(city => city.name))).sort()
    : [];

  useEffect(() => {
    document.body.classList.remove("dark-theme");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") {
      const countryObj = getCountryFromCountryName(value);
      const phoneCode = countryObj ? `${countryObj.dialCode} ` : "";
      setFormData({ ...formData, country: value, city: "", phoneNumber: phoneCode });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.country || !formData.city) {
      setErrorMsg("Please select both Country and City");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    try {
      const payload = {
        ...formData,
        userType: purchasedPlan ? "paid" : "demo",
      };
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || "Registration failed");
      }

      // Automatically log the user in after registration
      const loginRes = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const loginData = await loginRes.ok ? await loginRes.json() : null;
      if (!loginRes.ok) {
        throw new Error(loginData?.msg || "Login failed after registration");
      }
      await loadData();
      const redirectTo = location.state?.redirectTo || "/dashboard";
      navigate(redirectTo);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="main-container">
        {/* Left Side: Visual/Branding */}
        <div className="visual-side">
          <div className="content-wrap">
            <div className="branding">
              <img src={logo} alt="Logo" className="main-logo" />
            </div>

            <div className="illustration-container">
              <img src={illustration} alt="Register illustration" className="floating-img" />
              
              <div className="features-row">
                <div className="feature-pill">
                  <FaShieldAlt className="f-icon" />
                  <div className="f-text">
                    <h6>Secure Portal</h6>
                    <p>Enterprise Security</p>
                  </div>
                </div>
                <div className="feature-pill">
                  <FaCheckCircle className="f-icon" />
                  <div className="f-text">
                    <h6>100% Accurate</h6>
                    <p>Calculations</p>
                  </div>
                </div>
                <div className="feature-pill">
                  <FaCheckCircle className="f-icon" />
                  <div className="f-text">
                    <h6>PDF Export</h6>
                    <p>Advanced Tools</p>
                  </div>
                </div>
                <div className="feature-pill">
                  <FaCheckCircle className="f-icon" />
                  <div className="f-text">
                    <h6>Collaboration</h6>
                    <p>Team Access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="form-side">
          <div className="form-container">
            <button onClick={() => navigate("/")} className="back-btn">
              <FaArrowLeft /> Back to Home
            </button>

            <div className="form-header">
              <span className="step-label">Get Started</span>
              <h3>Create Your Account</h3>
              <p>Join thousands of professionals using Steel Bid.</p>
              {purchasedPlan && (
                <div style={{
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                  border: "1px solid #10b981",
                  borderRadius: "8px",
                  padding: "0.75rem 1rem",
                  marginTop: "1rem",
                  fontSize: "0.9rem",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <FaCheckCircle /> {purchasedPlan} Plan Activated! Complete signup to start quoting.
                </div>
              )}
              {errorMsg && (
                <div style={{ color: "#f87171", background: "rgba(239, 68, 68, 0.1)", padding: "0.75rem", borderRadius: "5px", marginTop: "1rem", fontSize: "0.9rem", fontWeight: "700" }}>
                  {errorMsg}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-row">
                <div className="input-group">
                  <label>Full Name</label>
                  <div className="field-wrap">
                    <FaUser className="field-icon" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Wick"
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Work Email</label>
                  <div className="field-wrap">
                    <FaEnvelope className="field-icon" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Country</label>
                  <div className="field-wrap">
                    <FaGlobe className="field-icon" />
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select Country</option>
                      {countriesList.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label>City</label>
                  <div className="field-wrap">
                    <FaMapMarkerAlt className="field-icon" />
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!formData.country}
                      required
                    >
                      <option value="" disabled>
                        {formData.country ? "Select City" : "Select Country first"}
                      </option>
                      {availableCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Mobile Number</label>
                  <div className="field-wrap">
                    <FaPhone className="field-icon" style={{ transform: "scaleX(-1)" }} />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="e.g. +1 (555) 000-0000"
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Password</label>
                  <div className="field-wrap">
                    <FaLock className="field-icon" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                <span>{loading ? "Creating Account..." : "Create Free Account"}</span>
                {!loading && <FaArrowRight className="arrow" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: white;
  font-family: "Roboto", sans-serif;
  overflow: hidden;

  .main-container {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    width: 100%;
    height: 100%;
  }

  /* Left Side - Visual Styling */
  .visual-side {
    position: relative;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    padding: 3rem;
    overflow: hidden;
    border-right: 1px solid #f1f5f9;
  }

  .content-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
  }

  .branding {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    
    .main-logo {
      height: 85px;
      width: auto;
      object-fit: contain;
    }
  }

  .illustration-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    gap: 2rem;
    
    .floating-img {
      width: 108%;
      max-width: 643px;
      height: auto;
      max-height: 73vh;
      object-fit: contain;
      animation: float 6s ease-in-out infinite;
    }
  }

  .features-row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  .feature-pill {
    background: #ffffff;
    border: 1px solid #f1f5f9;
    padding: 0.6rem 1rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.02);
    flex: 1;
    min-width: 160px;
    max-width: 200px;
    
    .f-icon {
      color: #f0781a;
      font-size: 1.1rem;
    }

    .f-text {
      h6 {
        color: #031838;
        margin: 0;
        font-size: 0.8rem;
        font-weight: 800;
      }
      p {
        color: #64748b;
        margin: 0;
        font-size: 0.65rem;
      }
    }
  }

  /* Right Side - Form Styling */
  .form-side {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: #031838;
    color: white;
    height: 100%;
    overflow-y: auto;
    position: relative;
  }

  .form-container {
    width: 100%;
    max-width: 580px;
    margin: auto 0;
  }

  .back-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    color: #94a3b8;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 2rem;
    transition: 0.3s;
    padding: 0;
    
    &:hover {
      color: #ffffff;
      transform: translateX(-5px);
    }
  }

  .form-header {
    margin-bottom: 2rem;
    
    .step-label {
      display: inline-block;
      padding: 0.3rem 0.8rem;
      background: rgba(240, 120, 26, 0.15);
      color: #f0781a;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 0.75rem;
    }

    h3 {
      font-size: 2rem;
      color: #ffffff;
      font-weight: 900;
      margin-bottom: 0.5rem;
      letter-spacing: -1px;
    }

    p {
      color: #94a3b8;
      font-size: 1rem;
    }
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  @media (max-width: 600px) {
    .form-row {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }

  .input-group {
    margin-bottom: 1.25rem;

    label {
      display: block;
      font-size: 0.9rem;
      font-weight: 700;
      color: #cbd5e1;
      margin-bottom: 0.5rem;
    }
  }

  .field-wrap {
    position: relative;
    display: flex;
    align-items: center;

    .field-icon {
      position: absolute;
      left: 1rem;
      color: #64748b;
      font-size: 1rem;
    }

    input, select {
      width: 100%;
      padding: 0.9rem 1.25rem 0.9rem 2.75rem;
      border: none;
      border-radius: 5px;
      font-size: 0.95rem;
      color: #ffffff;
      background: #1e293b;
      outline: none;

      &:focus {
        background: #334155;
        box-shadow: 0 0 0 3px rgba(240, 120, 26, 0.1);
      }
    }

    select {
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23cbd5e1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      background-size: 1.2em;
      padding-right: 2.5rem;
      cursor: pointer;
    }

    option {
      background: #1e293b;
      color: #ffffff;
    }
  }

  .submit-btn {
    width: 100%;
    padding: 1.1rem;
    background: #f0781a;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.05rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    cursor: pointer;
    margin-top: 1.5rem;

    &:hover {
      background: #f18a3e;
      transform: translateY(-1px);
    }
  }

  .divider {
    display: flex;
    align-items: center;
    margin: 1.5rem 0;
    color: #64748b;
    font-size: 0.85rem;
    font-weight: 600;
    
    &::before, &::after {
      content: "";
      flex: 1;
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
    }
    
    span {
      padding: 0 1rem;
    }
  }

  .google-btn {
    width: 100%;
    padding: 1rem;
    background: white;
    color: #1e293b;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    cursor: pointer;
    transition: 0.3s;
    
    .g-icon {
      font-size: 1.3rem;
    }

    &:hover {
      background: #f8fafc;
      transform: translateY(-1px);
    }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }

  @media (max-width: 1100px) {
    .visual-side { display: none; }
    .main-container { grid-template-columns: 1fr; }
    overflow-y: auto;
  }
`;

export default Register;
