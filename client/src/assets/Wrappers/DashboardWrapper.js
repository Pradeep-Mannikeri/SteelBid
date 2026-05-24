import styled from "styled-components";

export const DashboardContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  height: 100vh;
  overflow: hidden;
  background-color: var(--background);

  @media (min-width: 992px) {
    grid-template-columns: auto 1fr;
    transition: grid-template-columns 0.3s ease;
  }

  .main-content {
    height: 100vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
`;

export const DashboardMain = styled.div`
  width: 95%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 2rem 0;

  @media (min-width: 992px) {
    padding: 3rem;
  }
`;

export const NavbarWrapper = styled.nav`
  height: 79px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 50;
  flex-shrink: 0;

  .nav-center {
    display: flex;
    width: 95%;
    align-items: center;
    justify-content: space-between;
  }

  .logo-text {
    font-family: inherit;
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--grey-900);
    span {
      color: var(--primary-500);
    }
  }



  .btn-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .logout-btn {
    padding: 0.6rem 1.5rem;
  }
`;

export const SidebarWrapper = styled.aside`
  /* Mobile Sidebar (Modal) */
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  opacity: 0;
  transition: var(--transition);
  visibility: hidden;

  &.show-sidebar {
    z-index: 1000;
    opacity: 1;
    visibility: visible;
  }

  .sidebar-container {
    background: var(--sidebar-bg);
    width: 90vw;
    height: 90vh;
    border-radius: 5px;
    padding: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
    overflow: hidden;
  }

  .close-btn {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    background: rgba(255,255,255,0.15);
    border: none;
    font-size: 1rem;
    color: white;
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    cursor: pointer;
    transition: var(--transition);
    z-index: 10;
    &:hover { background: rgba(255,255,255,0.3); }
  }

  header {
    height: 79px;
    padding: 0 1.5rem;
    border-bottom: 1px solid var(--sidebar-border);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--sidebar-bg);
  }

  .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .logo-img {
      max-width: 177px;
      max-height: 56px;
      object-fit: contain;
      border-radius: 5px;
      transition: var(--transition);
    }
  }

  .content {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem 0;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0 1rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    color: var(--sidebar-text);
    padding: 0.85rem 1.25rem;
    text-transform: capitalize;
    transition: var(--transition);
    text-decoration: none;
    border-radius: 5px;
    font-weight: 500;
    font-size: 0.95rem;
    letter-spacing: 0.01em;
  }

  .nav-link:hover {
    background: var(--sidebar-hover-bg);
    color: var(--sidebar-text-hover);
    transform: translateX(4px);
  }

  .nav-link.active {
    background: var(--sidebar-active-bg);
    color: var(--sidebar-active-text);
    font-weight: 600;
  }

  .icon {
    font-size: 1.2rem;
    margin-right: 1rem;
    opacity: 0.9;
  }

  /* Desktop Sidebar */
  @media (min-width: 992px) {
    display: block;
    position: sticky;
    top: 0;
    height: 100vh;
    inset: auto;
    background: var(--sidebar-bg);
    opacity: 1;
    visibility: visible;
    z-index: 1;
    width: 260px;
    margin-left: -260px;

    &.show-sidebar { margin-left: 0; }

    .sidebar-container {
      width: 100%;
      height: 100%;
      border-radius: 0;
      background: var(--sidebar-bg);
      overflow-y: auto;
      border-right: 1px solid var(--sidebar-border);
    }

    .close-btn { display: none; }
  }

  /* Sidebar Footer Styling */
  .sidebar-footer {
    padding: 1.5rem 1rem;
    border-top: 1px solid var(--sidebar-border);
    background: var(--sidebar-bg);
  }

  .contact-link {
    text-transform: none;
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    
    .icon {
      font-size: 0.95rem;
      margin-right: 0.75rem;
    }

    &.nav-link:hover,
    &.nav-link.active,
    &.nav-link.active:hover {
      background: transparent;
      transform: none;
    }
  }
`;
