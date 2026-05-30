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
    grid-template-columns: repeat(3, 1fr);
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
    align-items: center;
    justify-content: center;
  }

  .stat-icon {
    font-size: 2.5rem;
    color: var(--primary-600);
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
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

    .btn {
      padding: 1rem 2.2rem;
      font-size: 1.1rem;
      border-radius: 5px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer;
      height: auto;
    }
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

export const SecuritySection = styled.section`
  padding: 8rem 5%;
  background: #020e24;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);

  &.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  &::before {
    content: "";
    position: absolute;
    top: -10%;
    left: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(37, 99, 235, 0.12) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  .security-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 4rem;
    align-items: center;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 3rem;
    }
  }

  .security-content {
    h2 {
      font-size: clamp(2.2rem, 5vw, 3.5rem);
      font-weight: 900;
      line-height: 1.15;
      margin-bottom: 1.5rem;
      letter-spacing: -0.03em;
      background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    p {
      color: #94a3b8;
      font-size: 1.1rem;
      line-height: 1.7;
      margin-bottom: 2.5rem;
    }
  }

  .security-label {
    display: inline-block;
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #38bdf8;
    background: rgba(56, 189, 248, 0.1);
    border: 1px solid rgba(56, 189, 248, 0.2);
    padding: 0.35rem 1rem;
    border-radius: 999px;
    margin-bottom: 1.25rem;
  }

  .security-features {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    text-align: left;
  }

  .sec-feature-item {
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;

    h4 {
      font-size: 1.15rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 0.35rem;
    }

    p {
      color: #94a3b8;
      font-size: 0.95rem;
      line-height: 1.5;
      margin: 0;
    }
  }

  .sec-icon-circle {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(37, 99, 235, 0.15);
    border: 1px solid rgba(37, 99, 235, 0.3);
    color: #38bdf8;
    display: grid;
    place-items: center;
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  /* Illustration & Animations */
  .security-illustration {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    min-height: 380px;
  }

  .network-tunnel-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 630px;
    margin: 0 auto;
    gap: 1rem;
    transform: scale(1.05);
    transform-origin: center;

    @media (max-width: 600px) {
      flex-direction: column;
      gap: 2rem;
    }
  }

  .shield-node-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .node-label {
    font-size: 0.78rem;
    font-weight: 800;
    color: #38bdf8;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-shadow: 0 0 8px rgba(56, 189, 248, 0.4);
  }

  .shield-radar {
    position: relative;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .radar-circle {
    position: absolute;
    border: 1px solid rgba(56, 189, 248, 0.15);
    border-radius: 50%;
    animation: radarPulse 4s linear infinite;
    opacity: 0;
    pointer-events: none;
  }

  .circle-1 {
    width: 60px;
    height: 60px;
    animation-delay: 0s;
  }
  .circle-2 {
    width: 110px;
    height: 110px;
    animation-delay: 1s;
  }
  .circle-3 {
    width: 160px;
    height: 160px;
    animation-delay: 2s;
  }
  .circle-4 {
    width: 210px;
    height: 210px;
    animation-delay: 3s;
    border-color: rgba(56, 189, 248, 0.08);
  }

  .cyber-ring {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;

    &.ring-slow {
      width: 130px;
      height: 130px;
      border: 1.5px dashed rgba(56, 189, 248, 0.25);
      animation: rotateCW 20s linear infinite;
    }

    &.ring-fast {
      width: 100px;
      height: 100px;
      border: 1px dotted rgba(37, 99, 235, 0.45);
      animation: rotateCCW 12s linear infinite;
    }

    &.ring-dashed {
      width: 175px;
      height: 175px;
      border: 1px dashed rgba(56, 189, 248, 0.12);
      animation: rotateCW 35s linear infinite;
    }
  }

  .scan-line {
    position: absolute;
    width: 75px;
    height: 2px;
    background: linear-gradient(
      to right,
      transparent,
      rgba(56, 189, 248, 0.8),
      rgba(38, 224, 255, 0.8),
      rgba(56, 189, 248, 0.8),
      transparent
    );
    box-shadow: 0 0 8px rgba(56, 189, 248, 0.6);
    z-index: 6;
    pointer-events: none;
    animation: scanAnim 4s ease-in-out infinite;
  }

  .glowing-shield {
    position: relative;
    width: 85px;
    height: 85px;
    background: radial-gradient(circle, rgba(3, 24, 56, 0.85) 0%, rgba(2, 14, 36, 0.98) 100%);
    border: 2px solid #38bdf8;
    box-shadow: 
      0 0 20px rgba(56, 189, 248, 0.35),
      inset 0 0 10px rgba(56, 189, 248, 0.2);
    border-radius: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 5;
    animation: shieldFloat 5s ease-in-out infinite;
    backdrop-filter: blur(4px);

    .shield-icon {
      font-size: 1.85rem;
      color: #38bdf8;
      filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.5));
      margin-bottom: 0.25rem;
    }

    .secure-badge {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 0.5rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.08);
      border: 1px solid rgba(56, 189, 248, 0.35);
      padding: 0.15rem 0.45rem;
      border-radius: 99px;

      .badge-dot {
        width: 4px;
        height: 4px;
        background: #22c55e;
        border-radius: 50%;
        box-shadow: 0 0 4px #22c55e;
        animation: pulseDot 1s infinite alternate;
      }
    }
  }

  .data-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
  }

  .particle {
    position: absolute;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.6rem;
    font-weight: 600;
    color: rgba(56, 189, 248, 0.4);
    animation: floatParticle 9s ease-in-out infinite;
    text-shadow: 0 0 4px rgba(56, 189, 248, 0.15);

    &.p1 {
      top: 15%;
      left: 8%;
      animation-delay: 0s;
    }
    &.p2 {
      bottom: 20%;
      left: 10%;
      animation-delay: 2s;
      color: rgba(37, 99, 235, 0.4);
    }
    &.p3 {
      top: 25%;
      right: 10%;
      animation-delay: 4s;
    }
    &.p4 {
      bottom: 18%;
      right: 8%;
      animation-delay: 6s;
      color: rgba(37, 99, 235, 0.4);
    }
    &.p5 {
      top: 5%;
      left: 45%;
      animation-delay: 1.5s;
      color: rgba(56, 189, 248, 0.5);
    }
    &.p6 {
      bottom: 4%;
      left: 38%;
      animation-delay: 5s;
      color: rgba(56, 189, 248, 0.5);
    }
    &.p7 {
      top: 42%;
      left: 0%;
      animation-delay: 3s;
      color: rgba(56, 189, 248, 0.3);
    }
    &.p8 {
      top: 45%;
      right: 0%;
      animation-delay: 7.5s;
      color: rgba(56, 189, 248, 0.3);
    }
  }

  /* Network Path Styling */
  .network-path {
    position: relative;
    flex-grow: 1;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;

    @media (max-width: 600px) {
      width: 60px;
      height: 80px;
      min-height: 80px;
      min-width: auto;
    }
  }

  .network-line {
    width: 100%;
    height: 2px;
    background: repeating-linear-gradient(
      90deg,
      rgba(56, 189, 248, 0.1),
      rgba(56, 189, 248, 0.1) 6px,
      rgba(56, 189, 248, 0.6) 6px,
      rgba(56, 189, 248, 0.6) 12px
    );
    box-shadow: 0 0 8px rgba(56, 189, 248, 0.35);
    animation: lineScrollHorizontal 0.8s linear infinite;

    @media (max-width: 600px) {
      width: 2px;
      height: 100%;
      background: repeating-linear-gradient(
        180deg,
        rgba(56, 189, 248, 0.1),
        rgba(56, 189, 248, 0.1) 6px,
        rgba(56, 189, 248, 0.6) 6px,
        rgba(56, 189, 248, 0.6) 12px
      );
      animation: lineScrollVertical 0.8s linear infinite;
    }
  }

  .data-packet {
    position: absolute;
    font-family: monospace;
    font-size: 0.62rem;
    font-weight: 700;
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    background: rgba(3, 24, 56, 0.95);
    border: 1px solid #38bdf8;
    color: #38bdf8;
    box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
    white-space: nowrap;
    z-index: 10;
  }

  /* Packet Flow Animations */
  .p-forward-1 {
    animation: flowFwdH 4s linear infinite;
  }
  .p-forward-2 {
    animation: flowFwdH 5s linear infinite 2s;
  }
  .p-backward-1 {
    animation: flowBwdH 4.5s linear infinite 0.8s;
  }

  @keyframes flowFwdH {
    0% { left: -5%; opacity: 0; transform: scale(0.85) translateY(-50%); }
    15% { opacity: 1; }
    85% { opacity: 1; }
    100% { left: 105%; opacity: 0; transform: scale(0.85) translateY(-50%); }
  }

  @keyframes flowBwdH {
    0% { right: -5%; opacity: 0; transform: scale(0.85) translateY(-50%); }
    15% { opacity: 1; }
    85% { opacity: 1; }
    100% { right: 105%; opacity: 0; transform: scale(0.85) translateY(-50%); }
  }

  /* Vertical Flow for Mobile Screen Stacking */
  @media (max-width: 600px) {
    .p-forward-1 {
      animation: flowFwdV 4s linear infinite;
    }
    .p-forward-2 {
      animation: flowFwdV 5s linear infinite 2s;
    }
    .p-backward-1 {
      animation: flowBwdV 4.5s linear infinite 0.8s;
    }
  }

  @keyframes flowFwdV {
    0% { top: -5%; opacity: 0; transform: scale(0.85) translateX(-50%); }
    15% { opacity: 1; }
    85% { opacity: 1; }
    100% { top: 105%; opacity: 0; transform: scale(0.85) translateX(-50%); }
  }

  @keyframes flowBwdV {
    0% { bottom: -5%; opacity: 0; transform: scale(0.85) translateX(-50%); }
    15% { opacity: 1; }
    85% { opacity: 1; }
    100% { bottom: 105%; opacity: 0; transform: scale(0.85) translateX(-50%); }
  }

  /* Basic Keyframes */
  @keyframes lineScrollHorizontal {
    from { background-position-x: 0; }
    to { background-position-x: 12px; }
  }

  @keyframes lineScrollVertical {
    from { background-position-y: 0; }
    to { background-position-y: 12px; }
  }

  @keyframes rotateCW {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes rotateCCW {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }

  @keyframes radarPulse {
    0% {
      transform: scale(0.65);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    100% {
      transform: scale(1.15);
      opacity: 0;
      border-color: rgba(37, 99, 235, 0);
    }
  }

  @keyframes shieldFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  @keyframes scanAnim {
    0%, 100% {
      transform: translateY(-30px);
      opacity: 0.1;
    }
    40%, 60% {
      opacity: 0.8;
    }
    50% {
      transform: translateY(30px);
      opacity: 0.8;
    }
  }

  @keyframes pulseDot {
    from {
      transform: scale(0.85);
      opacity: 0.6;
    }
    to {
      transform: scale(1.2);
      opacity: 1;
      box-shadow: 0 0 10px #22c55e;
    }
  }

  @keyframes floatParticle {
    0%, 100% {
      transform: translate(0, 0) scale(0.95);
      opacity: 0.2;
    }
    50% {
      transform: translate(8px, -8px) scale(1.05);
      opacity: 0.85;
    }
  }
`;

export const ContactModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 0;
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  @keyframes fadeIn {
    to { opacity: 1; }
  }
`;

export const ContactModalContainer = styled.div`
  background: var(--white);
  width: 90%;
  max-width: 850px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  position: relative;
  transform: translateY(40px);
  opacity: 0;
  animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.1s;

  @keyframes slideIn {
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-height: 90vh;
    overflow-y: auto;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(241, 245, 249, 0.8);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  color: var(--grey-600);
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-50);
    color: var(--primary-600);
    transform: rotate(90deg) scale(1.1);
  }
