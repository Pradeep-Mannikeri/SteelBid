import styled from "styled-components";

export const AdminContainer = styled.div`
  min-height: 100vh;
  background-color: var(--background);
  color: var(--grey-800);
  display: flex;
  flex-direction: column;
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

  /* Admin Header Nav styling */
  .admin-header-nav {
    height: 79px;
    background: var(--white);
    border-bottom: 1px solid var(--sidebar-border);
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-center {
    width: 90%;
    max-width: 1400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;

    img {
      max-width: 150px;
      max-height: 48px;
      object-fit: contain;
    }
  }

  .admin-title-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--grey-900);

    .badge {
      background: var(--primary-600);
      color: white;
      font-size: 0.75rem;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      text-transform: uppercase;
    }
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    .back-btn {
      color: var(--grey-600);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: var(--transition);

      &:hover {
        color: var(--primary-500);
      }
    }
  }

  /* Admin Dashboard Main Content */
  .admin-content {
    flex: 1;
    width: 90%;
    max-width: 1400px;
    margin: 2.5rem auto;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .welcome-section {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    h1 {
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--grey-900);
    }

    p {
      color: var(--grey-500);
      font-size: 1rem;
    }
  }

  /* Stats Grid */
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

  /* Table Section styling */
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

  /* User profile cell layout */
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

  /* Center spinner loading container */
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
`;
