import styled from "styled-components";

const Wrapper = styled.section`
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
      margin: 0;
    }
    .subtitle {
      color: var(--grey-700);
      margin-top: 0.5rem;
      font-size: 0.95rem;
    }
  }

  .actions {
    display: flex;
    gap: 1rem;
    align-items: stretch;
    height: 38px;
  }

  .actions .btn {
    display: flex;
    align-items: center;
    padding: 0 1.2rem;
    margin: 0;
    font-size: 0.85rem;
  }

  .search-container {
    background: var(--white);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0 1.2rem;
    border-radius: var(--radius);
    border: 1px solid var(--grey-200);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    width: 300px;
    transition: all 0.3s ease;

    &:hover, &:focus-within {
      border-color: #031838;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    svg {
      color: #031838;
      font-size: 1rem;
    }
    
    input {
      border: none;
      outline: none;
      width: 100%;
      font-family: inherit;
      color: var(--grey-900);
      background: transparent;
      font-size: 0.85rem;
      height: 100%;
    }
  }

  .form-container {
    background: var(--white);
    border-radius: var(--radius);
    padding: 2rem;
    box-shadow: var(--shadow-1);
    border: 1px solid var(--grey-200);
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--grey-800);
    }

    input, textarea {
      padding: 0.75rem;
      border: 1px solid var(--grey-300);
      border-radius: var(--radius);
      background: var(--grey-50);
      font-family: inherit;
      color: var(--grey-900);
      transition: var(--transition);

      &:focus {
        border-color: var(--primary-500);
        background: var(--white);
        outline: none;
        box-shadow: 0 0 0 3px var(--primary-100);
      }
    }

    textarea {
      resize: vertical;
    }
  }

  .full-width {
    grid-column: 1 / -1;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--grey-100);
  }

  @media (max-width: 768px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
    .form-group {
      grid-column: 1 / -1;
    }
  }

  .table-card {
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--shadow-2);
    overflow: hidden;
    border: 1px solid var(--grey-100);
  }

  .table-container {
    overflow-x: auto;
    width: 100%;
    scrollbar-width: thin;
    scrollbar-color: var(--grey-300) transparent;

    &::-webkit-scrollbar {
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--grey-300);
      border-radius: 4px;
    }
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    white-space: nowrap;
    font-size: 0.93rem;

    th {
      padding: 1.25rem 1.5rem;
      background: var(--grey-50);
      color: var(--grey-700);
      font-weight: 600;
      font-size: 0.83rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid var(--grey-200);
    }

    tbody tr {
      transition: background-color 0.2s ease;
      &:hover {
        background-color: var(--grey-50);
      }
    }

    td {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--grey-100);
      color: var(--grey-800);
      font-size: inherit;
      vertical-align: middle;
    }

    .location {
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .job-id {
      font-weight: 600;
      color: var(--primary-600);
    }

    .dark-theme & .job-id {
      color: #ffffff;
    }

    .price {
      font-weight: 600;
      color: var(--grey-900);
    }
  }

  .status {
    padding: 0.35rem 0.8rem;
    border-radius: 5px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .status.completed {
    background: #d1fae5;
    color: #065f46;
  }
  .status.in-progress {
    background: #dbeafe;
    color: #1e40af;
  }
  .status.review {
    background: #fef3c7;
    color: #92400e;
  }
  .status.draft {
    background: #f1f5f9;
    color: #475569;
  }
  .status.under-bidding {
    background: #ede9fe;
    color: #5b21b6;
  }

  .action-btns {
    display: flex;
    gap: 0.5rem;
  }

  .icon-btn {
    width: 32px;
    height: 32px;
    border-radius: 5px;
    border: none;
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: var(--transition);
    font-size: 1rem;

    &.view {
      background: #eff6ff;
      color: #2563eb;
      &:hover {
        background: #2563eb;
        color: white;
      }
    }
    &.edit {
      background: #f0fdf4;
      color: #16a34a;
      &:hover {
        background: #16a34a;
        color: white;
      }
    }
    &.delete {
      background: #fef2f2;
      color: #dc2626;
      &:hover {
        background: #dc2626;
        color: white;
      }
    }
  }

  body.dark-theme & {
    .status.completed {
      background: rgba(6, 95, 70, 0.3);
      color: #34d399;
    }
    .status.in-progress {
      background: rgba(30, 64, 175, 0.3);
      color: #60a5fa;
    }
    .status.review {
      background: rgba(146, 64, 14, 0.3);
      color: #fbbf24;
    }
    .status.draft {
      background: rgba(71, 85, 105, 0.3);
      color: #94a3b8;
    }
    .status.under-bidding {
      background: rgba(91, 33, 182, 0.3);
      color: #a78bfa;
    }

    .icon-btn {
      &.view {
        background: rgba(37, 99, 235, 0.2);
        color: #60a5fa;
        &:hover {
          background: #2563eb;
          color: white;
        }
      }
      &.edit {
        background: rgba(22, 163, 74, 0.2);
        color: #4ade80;
        &:hover {
          background: #16a34a;
          color: white;
        }
      }
      &.delete {
        background: rgba(220, 38, 38, 0.2);
        color: #f87171;
        &:hover {
          background: #dc2626;
          color: white;
        }
      }
    }
  }

  .view-modal {
    max-width: 700px !important;
  }

  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .detail-item {
    background: var(--grey-50);
    padding: 1rem 1.25rem;
    border-radius: var(--radius);
    border: 1px solid var(--grey-100);

    &.full-width {
      grid-column: 1 / -1;
    }

    label {
      display: block;
      margin-bottom: 0.25rem;
      font-size: 0.75rem;
      color: var(--grey-500);
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    p {
      margin: 0;
      color: var(--grey-900);
      font-weight: 500;
      font-size: 1rem;
    }

    .price {
      color: var(--primary-600);
      font-weight: 700;
      font-size: 1.1rem;
    }

    body.dark-theme & {
      .price {
        color: #60a5fa;
      }
    }
  }

  .chart-section {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--grey-200);

    h4 {
      font-size: 1.1rem;
      color: var(--grey-800);
      margin-bottom: 1.5rem;
      text-align: center;
    }
  }

  .css-bar-chart {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    height: 180px;
    padding: 1rem 0;
    max-width: 500px;
    margin: 0 auto;
  }

  .bar-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 60px;
  }

  .bar-track {
    width: 45px;
    height: 140px;
    background: var(--grey-100);
    border-radius: 5px;
    display: flex;
    align-items: flex-end;
    position: relative;
  }

  .bar-fill {
    width: 100%;
    background: linear-gradient(
      180deg,
      var(--primary-400) 0%,
      var(--primary-600) 100%
    );
    border-radius: 5px;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    animation: growUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;

    &:hover {
      filter: brightness(1.1);

      .tooltip {
        opacity: 1;
        transform: translateY(-10px) translateX(-50%);
        visibility: visible;
      }
    }
  }

  @keyframes growUp {
    from {
      height: 0;
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .tooltip {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateY(0) translateX(-50%);
    background: var(--grey-900);
    color: white;
    padding: 0.35rem 0.6rem;
    border-radius: 5px;
    font-size: 0.75rem;
    font-weight: 600;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    white-space: nowrap;
    z-index: 10;

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

  .bar-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--grey-600);
  }

  .outline-btn {
    background: transparent;
    color: var(--grey-700);
    border: 1px solid var(--grey-300);
    &:hover {
      background: var(--grey-50);
      color: var(--grey-900);
    }
  }

  .danger-btn {
    background: #dc2626;
    color: white;
    border: 1px solid #dc2626;
    &:hover {
      background: #b91c1c;
      border-color: #b91c1c;
    }
  }
`;