`;

export const ContactModalSidebar = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 3rem 2.5rem;
  color: #f1f5f9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -30%;
    left: -30%;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%);
    border-radius: 50%;
  }

  .sidebar-header {
    position: relative;
    z-index: 2;
    h3 {
      font-size: 1.75rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 0.75rem;
      letter-spacing: -0.02em;
    }
    p {
      color: #94a3b8;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }

  .info-items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 2.5rem 0;
    position: relative;
    z-index: 2;
  }

  .info-item {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    color: inherit;
    text-decoration: none;
    cursor: pointer;

    .icon-wrapper {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(37, 99, 235, 0.15);
      border: 1px solid rgba(37, 99, 235, 0.25);
      color: #38bdf8;
      display: grid;
      place-items: center;
      font-size: 1.1rem;
      flex-shrink: 0;
      transition: all 0.3s ease;
    }

    .item-detail {
      span {
        display: block;
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #64748b;
        font-weight: 700;
        margin-bottom: 0.2rem;
      }
      p {
        font-size: 0.95rem;
        color: #e2e8f0;
        margin: 0;
        line-height: 1.4;
      }
    }

    &:hover {
      .icon-wrapper {
        background: var(--primary-600);
        color: white;
        border-color: var(--primary-600);
      }
    }
  }

  .sidebar-footer {
    font-size: 0.75rem;
    color: #64748b;
    position: relative;
    z-index: 2;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 1.25rem;
  }
`;

