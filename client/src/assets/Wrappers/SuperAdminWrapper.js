import styled from "styled-components";

export const SuperAdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 100%;
  animation: fadeIn 0.4s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .admin-header {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    h2 {
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--grey-900);
    }

    p {
      color: var(--grey-500);
      font-size: 1rem;
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
  }

  .stat-card {
    background: var(--white);
    padding: 1.75rem;
    border-radius: var(--radius);
    border: 1px solid var(--sidebar-border);
    box-shadow: var(--shadow-1);
    display: flex;
    align-items: center;
    gap: 1.5rem;
    transition: var(--transition);

    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-3);
      border-color: var(--primary-300);
    }

    .icon-container {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      display: grid;
      place-items: center;
      font-size: 1.6rem;
      flex-shrink: 0;
    }

    &.users .icon-container {
      background: var(--cat-blue);
      color: var(--cat-blue-text);
    }
    &.companies .icon-container {
      background: var(--cat-purple);
      color: var(--cat-purple-text);
    }
    &.estimations .icon-container {
      background: var(--cat-orange);
      color: var(--cat-orange-text);
    }
    &.hours .icon-container {
      background: var(--cat-yellow);
      color: var(--cat-yellow-text);
    }
    &.revenue .icon-container {
      background: var(--cat-green);
      color: var(--cat-green-text);
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;

      h4 {
        color: var(--grey-500);
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      p {
        font-size: 1.75rem;
        font-weight: 800;
        color: var(--grey-900);
      }
    }
  }

  .table-section {
    background: var(--white);
    border-radius: var(--radius);
    border: 1px solid var(--sidebar-border);
    box-shadow: var(--shadow-2);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .table-header-tools {
    padding: 1.5rem;
    border-bottom: 1px solid var(--sidebar-border);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    align-items: stretch;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }

    h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--grey-800);
    }

    .search-input {
      padding: 0.6rem 1.2rem;
      border: 1px solid var(--grey-300);
      border-radius: var(--radius);
      background: var(--input-bg);
      color: var(--grey-900);
      font-size: 0.9rem;
      width: 100%;
      max-width: 350px;
      transition: var(--transition);

      &:focus {
        outline: none;
        border-color: var(--primary-500);
        box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
      }
    }
  }

  .table-container {
    overflow-x: auto;
    width: 100%;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  th {
    background: var(--table-header-bg);
    color: var(--grey-600);
    padding: 1rem 1.5rem;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 2px solid var(--table-border);
  }

  td {
    padding: 1.2rem 1.5rem;
    border-bottom: 1px solid var(--table-border);
    font-size: 0.95rem;
    color: var(--grey-800);
    vertical-align: middle;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background: var(--editable-hover);
  }

  .user-profile {
    display: flex;
    align-items: center;
    gap: 1rem;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%);
      color: white;
      font-weight: 700;
      font-size: 1.1rem;
      display: grid;
      place-items: center;
      box-shadow: var(--shadow-1);
    }

    .info {
      display: flex;
      flex-direction: column;
      
      .name {
        font-weight: 600;
        color: var(--grey-900);
      }

      .email {
        font-size: 0.8rem;
        color: var(--grey-500);
      }
    }
  }

  .role-badge {
    display: inline-flex;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;

    &.admin {
      background: var(--cat-green);
      color: var(--cat-green-text);
    }

    &.user {
      background: var(--cat-blue);
      color: var(--cat-blue-text);
    }
  }

  .action-btn {
    padding: 0.45rem 0.9rem;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: var(--radius);
    border: 1px solid transparent;
    cursor: pointer;
    transition: var(--transition);

    &.promote {
      background: var(--cat-green);
      color: var(--cat-green-text);
      border-color: var(--cat-green-text);

      &:hover {
        background: var(--cat-green-text);
        color: white;
      }
    }

    &.demote {
      background: var(--cat-orange);
      color: var(--cat-orange-text);
      border-color: var(--cat-orange-text);

      &:hover {
        background: var(--cat-orange-text);
        color: white;
      }
    }
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60vh;
    gap: 1rem;
    color: var(--grey-500);

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid var(--grey-300);
      border-top-color: var(--primary-600);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .clickable-profile {
    cursor: pointer;
    transition: var(--transition);
    
    &:hover {
      opacity: 0.8;
      .name {
        color: var(--primary-600) !important;
        text-decoration: underline;
      }
    }
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--white);
    color: var(--grey-750);
    border: 1px solid var(--sidebar-border);
    padding: 0.6rem 1.2rem;
    border-radius: var(--radius);
    font-weight: 600;
    cursor: pointer;
    font-size: 0.9rem;
    transition: var(--transition);
    box-shadow: var(--shadow-1);
    align-self: flex-start;

    &:hover {
      background: var(--grey-50);
      color: var(--primary-600);
      border-color: var(--primary-300);
      transform: translateX(-3px);
    }
  }

  .user-profile-card {
    background: var(--white);
    border-radius: var(--radius);
    border: 1px solid var(--sidebar-border);
    padding: 2rem;
    box-shadow: var(--shadow-2);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .user-main-info {
      display: flex;
      align-items: center;
      gap: 1.5rem;

      .large-avatar {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%);
        color: white;
        font-weight: 700;
        font-size: 2rem;
        display: grid;
        place-items: center;
        box-shadow: var(--shadow-2);
      }

      .details {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--grey-900);
        }

        .email {
          color: var(--grey-500);
          font-size: 0.95rem;
        }

        .role-date {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
          color: var(--grey-400);
          margin-top: 0.25rem;
        }
      }
    }

    .user-meta-stats {
      display: flex;
      gap: 2rem;

      .meta-stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 0.5rem 1rem;
        background: var(--grey-50);
        border-radius: 8px;
        border: 1px solid var(--sidebar-border);
        min-width: 100px;

        span.value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-600);
        }

        span.label {
          font-size: 0.75rem;
          color: var(--grey-500);
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
      }
    }
  }

  .detail-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`;