export default Wrapper;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  z-index: 1000;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--white);
    width: 90%;
    max-width: 650px;
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    animation: modalZoomIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes modalZoomIn {
    from {
      opacity: 0;
      transform: translate(-50%, -45%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--grey-100);
    background: var(--grey-50);

    h3 {
      font-size: 1.4rem;
      color: var(--grey-900);
      margin: 0;
    }

    p {
      color: var(--grey-600);
      font-size: 0.9rem;
      margin-top: 0.25rem;
      margin-bottom: 0;
    }

    .close-btn {
      background: transparent;
      border: none;
      font-size: 1.2rem;
      color: var(--grey-500);
      cursor: pointer;
      transition: all 0.2s;
      display: grid;
      place-items: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      &:hover {
        color: var(--grey-900);
        background: var(--grey-200);
      }
    }
  }

  .modal-body {
    padding: 2rem;
    max-height: 70vh;
    overflow-y: auto;
  }

  .modal-footer {
    padding: 1.25rem 2rem;
    border-top: 1px solid var(--grey-100);
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    background: var(--grey-50);

    .btn {
      padding: 0.6rem 1.5rem;
      border-radius: var(--radius);
      font-weight: 500;
      transition: all 0.2s;
      cursor: pointer;
    }

    .cancel-btn {
      background: var(--white);
      border: 1px solid var(--grey-300);
      color: var(--grey-700);
      &:hover {
        background: var(--grey-50);
        border-color: var(--grey-400);
      }
    }
  }
`;
