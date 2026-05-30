import React, { createContext, useState, useEffect } from "react";

export const EstimationContext = createContext();

export const EstimationProvider = ({ children }) => {
  const [estimations, setEstimations] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEstimations = async () => {
    try {
      const res = await fetch("/api/v1/estimations");
      if (res.status === 401 || res.status === 403) {
        setLoading(false);
        if (window.location.pathname.startsWith("/dashboard")) {
          window.location.href = "/login";
        }
        return;
      }
      const data = await res.json();
      setEstimations(data.estimations || []);
    } catch (err) {
      console.error("Failed to fetch estimations:", err);
    }
  };

  const fetchCompanies = async () => {
    try {
      const res = await fetch("/api/v1/compnay");
      if (res.status === 401 || res.status === 403) {
        return;
      }
      const data = await res.json();
      setCompanies(data.companies || []);
    } catch (err) {
      console.error("Failed to fetch companies:", err);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch("/api/v1/auth/current-user");
      if (res.status === 401 || res.status === 403) {
        return;
      }
      const data = await res.json();
      setCurrentUser(data.user || null);
    } catch (err) {
      console.error("Failed to fetch current user:", err);
    }
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchEstimations(), fetchCompanies(), fetchCurrentUser()]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addEstimation = async (newEst) => {
    try {
      const res = await fetch("/api/v1/estimations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEst),
      });
      if (res.status === 401 || res.status === 403) {
        window.location.href = "/login";
        return;
      }
      const data = await res.json();
      setEstimations((prev) => [data.estimation, ...prev]);
    } catch (err) {
      console.error("Failed to add estimation:", err);
    }
  };

  const updateEstimation = async (id, updatedData) => {
    try {
      const res = await fetch(`/api/v1/estimations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (res.status === 401 || res.status === 403) {
        window.location.href = "/login";
        return;
      }
      const data = await res.json();
      setEstimations((prev) =>
        prev.map((est) => (est.id === id ? data.estimation : est))
      );
    } catch (err) {
      console.error("Failed to update estimation:", err);
    }
  };

  const deleteEstimation = async (id) => {
    try {
      const res = await fetch(`/api/v1/estimations/${id}`, {
        method: "DELETE",
      });
      if (res.status === 401 || res.status === 403) {
        window.location.href = "/login";
        return;
      }
      setEstimations((prev) => prev.filter((est) => est.id !== id));
    } catch (err) {
      console.error("Failed to delete estimation:", err);
    }
  };

  const addCompany = async (newComp) => {
    try {
      const res = await fetch("/api/v1/compnay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComp),
      });
      if (res.status === 401 || res.status === 403) {
        window.location.href = "/login";
        return;
      }
      const data = await res.json();
      setCompanies((prev) => [data.company, ...prev]);
    } catch (err) {
      console.error("Failed to add company:", err);
    }
  };

  const updateCompany = async (id, updatedData) => {
    try {
      const res = await fetch(`/api/v1/compnay/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (res.status === 401 || res.status === 403) {
        window.location.href = "/login";
        return;
      }
      const data = await res.json();
      setCompanies((prev) =>
        prev.map((comp) => (comp._id === id ? data.company : comp))
      );
    } catch (err) {
      console.error("Failed to update company:", err);
    }
  };

  const deleteCompany = async (id) => {
    try {
      const res = await fetch(`/api/v1/compnay/${id}`, {
        method: "DELETE",
      });
      if (res.status === 401 || res.status === 403) {
        window.location.href = "/login";
        return;
      }
      setCompanies((prev) => prev.filter((comp) => comp._id !== id));
    } catch (err) {
      console.error("Failed to delete company:", err);
    }
  };

  const logoutUser = async () => {
    try {
      await fetch("/api/v1/auth/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setCurrentUser(null);
    setEstimations([]);
    setCompanies([]);
    sessionStorage.removeItem("demoBidFilled");
    sessionStorage.removeItem("demoBidFormData");
  };

  return (
    <EstimationContext.Provider
      value={{
        estimations,
        companies,
        currentUser,
        loading,
        loadData,
        fetchEstimations,
        addEstimation,
        updateEstimation,
        deleteEstimation,
        addCompany,
        updateCompany,
        deleteCompany,
        logoutUser,
      }}
    >
      {children}
    </EstimationContext.Provider>
  );
};
