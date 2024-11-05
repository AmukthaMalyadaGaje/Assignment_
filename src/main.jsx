import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import CreateEmployee from "./components/CreateEmployee.jsx";
import EmployeeDetails from "./components/EmployeeDetails.jsx";
import Home from "./components/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout.jsx";
import Profile from "./components/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/login", element: <Login /> },
      { path: "/logout", element: <Logout /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard/",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "create_employee",
        element: (
          <ProtectedRoute>
            <CreateEmployee />
          </ProtectedRoute>
        ),
      },
      {
        path: "employee",
        element: (
          <ProtectedRoute>
            <EmployeeDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "employee/edit",
        element: (
          <ProtectedRoute>
            <CreateEmployee />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
