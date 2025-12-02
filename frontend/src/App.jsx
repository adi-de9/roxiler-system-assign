import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./layout/AuthLayout";
import Errorhandler from "./components/Errorhandler";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layout/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
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
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      }
    ],
  },
  {
    path: "*",
    element: <Errorhandler />,
  },
]);

export { router }