export const ContactModalForm = styled.form`
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--grey-900);
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
  }

  .form-group {
    margin-bottom: 1.25rem;
    position: relative;

    input, textarea {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1.5px solid #e2e8f0;
      border-radius: 10px;
      font-size: 0.95rem;
      color: var(--grey-900);
      transition: all 0.3s ease;
      background: #f8fafc;

      &:focus {
        outline: none;
        border-color: var(--primary-500);
        background: #ffffff;
        box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
      }

      &::placeholder {
        color: var(--grey-400);
      }
    }

    textarea {
      resize: none;
      min-height: 100px;
    }
  }

  .submit-btn {
    width: 100%;
    padding: 0.85rem;
    background: var(--primary-600);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      background: var(--primary-700);
      transform: translateY(-2px);
      box-shadow: 0 10px 20px -10px rgba(37, 99, 235, 0.5);
    }

    &:disabled {
      background: var(--grey-300);
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  }
`;

export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem 1.5rem;
  grid-column: 1 / -1;
  animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  @keyframes scaleUp {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .success-icon-wrapper {
    width: 72px;
    height: 72px;
    background: #ecfdf5;
    border: 2px solid #a7f3d0;
    color: #10b981;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    animation: bounce 0.6s cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes bounce {
      0% { transform: scale(0.3); }
      50% { transform: scale(1.1); }
      70% { transform: scale(0.9); }
      100% { transform: scale(1); }
    }
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--grey-900);
    margin-bottom: 0.75rem;
  }

  p {
    font-size: 0.95rem;
    color: var(--grey-600);
    line-height: 1.6;
    margin-bottom: 1.75rem;
    max-width: 380px;
  }

  .close-btn {
    padding: 0.75rem 2.5rem;
    background: var(--primary-600);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: var(--primary-700);
      transform: translateY(-2px);
    }
  }
`;

