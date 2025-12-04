import { useNavigate, Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Loader } from "lucide-react";

function ProtectRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin" size={20} />
      </div>
    );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl font-bold text-gray-800">Access Denied</h1>
        <p className="text-gray-500 my-2">
          You don't have permission to view this page.
        </p>
        <button
          className="btn bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return children;
}

export default ProtectRoute;
