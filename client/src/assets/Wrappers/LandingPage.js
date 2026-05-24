import styled, { keyframes } from "styled-components";

// Animations
export const barGrow = keyframes`
  from { width: 0; }
`;

export const pulseAnim = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
`;

export const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

export const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const stepGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(3, 24, 56, 0.4); }
  50% { box-shadow: 0 0 0 12px rgba(3, 24, 56, 0); }
`;

// Styled Components
export const Wrapper = styled.div`
  font-family: "Roboto", sans-serif;
  color: var(--grey-900);
  background: var(--grey-50);
  min-height: 100vh;
  width: 100%;
  transition: background 0.3s ease, color 0.3s ease;
`;

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 clamp(1.5rem, 5%, 6rem);
  height: 72px;
  background: var(--white);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  transition:
    box-shadow 0.3s ease,
    background 0.3s ease;

  &.scrolled {
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  }

  .nav-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
  }

  .logo-img {
    height: 58.8px;
    width: auto;
    object-fit: contain;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .nav-auth {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-left: 0.5rem;
  }

  .nav-auth-btn {
    padding: 0.5rem 1.25rem !important;
    font-size: 0.85rem !important;
  }

  .nav-link {
    text-decoration: none;
    color: var(--grey-600);
    font-weight: 500;
    font-size: 0.95rem;
    transition: color 0.3s;
    &:hover {
      color: var(--primary-600);
    }
  }

  .btn {
    text-decoration: none;
    padding: 0.6rem 1.2rem;
    border-radius: 5px;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }

  .main-btn {
    background: var(--primary-600);
    color: white;
    border: 2px solid var(--primary-600);
    &:hover {
      background: white;
      color: var(--primary-600);
      transform: translateY(-2px);
    }
  }

  .outline-btn {
    background: transparent;
    border: 2px solid var(--primary-600);
    color: var(--primary-600);
    transition: all 0.3s ease;

    &:hover {
      background: var(--primary-600);
      color: white;
      transform: translateY(-2px);
    }
  }

  .portal-btn {
    background: transparent;
    border: 2px solid var(--primary-600);
    color: var(--primary-600);
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 0.4s ease;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--primary-600);
      z-index: -1;
      transition: transform 0.4s cubic-bezier(0.7, 0, 0.2, 1);
      transform: scaleX(0);
      transform-origin: center;
    }

    &:hover {
      color: white;
      transform: none !important;
      &::before {
        transform: scaleX(1);
      }
    }
  }

  .secondary-btn {
    background: var(--primary-50);
    color: var(--primary-600);
    &:hover {
      background: var(--primary-100);
      transform: translateY(-2px);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem 5%;
  }
`;

export const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem clamp(1.5rem, 5%, 6rem);
  min-height: 80vh;
  background: linear-gradient(135deg, var(--grey-50) 0%, #e2e8f0 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -20%;
    width: 800px;
    height: 800px;
    background: radial-gradient(
      circle,
      rgba(37, 99, 235, 0.1) 0%,
      rgba(255, 255, 255, 0) 70%
    );
    border-radius: 50%;
  }

  .hero-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
    width: 100%;
    max-width: 1280px;
  }

  .hero-content {
    flex: 1;
    max-width: 600px;
    z-index: 2;
    animation: ${slideUp} 0.8s ease-out;

    h1 {
      font-size: clamp(3.14rem, 7.84vw, 5.39rem);
      line-height: 1.05;
      font-weight: 900;
      margin-bottom: 1.5rem;
      letter-spacing: -2px;
      background: linear-gradient(
        135deg,
        var(--primary-700) 0%,
        var(--primary-400) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    p {
      font-size: 1.2rem;
      color: var(--grey-600);
      margin-bottom: 2.5rem;
      line-height: 1.6;
    }
  }

  .hero-actions {
    display: flex;
    gap: 1rem;

    .hero-btn {
      padding: 1rem 2rem;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border-radius: 5px;
    }
  }

  .hero-image-placeholder {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;

    .glass-card {
      width: 460px;
      background: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow:
        0 0 0 1px rgba(0, 0, 0, 0.06),
        0 40px 80px -12px rgba(0, 0, 0, 0.18);
      animation: ${float} 6s ease-in-out infinite;
    }

    .calc-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.1rem 1.5rem;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
    }
    .calc-topbar-left {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }
    .calc-icon {
      width: 42px;
      height: 42px;
      background: linear-gradient(
        135deg,
        rgba(37, 99, 235, 0.15),
        rgba(167, 139, 250, 0.15)
      );
      border: 1px solid rgba(37, 99, 235, 0.2);
      color: #059669;
      border-radius: 10px;
      display: grid;
      place-items: center;
      font-size: 1rem;
      flex-shrink: 0;
    }
    .calc-title {
      display: block;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--grey-900);
    }
    .calc-project {
      display: block;
      font-size: 0.7rem;
      color: var(--grey-500);
      margin-top: 0.1rem;
    }
    .calc-live {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.7rem;
      font-weight: 700;
      color: #059669;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      padding: 0.25rem 0.65rem;
      border-radius: 999px;
    }
    .pulse-dot {
      font-size: 0.45rem;
      animation: ${pulseAnim} 1.5s ease-in-out infinite;
    }

    .calc-screen {
      background: linear-gradient(160deg, var(--primary-50) 0%, #fff 100%);
      padding: 1.75rem 1.5rem 1.5rem;
      border-bottom: 1px solid #f1f5f9;
      text-align: right;
    }
    .screen-label {
      display: block;
      font-size: 0.62rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: var(--grey-400);
      text-transform: uppercase;
      margin-bottom: 0.4rem;
    }
    .screen-value {
      display: block;
      font-size: 2.8rem;
      font-weight: 900;
      letter-spacing: -0.04em;
      color: var(--primary-600);
      line-height: 1;
      text-shadow: 0 2px 16px rgba(3, 24, 56, 0.2);
    }
    .screen-sub {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.4rem;
      margin-top: 0.6rem;
      font-size: 0.72rem;
      color: var(--grey-500);
      font-weight: 500;
    }
    .dot {
      color: var(--grey-300);
    }
    .under-bid {
      color: #7c3aed;
      font-weight: 700;
    }

    .calc-rows {
      padding: 1.25rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .calc-row {
      display: grid;
      grid-template-columns: 1fr auto auto;
      grid-template-rows: auto auto;
      gap: 0.2rem 0.75rem;
      align-items: center;
    }
    .row-label {
      grid-column: 1;
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--grey-600);
    }
    .row-hrs {
      grid-column: 2;
      grid-row: 1;
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--grey-500);
      text-align: right;
    }
    .row-amt {
      grid-column: 3;
      grid-row: 1;
      font-size: 0.82rem;
      font-weight: 800;
      color: var(--grey-900);
      text-align: right;
      min-width: 60px;
    }
    .row-track {
      grid-column: 1 / -1;
      grid-row: 2;
      height: 5px;
      background: var(--grey-100);
      border-radius: 999px;
      overflow: hidden;
    }
    .row-fill {
      height: 100%;
      background: linear-gradient(
        90deg,
        var(--primary-700),
        var(--primary-400)
      );
      border-radius: 999px;
      animation: ${barGrow} 1.2s cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    .calc-footer {
      display: flex;
      gap: 0.5rem;
      padding: 1rem 1.5rem 1.4rem;
      border-top: 1px solid #f1f5f9;
      background: #f8fafc;
    }
    .calc-chip {
      font-size: 0.68rem;
      font-weight: 700;
      color: var(--grey-500);
      background: #ffffff;
      border: 1px solid #e2e8f0;
      padding: 0.3rem 0.7rem;
      border-radius: 999px;
      &.accent {
        color: #059669;
        background: #ecfdf5;
        border-color: #a7f3d0;
      }
    }
  }

  @media (max-width: 992px) {
    .hero-inner {
      flex-direction: column;
      text-align: center;
      padding: 0;
    }
    .hero-content {
      margin-bottom: 4rem;
      h1 {
        font-size: 2.8rem;
      }
    }
    .hero-actions {
      justify-content: center;
    }
  }

  @media (max-width: 576px) {
    .hero-content h1 {
      font-size: 2rem;
    }
    .hero-actions {
      flex-direction: column;
      width: 100%;
      .hero-btn {
        width: 100%;
        justify-content: center;
      }
    }
    .hero-image-placeholder .glass-card {
      width: 100%;
      padding: 1.5rem;
    }
  }
`;

export const FeaturesSection = styled.section`
  padding: 8rem 5%;
  background: #f8fafc;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    bottom: -200px;
    right: -200px;
    width: 700px;
    height: 700px;
    background: radial-gradient(
      circle,
      rgba(3, 24, 56, 0.05) 0%,
      transparent 65%
    );
    pointer-events: none;
  }

  .feat-inner {
    max-width: 1280px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    max-width: 1100px;
    margin: 0 auto 4rem;
  }

  .feat-label {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--primary-600);
    background: var(--primary-50);
    border: 1px solid var(--primary-200);
    padding: 0.35rem 1rem;
    border-radius: 999px;
    margin-bottom: 1.25rem;
  }

  h2 {
    font-size: 3.75rem;
    font-weight: 900;
    margin-bottom: 0.75rem;
    letter-spacing: -0.03em;
    background: linear-gradient(
      135deg,
      var(--primary-700) 0%,
      var(--primary-400) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    @media (min-width: 1024px) {
      white-space: nowrap;
    }
  }

  .section-header p {
    color: var(--grey-500);
    font-size: 1.05rem;
    line-height: 1.7;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 580px) {
      grid-template-columns: 1fr;
    }
  }

  .feature-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    padding: 2rem 1.75rem 1.75rem;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 20px;
      background: linear-gradient(
        135deg,
        rgba(3, 24, 56, 0.04) 0%,
        transparent 60%
      );
      opacity: 0;
      transition: opacity 0.35s ease;
    }

    &:hover {
      border-color: var(--primary-300);
      transform: translateY(-8px);
      box-shadow:
        0 20px 40px rgba(3, 24, 56, 0.1),
        0 0 0 1px var(--primary-200);
      &::after {
        opacity: 1;
      }
      .card-icon {
        background: var(--primary-600);
        color: white;
        border-color: var(--primary-600);
      }
      .card-line {
        width: 100%;
      }
    }
  }

  .card-num {
    position: absolute;
    top: 1.25rem;
    right: 1.5rem;
    font-size: 3.5rem;
    font-weight: 900;
    background: linear-gradient(135deg, var(--primary-700) 0%, var(--primary-400) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0.1;
    line-height: 1;
    letter-spacing: -0.05em;
    font-family: inherit;
    pointer-events: none;
  }

  .card-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: var(--primary-50);
    border: 1px solid var(--primary-200);
    color: var(--primary-600);
    display: grid;
    place-items: center;
    font-size: 1.4rem;
    transition: all 0.3s ease;
    margin-bottom: 0.25rem;
  }

  .card-tag {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--grey-500);
    background: var(--grey-100);
    border: 1px solid var(--grey-200);
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    width: fit-content;
  }

  h3 {
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--grey-900);
    letter-spacing: -0.02em;
    margin: 0;
  }

  .feature-card p {
    color: var(--grey-500);
    font-size: 1rem;
    line-height: 1.75;
    margin: 0;
    flex: 1;
  }

  .card-line {
    height: 2px;
    width: 32px;
    background: linear-gradient(90deg, var(--primary-600), var(--primary-400));
    border-radius: 999px;
    margin-top: 0.5rem;
    transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
`;

export const HowItWorksSection = styled.section`
  padding: 8rem 5%;
  background: var(--white);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(37, 99, 235, 0.08),
      rgba(167, 139, 250, 0.08)
    );
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 900px;
    background: radial-gradient(
      circle,
      rgba(3, 24, 56, 0.05) 0%,
      transparent 65%
    );
    pointer-events: none;
  }

  .section-header {
    text-align: center;
    margin-bottom: 4.5rem;
    position: relative;
    z-index: 1;

    .section-label {
      display: inline-block;
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--primary-600);
      background: var(--primary-50);
      border: 1px solid var(--primary-200);
      padding: 0.35rem 1rem;
      border-radius: 999px;
      margin-bottom: 1.25rem;
    }

    h2 {
      font-size: 3.75rem;
      font-weight: 900;
      margin-bottom: 0.75rem;
      letter-spacing: -0.03em;
      background: linear-gradient(
        135deg,
        var(--primary-700) 0%,
        var(--primary-400) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    p {
      color: var(--grey-500);
      font-size: 1.05rem;
      line-height: 1.7;
      max-width: 480px;
      margin: 0 auto;
    }
  }

  .steps-container {
    display: flex;
    justify-content: center;
    align-items: stretch;
    max-width: 1050px;
    margin: 0 auto;
    gap: 0;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
  }

  .step-card {
    flex: 1;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    padding: 2.5rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    transition: all 0.35s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

    &:hover {
      border-color: var(--primary-300);
      transform: translateY(-6px);
      box-shadow:
        0 20px 40px rgba(3, 24, 56, 0.1),
        0 0 0 1px var(--primary-200);
    }

    h4 {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--grey-900);
      margin-bottom: 0.75rem;
      letter-spacing: -0.01em;
    }

    p {
      color: var(--grey-500);
      font-size: 1rem;
      line-height: 1.75;
      margin: 0;
    }
  }

  .step-badge {
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--primary-600);
    color: white;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    padding: 0.25rem 0.65rem;
    border-radius: 999px;
    border: 2px solid var(--white);
  }

  .step-icon-wrap {
    width: 68px;
    height: 68px;
    border-radius: 18px;
    background: var(--primary-50);
    border: 1px solid var(--primary-200);
    display: grid;
    place-items: center;
    font-size: 1.6rem;
    color: var(--primary-600);
    margin-bottom: 1.5rem;
    margin-top: 0.75rem;
    animation: ${stepGlow} 3s ease-in-out infinite;
  }

  .step-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    color: var(--primary-300);
    padding: 0 0.5rem;
    flex-shrink: 0;
    align-self: center;
    margin-top: -1rem;

    @media (max-width: 768px) {
      transform: rotate(90deg);
      margin-top: 0;
    }
  }
`;

export const StatsSection = styled.section`
  padding: 8rem 5%;
  background: var(--white);
  border-bottom: 1px solid var(--grey-200);

  .stats-header {
    text-align: center;
    max-width: 1100px;
    margin: 0 auto 3.5rem;
  }

  .stats-label {
    display: inline-block;
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--primary-600);
    background: var(--primary-50);
    border: 1px solid var(--primary-200);
    padding: 0.35rem 1rem;
    border-radius: 999px;
    margin-bottom: 1.25rem;
  }

  h2 {
    font-size: 3.75rem;
    font-weight: 900;
    margin-bottom: 0.75rem;
    letter-spacing: -0.03em;
    background: linear-gradient(
      135deg,
      var(--primary-700) 0%,
      var(--primary-400) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    @media (min-width: 1024px) {
      white-space: nowrap;
    }
  }

  .stats-header p {
    color: var(--grey-500);
    font-size: 1.05rem;
    line-height: 1.7;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .stat-value {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, var(--grey-900), var(--primary-600));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .stat-label {
    font-size: 0.95rem;
    color: var(--grey-600);
    font-weight: 500;
  }
`;

export const PricingSection = styled.section`
  padding: 8rem 5%;
  background: var(--grey-50);

  .section-header {
    text-align: center;
    max-width: 1100px;
    margin: 0 auto 4rem;

    .section-label {
      display: inline-block;
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--primary-600);
      background: var(--primary-50);
      border: 1px solid var(--primary-200);
      padding: 0.35rem 1rem;
      border-radius: 999px;
      margin-bottom: 1.25rem;
    }

    h2 {
      font-size: 3.75rem;
      font-weight: 900;
      margin-bottom: 0.75rem;
      letter-spacing: -0.03em;
      background: linear-gradient(
        135deg,
        var(--primary-700) 0%,
        var(--primary-400) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      @media (min-width: 1024px) {
        white-space: nowrap;
      }
    }

    p {
      color: var(--grey-500);
      font-size: 1.05rem;
      line-height: 1.7;
      max-width: 480px;
      margin: 0 auto;
    }
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    max-width: 1100px;
    margin: 0 auto;
    align-items: stretch;

    @media (max-width: 960px) {
      grid-template-columns: 1fr;
      max-width: 450px;
    }
  }

  .pricing-card {
    background: var(--white);
    padding: 2.5rem 2rem;
    border-radius: 12px;
    border: 1px solid var(--grey-200);
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

    &.featured {
      transform: scale(1.02);
      z-index: 2;
      border: 2px solid transparent;
      background:
        linear-gradient(var(--white), var(--white)) padding-box,
        linear-gradient(
            135deg,
            var(--primary-700) 0%,
            var(--primary-400) 100%
          )
          border-box;
      box-shadow:
        0 20px 50px rgba(37, 99, 235, 0.1),
        0 0 30px rgba(37, 99, 235, 0.05);

      @media (max-width: 960px) {
        transform: scale(1);
      }
    }

    .ribbon {
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 0.35rem 0.75rem;
      border-radius: 999px;
      background: var(--primary-50);
      border: 1px solid var(--primary-200);
      color: var(--primary-700);
    }

    h3 {
      font-size: 1.4rem;
      color: var(--grey-900);
      margin-bottom: 0.5rem;
    }

    .price {
      margin-bottom: 1rem;
      strong {
        font-size: 2.8rem;
        font-weight: 800;
        letter-spacing: -0.03em;
        color: var(--grey-900);
      }
      span {
        font-size: 1.05rem;
        color: var(--grey-500);
        margin-left: 0.25rem;
        font-weight: 500;
      }
    }

    .desc {
      color: var(--grey-600);
      font-size: 1rem;
      margin-bottom: 1.5rem;
      flex: 1;
    }

    .features {
      list-style: none;
      padding: 0;
      margin: 0 0 2rem 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--grey-700);
        font-size: 1rem;

        .check-icon {
          color: var(--primary-500);
          font-size: 0.85rem;
        }
      }
    }

    .full-width {
      width: 100%;
      text-align: center;
    }
  }
`;

export const CtaSection = styled.section`
  padding: 8rem 5%;
  background: var(--white);

  .cta-box {
    max-width: 1100px;
    margin: 0 auto;
    border-radius: 16px;
    padding: clamp(3rem, 5vw, 4rem);
    background: linear-gradient(
      135deg,
      rgba(37, 99, 235, 0.08),
      rgba(167, 139, 250, 0.08)
    );
    border: 1px solid rgba(37, 99, 235, 0.15);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: -50%;
      left: -20%;
      width: 600px;
      height: 600px;
      background: radial-gradient(
        circle,
        rgba(37, 99, 235, 0.1) 0%,
        rgba(255, 255, 255, 0) 60%
      );
      border-radius: 50%;
      pointer-events: none;
    }
  }

  .cta-content {
    flex: 1;
    min-width: 300px;

    h2 {
      font-size: 2.75rem;
      font-weight: 900;
      letter-spacing: -0.03em;
      margin-bottom: 1rem;
      background: linear-gradient(
        135deg,
        var(--primary-700) 0%,
        var(--primary-400) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    p {
      color: var(--grey-600);
      font-size: 1.1rem;
      max-width: 500px;
      line-height: 1.6;
    }
  }

  .cta-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
  }

  @media (max-width: 768px) {
    .cta-box {
      flex-direction: column;
      text-align: center;
      padding: 2.5rem 1.5rem;
    }
    .cta-actions {
      justify-content: center;
      width: 100%;
      a {
        width: 100%;
        text-align: center;
        justify-content: center;
      }
    }
  }
`;

export const Footer = styled.footer`
  background-color: var(--white);
  color: var(--grey-600);
  padding-top: 80px;
  border-top: 1px solid var(--grey-200);

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin-bottom: 50px;
  }

  .footer-logo {
    display: inline-block;
    text-decoration: none;
    margin-bottom: 20px;
  }

  .footer-logo .logo-img {
    height: 60px;
    width: auto;
    object-fit: contain;
  }

  .footer-desc {
    margin-bottom: 25px;
    font-size: 0.85rem;
    line-height: 1.78;
  }

  .social-links {
    display: flex;
    gap: 15px;
  }

  .social-links a {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--grey-100);
    color: var(--grey-600);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    text-decoration: none;
  }

  .social-links a:hover {
    background-color: var(--primary-50);
    color: var(--primary-600);
  }

  .widget-title {
    font-size: 20px;
    color: var(--grey-900);
    margin-bottom: 25px;
    position: relative;
    padding-bottom: 10px;
  }

  .widget-title::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 30px;
    height: 2px;
    background-color: var(--primary-600);
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-links li {
    margin-bottom: 15px;
  }

  .footer-links a {
    color: var(--grey-500);
    transition: all 0.3s;
    text-decoration: none;
  }

  .footer-links a:hover {
    color: var(--primary-600);
    padding-left: 5px;
  }

  .contact-info {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .contact-info li {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }

  .contact-icon {
    color: var(--primary-600);
    font-size: 20px;
    margin-top: 5px;
  }

  .footer-bottom {
    background-color: var(--grey-50);
    padding: 25px 0;
    text-align: center;
    border-top: 1px solid var(--grey-200);
    color: var(--grey-500);
  }

  .footer-bottom p {
    margin: 0;
  }

  .footer-bottom a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: none;
      color: inherit;
    }
  }
`;
