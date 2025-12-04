import { createBrowserRouter } from "react-router";
import DashboardLayout from "./layout/DashboardLayout";
import AuthLayout from "./layout/AuthLayout";
import { Toaster } from "react-hot-toast";

import LoginPage from "./pages/Login";
import Signup from "./pages/Signup";
import Errorhandler from "./components/Errorhandler";
import HomePage from "./pages/HomePage";
import ProtectRoute from "./components/ProtectRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import UsersPage from "./pages/Dashboard/UsersPage";
import StorePage from "./pages/Dashboard/StoresPage";
import SettingsPage from "./pages/Dashboard/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectRoute>
        <DashboardLayout />
      </ProtectRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: (
          <ProtectRoute allowedRoles={["ADMIN"]}>
            <UsersPage />
          </ProtectRoute>
        ),
      },
      {
        path: "stores",
        element: (
          <ProtectRoute allowedRoles={["ADMIN"]}>
            <StorePage />
          </ProtectRoute>
        ),
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Errorhandler />,
  },
]);

export { router };
