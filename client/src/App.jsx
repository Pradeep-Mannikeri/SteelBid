import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import Estimations from "./pages/Estimations";
import Invoices from "./pages/Invoices";
import CreateClient from "./pages/CreateClient";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import EstimationLetter from "./pages/EstimationLetter";
import AddCompany from "./pages/AddCompany";
import GetInTouch from "./pages/GetInTouch";
import Error from "./pages/Error";
import TotalSheetPlain from "./pages/TotalSheetPlain";
import { EstimationProvider } from "./context/EstimationContext";

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
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
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
