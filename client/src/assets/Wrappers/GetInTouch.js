import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.6; }
  100% { transform: scale(1); opacity: 1; }
`;

const Wrapper = styled.section`
  padding: 0;

  .contact-page-container {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    width: 100%;
    max-width: 1200px;
    height: calc(100vh - 180px);
    min-height: 500px;
    margin: 0 auto;

    @media (max-width: 992px) {
      flex-direction: column;
      height: auto;
      min-height: auto;
    }
  }

  .chat-outer-container {
    flex: 1.4;
    height: 100%;
    background: var(--white);
    border-radius: 12px;
    box-shadow: var(--shadow-3);
    border: 1px solid var(--sidebar-border);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: var(--transition);

    @media (max-width: 992px) {
      height: 600px;
    }
  }

  .info-sidebar {
    flex: 0.9;
    background: var(--white);
    border-radius: 12px;
    box-shadow: var(--shadow-3);
    border: 1px solid var(--sidebar-border);
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    transition: var(--transition);

    @media (max-width: 992px) {
      height: auto;
    }
  }

  .sidebar-header {
    margin-bottom: 1.75rem;
    border-bottom: 1px solid var(--sidebar-border);
    padding-bottom: 1rem;

    h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--grey-800);
      margin-bottom: 0.35rem;
    }

    p {
      font-size: 0.82rem;
      color: var(--grey-500);
      line-height: 1.4;
      margin: 0;
    }
  }

  .info-cards-container {
    display: flex;
    flex-direction: column;
    gap: 1.15rem;
  }

  .info-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--grey-50);
    border: 1px solid var(--sidebar-border);
    border-radius: 8px;
    transition: var(--transition);
    text-decoration: none;
    color: inherit;

    body.dark-theme & {
      background: var(--grey-50);
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-2);
      border-color: var(--primary-500);
    }

    .icon-box {
      width: 44px;
      height: 44px;
      border-radius: 8px;
      display: grid;
      place-items: center;
      font-size: 1.2rem;
      flex-shrink: 0;
      background: var(--primary-50);
      color: var(--primary-600);
      transition: var(--transition);

      body.dark-theme & {
        background: rgba(14, 165, 233, 0.15);
        color: var(--primary-400);
      }
    }

    .card-content {
      flex: 1;
      min-width: 0;

      .label {
        display: block;
        font-size: 0.72rem;
        text-transform: uppercase;
        font-weight: 600;
        color: var(--grey-400);
        margin-bottom: 0.15rem;
        letter-spacing: 0.5px;
      }

      .value {
        font-size: 0.88rem;
        font-weight: 500;
        color: var(--grey-800);
        word-break: break-word;
        margin: 0;
      }
    }

    .copy-btn-wrapper {
      position: relative;
    }

    .copy-btn {
      background: transparent;
      border: none;
      color: var(--grey-400);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 4px;
      display: grid;
      place-items: center;
      transition: var(--transition);

      &:hover {
        color: var(--primary-500);
        background: var(--grey-100);
        body.dark-theme & {
          background: #374151;
        }
      }
    }

    .copied-tooltip {
      position: absolute;
      bottom: 120%;
      right: 0;
      background: #111827;
      color: white;
      font-size: 0.72rem;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      white-space: nowrap;
      pointer-events: none;
      animation: fadeIn 0.2s ease-out;

      &::after {
        content: '';
        position: absolute;
        top: 100%;
        right: 12px;
        border: 4px solid transparent;
        border-top-color: #111827;
      }
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Chat Header */
  .chat-header {
    height: 70px;
    background: var(--grey-100);
    border-bottom: 1px solid var(--sidebar-border);
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;

    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--primary-100);
      color: var(--primary-500);
      display: grid;
      place-items: center;
      font-size: 1.25rem;
      font-weight: 700;
      position: relative;
      border: 1.5px solid var(--primary-200);

      body.dark-theme & {
        background: rgba(14, 165, 233, 0.15);
        color: #60a5fa;
        border-color: rgba(96, 165, 250, 0.3);
      }
    }

    .avatar-status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #10b981;
      position: absolute;
      bottom: 1px;
      right: 1px;
      border: 2px solid var(--grey-100);
      animation: ${pulse} 2s infinite ease-in-out;
    }

    .info {
      h4 {
        font-size: 0.95rem;
        color: var(--grey-900);
        margin: 0;
        font-weight: 600;
      }
      p {
        font-size: 0.75rem;
        color: #10b981;
        margin: 0;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
    }

    .header-actions {
      display: flex;
      gap: 1.25rem;
      color: var(--grey-500);
      font-size: 1.1rem;
      cursor: pointer;

      svg:hover {
        color: var(--grey-800);
      }
    }
  }

  /* Chat Message Area */
  .chat-messages-container {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    background-color: var(--grey-50);
    background-image: radial-gradient(rgba(0,0,0,0.02) 1px, transparent 0),
                      radial-gradient(rgba(0,0,0,0.02) 1px, transparent 0);
    background-size: 24px 24px;
    background-position: 0 0, 12px 12px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.15) transparent;

    body.dark-theme & {
      background-color: var(--grey-50);
      background-image: radial-gradient(rgba(255,255,255,0.015) 1px, transparent 0),
                        radial-gradient(rgba(255,255,255,0.015) 1px, transparent 0);
      scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
    }

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.15);
      border-radius: 3px;
    }
    body.dark-theme &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  /* Date Divider */
  .chat-date-divider {
    align-self: center;
    background: var(--white);
    color: var(--grey-600);
    padding: 0.35rem 0.8rem;
    border-radius: 7px;
    font-size: 0.75rem;
    font-weight: 600;
    box-shadow: var(--shadow-1);
    margin: 0.5rem 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: 1px solid var(--sidebar-border);
  }

  /* Base Bubble */
  .bubble {
    max-width: 75%;
    padding: 0.5rem 0.85rem;
    border-radius: 8px;
    font-size: 0.9rem;
    line-height: 1.4;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    word-break: break-word;

    .bubble-meta {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.25rem;
      font-size: 0.68rem;
      color: var(--grey-500);
      margin-top: 0.25rem;
      text-align: right;
    }

    .ticks {
      color: #53bdeb;
      display: inline-flex;
    }
  }

  /* Support Bubble (Left side) */
  .bubble-support {
    align-self: flex-start;
    background: var(--white);
    color: var(--grey-900);
    border-top-left-radius: 0;
    border: 1px solid var(--sidebar-border);

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -8px;
      width: 0;
      height: 0;
      border-width: 0 8px 8px 0;
      border-style: solid;
      border-color: transparent var(--white) transparent transparent;

      body.dark-theme & {
        border-color: transparent var(--grey-200) transparent transparent;
      }
    }

    body.dark-theme & {
      background: var(--grey-200);
      color: var(--grey-900);
    }
  }

  /* User Bubble (Right side) */
  .bubble-user {
    align-self: flex-end;
    background: var(--primary-600);
    color: var(--white);
    border-top-right-radius: 0;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: -8px;
      width: 0;
      height: 0;
      border-width: 0 0 8px 8px;
      border-style: solid;
      border-color: transparent transparent transparent var(--primary-600);

      body.dark-theme & {
        border-color: transparent transparent transparent var(--primary-500);
      }
    }

    .bubble-meta {
      color: rgba(255, 255, 255, 0.7);
    }

    .ticks {
      color: var(--primary-200);
    }

    body.dark-theme & {
      background: var(--primary-500);
      color: #031838;

      &::before {
        border-color: transparent transparent transparent var(--primary-500);
      }

      .bubble-meta {
        color: rgba(3, 24, 56, 0.8);
      }

      .ticks {
        color: #031838;
      }
    }
  }

  /* Typing Indicator Bubble */
  .bubble-typing {
    align-self: flex-start;
    background: var(--white);
    border-top-left-radius: 0;
    padding: 0.65rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;

    body.dark-theme & {
      background: #202c33;
    }

    span {
      width: 6px;
      height: 6px;
      background: var(--grey-500);
      border-radius: 50%;
      display: inline-block;
      animation: bounce 1.4s infinite ease-in-out both;

      &:nth-child(1) { animation-delay: -0.32s; }
      &:nth-child(2) { animation-delay: -0.16s; }
    }
  }

  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1.0); }
  }

  /* Bottom Typing Bar */
  .chat-footer {
    height: 70px;
    background: var(--grey-100);
    border-top: 1px solid var(--sidebar-border);
    padding: 0 1.25rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-shrink: 0;

    .footer-icon-btn {
      color: var(--grey-500);
      font-size: 1.35rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: var(--transition);

      &:hover {
        color: var(--grey-800);
      }
    }

    form {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .chat-input-wrapper {
      flex: 1;
      background: var(--white);
      border-radius: 24px;
      padding: 0.1rem 0.5rem;
      border: 1px solid var(--sidebar-border);
      display: flex;
      align-items: center;

      body.dark-theme & {
        background: #2a3942;
      }

      input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        padding: 0.65rem 1rem;
        font-family: inherit;
        font-size: 0.92rem;
        color: var(--grey-900);
        width: 100%;

        &::placeholder {
          color: var(--grey-500);
        }
      }
    }

    .send-circle-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--primary-600);
      color: white;
      border: none;
      display: grid;
      place-items: center;
      font-size: 1.1rem;
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
      transition: var(--transition);
      flex-shrink: 0;

      &:hover:not(:disabled) {
        transform: scale(1.05);
        background: var(--primary-700);
      }

      &:disabled {
        background: var(--grey-300);
        color: var(--grey-500);
        cursor: not-allowed;
        box-shadow: none;

        body.dark-theme & {
          background: var(--grey-200);
          color: var(--grey-400);
        }
      }

      body.dark-theme & {
        background: var(--primary-500);
        color: #031838;

        &:hover:not(:disabled) {
          background: var(--primary-400);
        }
      }
    }
  }
`;

export default Wrapper;
export { Wrapper };
