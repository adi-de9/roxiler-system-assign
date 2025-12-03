import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./layout/AuthLayout";
import Errorhandler from "./components/Errorhandler";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layout/DashboardLayout";
import HomePage from "./pages/HomePage";
import ProtectRoute from "./components/ProtectRoute";

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
        element: <Dashboard />,
      },
      {
        path: "stores",
        element: <Dashboard />,
      },
      {
        path: "settings",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <Errorhandler />,
  },
]);

export { router }