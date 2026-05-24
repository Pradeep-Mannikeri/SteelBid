import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaCheckCircle, FaArrowRight, FaShieldAlt, FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logo.svg";
import loginImg from "../assets/images/login.svg";
import { EstimationContext } from "../context/EstimationContext";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loadData } = useContext(EstimationContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Explicitly ensure the body does NOT have dark-theme on this page
  useEffect(() => {
    document.body.classList.remove("dark-theme");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || "Login failed");
      }

      await loadData();
      navigate("/dashboard");
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
              <img src={loginImg} alt="Login illustration" className="floating-img" />
              
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
              <span className="step-label">Welcome Back</span>
              <h3>Sign In to Portal</h3>
              <p>Enter your credentials to access your dashboard.</p>
              {errorMsg && (
                <div style={{ color: "#f87171", background: "rgba(239, 68, 68, 0.1)", padding: "0.75rem", borderRadius: "5px", marginTop: "1rem", fontSize: "0.9rem", fontWeight: "700" }}>
                  {errorMsg}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="register-form">
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

              <div className="input-group">
                <label>Password</label>
                <div className="field-wrap">
                  <FaLock className="field-icon" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" /> <span>Remember me</span>
                </label>
                <button type="button" className="forgot-btn">Forgot Password?</button>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                <span>{loading ? "Logging In..." : "Login to Account"}</span>
                {!loading && <FaArrowRight className="arrow" />}
              </button>
            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            <button type="button" className="google-btn">
              <FcGoogle className="g-icon" />
              <span>Continue with Google</span>
            </button>
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
      width: 100%;
      max-width: 500px;
      height: auto;
      max-height: 50vh;
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
    padding: 3rem;
    background: #031838;
    color: white;
    height: 100%;
    position: relative;
  }

  .form-container {
    width: 100%;
    max-width: 400px;
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

    input {
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
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    .remember-me {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.85rem;
      color: #cbd5e1;
      cursor: pointer;
    }

    .forgot-btn {
      background: none;
      border: none;
      color: #f0781a;
      font-weight: 700;
      font-size: 0.85rem;
      cursor: pointer;
      &:hover { text-decoration: underline; }
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
    margin-top: 1rem;

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

export default Login;
