import React from "react";
import { Link, useRouteError } from "react-router-dom";
import styled from "styled-components";

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <h3>Ohh! Page Not Found</h3>
          <p>We can't seem to find the page you're looking for.</p>
          <Link to="/dashboard">Back Home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>Something went wrong</h3>
        <p>{error?.message || "An unexpected error occurred."}</p>
        <Link to="/dashboard">Back Home</Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--grey-50);
  
  h3 {
    margin-bottom: 0.5rem;
    font-size: 2rem;
    color: var(--grey-900);
  }
  p {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: var(--grey-600);
    font-size: 1.1rem;
  }
  a {
    color: var(--primary-500);
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: var(--transition);
    border-bottom: 1px solid transparent;

    &:hover {
      color: var(--primary-700);
      border-bottom-color: var(--primary-700);
    }
  }
`;

export default Error;
