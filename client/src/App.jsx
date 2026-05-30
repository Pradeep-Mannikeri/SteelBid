import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import Estimations from "./pages/Estimations";
import Invoices from "./pages/Invoices";
import CreateClient from "./pages/demo-user/CreateClient";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import EstimationLetter from "./pages/EstimationLetter";
import AddCompany from "./pages/AddCompany";
import GetInTouch from "./pages/GetInTouch";
import Error from "./pages/Error";
import TotalSheetPlain from "./pages/TotalSheetPlain";
import Pricing from "./pages/Pricing";
import { EstimationProvider } from "./context/EstimationContext";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import SuperAdminStats from "./pages/superadmin/SuperAdminStats";
import SuperAdminUsers from "./pages/superadmin/SuperAdminUsers";
import SuperAdminDemoUsers from "./pages/superadmin/SuperAdminDemoUsers";
import SuperAdminUserDetails from "./pages/superadmin/SuperAdminUserDetails";
import SuperAdminComplaints from "./pages/superadmin/SuperAdminComplaints";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Stats />,
      },
      {
        path: "add-company",
        element: <AddCompany />,
      },
      {
        path: "estimations",
        element: <Estimations />,
      },
      {
        path: "estimations/create",
        element: <CreateClient />,
      },
      {
        path: "estimations/totalsheet",
        element: <TotalSheetPlain />,
      },
      {
        path: "invoices",
        element: <Invoices />,
      },
      {
        path: "estimations/letter/:id",
        element: <EstimationLetter />,
      },
      {
        path: "contact",
        element: <GetInTouch />,
      },
    ],
  },
  {
    path: "/demo-user",
    element: <CreateClient />,
    errorElement: <Error />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
    errorElement: <Error />,
  },
  {
    path: "/superadmin",
    element: <SuperAdminDashboard />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <SuperAdminStats />,
      },
      {
        path: "users",
        element: <SuperAdminUsers />,
      },
      {
        path: "demo-users",
        element: <SuperAdminDemoUsers />,
      },
      {
        path: "users/:id",
        element: <SuperAdminUserDetails />,
      },
      {
        path: "customer",
        element: <SuperAdminComplaints />,
      },
    ],
  },
]);

const App = () => {
  return (
    <EstimationProvider>
      <RouterProvider router={router} />
    </EstimationProvider>
  );
};

export default App;
