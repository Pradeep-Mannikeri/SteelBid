import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import {
  FaCalculator,
  FaChartLine,
  FaFileInvoiceDollar,
  FaUsers,
  FaArrowRight,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaUserPlus,
  FaClock,
  FaFileInvoice,
  FaCircle,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaCheck,
} from "react-icons/fa";

import {
  Wrapper,
  Navbar,
  HeroSection,
  FeaturesSection,
  StatsSection,
  HowItWorksSection,
  PricingSection,
  CtaSection,
  Footer,
} from "../assets/Wrappers/LandingPage";

const AnimatedCounter = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const end = parseFloat(target);
    if (isNaN(end)) return;

    const startTime = performance.now();
    const hasDecimal = target.toString().includes(".");
    const decimals = hasDecimal ? target.toString().split(".")[1].length : 0;

    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCount(easeProgress * end);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [target, duration, isVisible]);

  const formattedCount = count.toLocaleString(undefined, {
    minimumFractionDigits: target.toString().includes(".")
      ? target.toString().split(".")[1].length
      : 0,
    maximumFractionDigits: target.toString().includes(".")
      ? target.toString().split(".")[1].length
      : 0,
  });

  return (
    <span ref={countRef}>
      {formattedCount}
      {suffix}
    </span>
  );
};

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const LandingPage = () => {
  const [statsRef, statsInView] = useInView(0.05);
  const [featRef, featInView] = useInView(0.05);
  const [stepsRef, stepsInView] = useInView(0.05);
  const [pricingRef, pricingInView] = useInView(0.05);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Start at the top on reload
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Wrapper id="top">
      <Navbar className={scrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>
          <div className="nav-links">
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("features")
                  .scrollIntoView({ behavior: "smooth" });
              }}
              className="nav-link"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("how-it-works")
                  .scrollIntoView({ behavior: "smooth" });
              }}
              className="nav-link"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("pricing")
                  .scrollIntoView({ behavior: "smooth" });
              }}
              className="nav-link"
            >
              Pricing
            </a>
            <div className="nav-auth">
              <Link to="/login" className="btn secondary-btn nav-auth-btn">
                Login
              </Link>
              <Link to="/register" className="btn main-btn nav-auth-btn">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </Navbar>

      <HeroSection>
        <div className="hero-inner">
          <div className="hero-content">
            <h1>Faster Quotes Better Wins...</h1>
            <p>
              Say goodbye to clunky Excel spreadsheets. Manage your bids,
              estimate hours, generate invoices, and analyze business metrics
              all in one enterprise platform.
            </p>
            <div className="hero-actions">
              <Link to="/dashboard" className="btn main-btn hero-btn">
                Get Started <FaArrowRight />
              </Link>
              <Link to="/login" className="btn outline-btn hero-btn portal-btn">
                Client Portal
              </Link>
            </div>
          </div>
          <div className="hero-image-placeholder">
            <div className="glass-card">
              <div className="calc-topbar">
                <div className="calc-topbar-left">
                  <div className="calc-icon">
                    <FaCalculator />
                  </div>
                  <div>
                    <span className="calc-title">Estimation Calculator</span>
                    <span className="calc-project">Steel Bid · SD-2501</span>
                  </div>
                </div>
                <span className="calc-live">
                  <FaCircle className="pulse-dot" /> Live
                </span>
              </div>

              <div className="calc-screen">
                <span className="screen-label">ESTIMATED TOTAL</span>
                <span className="screen-value">$16,675.00</span>
                <div className="screen-sub">
                  <span>145 hrs</span>
                  <span className="dot">·</span>
                  <span>$115.00 / hr</span>
                  <span className="dot">·</span>
                  <span className="under-bid">Under Bidding</span>
                </div>
              </div>

              <div className="calc-rows">
                {[
                  { label: "Modeling Hours", hrs: 72, pct: 72 },
                  { label: "Detailing Hours", hrs: 55, pct: 55 },
                  { label: "Review & QA", hrs: 18, pct: 30 },
                ].map((r, i) => (
                  <div className="calc-row" key={i}>
                    <span className="row-label">{r.label}</span>
                    <div className="row-track">
                      <div
                        className="row-fill"
                        style={{
                          width: `${r.pct}%`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    </div>
                    <span className="row-hrs">{r.hrs} hrs</span>
                    <span className="row-amt">
                      ${(r.hrs * 115).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="calc-footer">
                <div className="calc-chip">Rate: $115/hr</div>
                <div className="calc-chip">Total: 145 hrs</div>
                <div className="calc-chip accent">99.9% Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </HeroSection>

      <FeaturesSection id="features">
        <div className="feat-inner">
          <div className="section-header">
            <span className="feat-label">Platform Features</span>
            <h2>Everything you need to scale</h2>
            <p>
              Built exclusively for steel detailing firms to streamline
              operations from bidding to billing.
            </p>
          </div>
          <div className="features-grid" ref={featRef}>
            {[
              {
                icon: <FaCalculator />,
                num: "01",
                title: "Advanced Estimator",
                desc: "Calculate modeling and detailing hours with precision using our interactive spreadsheet replacement.",
                tag: "Core Tool",
              },
              {
                icon: <FaUsers />,
                num: "02",
                title: "Client Repository",
                desc: "Keep track of all your clients, contact persons, and ongoing project statuses in one centralized hub.",
                tag: "CRM",
              },
              {
                icon: <FaChartLine />,
                num: "03",
                title: "Real-time Analytics",
                desc: "Visualize your business growth, view monthly revenue, and track completed jobs with dynamic charts.",
                tag: "Insights",
              },
              {
                icon: <FaFileInvoiceDollar />,
                num: "04",
                title: "Seamless Invoicing",
                desc: "Generate, download, and manage invoices instantly for completed estimations without leaving the app.",
                tag: "Billing",
              },
            ].map((f, i) => (
              <div
                className="feature-card"
                key={i}
                style={{
                  opacity: featInView ? 1 : 0,
                  transform: featInView ? "translateY(0)" : "translateY(60px)",
                  transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.15}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.15}s`,
                }}
              >
                <div className="card-num">{f.num}</div>
                <div className="card-icon">{f.icon}</div>
                <span className="card-tag">{f.tag}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div className="card-line" />
              </div>
            ))}
          </div>
        </div>
      </FeaturesSection>

      <StatsSection>
        <div className="stats-header">
          <span className="stats-label">Our Impact</span>
          <h2>Numbers that speak for themselves</h2>
          <p>
            Trusted by steel detailing professionals to deliver accuracy, speed,
            and results.
          </p>
        </div>
        <div className="stats-grid" ref={statsRef}>
          {[
            {
              target: "15000",
              suffix: "+",
              duration: 2500,
              label: "Hours Saved Annually",
            },
            {
              target: "99.9",
              suffix: "%",
              duration: 2000,
              label: "Estimation Accuracy",
            },
            {
              target: "50",
              suffix: "+",
              duration: 2000,
              label: "Active Detailing Firms",
            },
            {
              target: "100",
              suffix: "%",
              duration: 2500,
              label: "Client Satisfaction",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="stat-item"
              style={{
                opacity: statsInView ? 1 : 0,
                transform: statsInView ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s`,
              }}
            >
              <span className="stat-value">
                <AnimatedCounter
                  target={s.target}
                  suffix={s.suffix}
                  duration={s.duration}
                />
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </StatsSection>

      <HowItWorksSection id="how-it-works">
        <div className="section-header">
          <span className="section-label">Simple Process</span>
          <h2>How It Works</h2>
          <p>A streamlined workflow designed to save you hours every week.</p>
        </div>
        <div className="steps-container" ref={stepsRef}>
          <div
            className="step-card"
            style={{
              opacity: stepsInView ? 1 : 0,
              transform: stepsInView ? "translateY(0)" : "translateY(60px)",
              transition:
                "opacity 0.6s cubic-bezier(0.22,1,0.36,1) 0s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0s",
            }}
          >
            <div className="step-badge">01</div>
            <div className="step-icon-wrap">
              <FaUserPlus />
            </div>
            <h4>Add Company Info</h4>
            <p>
              Create a new client profile by entering contact person and company details into
              the system.
            </p>
          </div>
          <div
            className="step-arrow"
            style={{
              opacity: stepsInView ? 1 : 0,
              transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1) 0.15s",
            }}
          >
            →
          </div>
          <div
            className="step-card"
            style={{
              opacity: stepsInView ? 1 : 0,
              transform: stepsInView ? "translateY(0)" : "translateY(60px)",
              transition:
                "opacity 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s",
            }}
          >
            <div className="step-badge">02</div>
            <div className="step-icon-wrap">
              <FaClock />
            </div>
            <h4>Calculate Hours</h4>
            <p>
              Use our advanced calculator to input structural members and let
              the system compute totals.
            </p>
          </div>
          <div
            className="step-arrow"
            style={{
              opacity: stepsInView ? 1 : 0,
              transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1) 0.45s",
            }}
          >
            →
          </div>
          <div
            className="step-card"
            style={{
              opacity: stepsInView ? 1 : 0,
              transform: stepsInView ? "translateY(0)" : "translateY(60px)",
              transition:
                "opacity 0.6s cubic-bezier(0.22,1,0.36,1) 0.6s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.6s",
            }}
          >
            <div className="step-badge">03</div>
            <div className="step-icon-wrap">
              <FaFileInvoice />
            </div>
            <h4>Review &amp; Invoice</h4>
            <p>
              Monitor the bid status, approve the work, and automatically track
              the generated invoice.
            </p>
          </div>
        </div>
      </HowItWorksSection>

      <PricingSection id="pricing">
        <div className="section-header" ref={pricingRef}>
          <span className="section-label">Pricing Plans</span>
          <h2>Simple, transparent pricing</h2>
          <p>Choose the plan that fits your detailing firm's needs.</p>
        </div>
        <div className="pricing-grid">
          {[
            {
              title: "Basic",
              price: "$49",
              desc: "Perfect for freelancers and small shops starting out.",
              features: [
                "Up to 5 Projects/mo",
                "Basic Estimator",
                "Client Repository",
                "Email Support",
              ],
            },
            {
              title: "Professional",
              price: "$99",
              desc: "Best for growing teams needing full detailing tools.",
              features: [
                "Unlimited Projects",
                "Advanced Estimator",
                "Invoice Generation",
                "Priority Support",
                "PDF Exports",
              ],
              featured: true,
            },
            {
              title: "Enterprise",
              price: "Custom",
              desc: "Dedicated solutions for large-scale steel detailing firms.",
              features: [
                "Multi-user Access",
                "Custom Branding",
                "API Integration",
                "Account Manager",
                "Custom Workflows",
              ],
            },
          ].map((p, i) => (
            <div
              className={`pricing-card ${p.featured ? "featured" : ""}`}
              key={i}
              style={{
                opacity: pricingInView ? 1 : 0,
                transform: pricingInView ? "translateY(0)" : "translateY(60px)",
                transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.15}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.15}s`,
              }}
            >
              {p.featured && <div className="ribbon">Most Popular</div>}
              <h3>{p.title}</h3>
              <div className="price">
                <strong>{p.price}</strong>
                {p.price !== "Custom" && <span>/mo</span>}
              </div>
              <p className="desc">{p.desc}</p>
              <ul className="features">
                {p.features.map((f, j) => (
                  <li key={j}>
                    <FaCheck className="check-icon" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`btn full-width ${p.featured ? "main-btn" : "secondary-btn"}`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </PricingSection>

      <CtaSection>
        <div className="cta-box">
          <div className="cta-content">
            <h2>Ready to transform your detailing business?</h2>
            <p>
              Join the growing community of detailers who have reclaimed their
              time and improved their win rates.
            </p>
          </div>
          <div className="cta-actions">
            <Link to="/register" className="btn main-btn hero-btn">
              Start Your Free Trial
            </Link>
            <Link to="/login" className="btn outline-btn hero-btn">
              Talk to Sales
            </Link>
          </div>
        </div>
      </CtaSection>

      <Footer>
        <div className="footer-container">
          <div className="footer-widget">
            <Link to="/" className="footer-logo">
              <img src={logo} alt="Logo" className="logo-img" />
            </Link>
            <p className="footer-desc">
              Steel Bid is a modern estimation and project management platform
              built exclusively for steel detailing professionals. Streamline
              your bids, track clients, generate invoices, and monitor business
              performance — all in one place.
            </p>
            <div className="social-links">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="footer-widget">
            <h3 className="widget-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Pricing Plan</a>
              </li>
              <li>
                <a href="#">Our Team</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="footer-widget">
            <h3 className="widget-title">Support</h3>
            <ul className="footer-links">
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Documentation</a>
              </li>
            </ul>
          </div>

          <div className="footer-widget">
            <h3 className="widget-title">Contact Info</h3>
            <ul className="contact-info">
              <li>
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div>123 Street, New York, USA</div>
              </li>
              <li>
                <div className="contact-icon">
                  <FaPhoneAlt />
                </div>
                <div>
                  +1 234 567 890 <br /> +1 098 765 432
                </div>
              </li>
              <li>
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div>
                  info@example.com <br /> support@example.com
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://foxlab.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Steel Bid
            </a>
            . All Rights Reserved.
          </p>
        </div>
      </Footer>
    </Wrapper>
  );
};

export default LandingPage;
