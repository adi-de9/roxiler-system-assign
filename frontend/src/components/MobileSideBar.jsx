import React from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router";
import { X } from "lucide-react";

function MobileSideBar({ toggleMobile }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/95 text-white p-6 md:hidden">
      <div className="flex justify-between mb-8">
        <span className="font-bold text-xl">Menu</span>
        <button onClick={toggleMobile}>
          <X />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => {
            navigate("/dashboard");
            toggleMobile();
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            pathname === "/dashboard"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"
          }`}
        >
          Dashboard
        </button>
        {user.role === "ADMIN" && (
          <button
            onClick={() => {
              navigate("/dashboard/users");
              toggleMobile();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              pathname === "/dashboard/users"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            Users
          </button>
        )}
        {user.role === "ADMIN" && (
          <button
            onClick={() => {
              navigate("/dashboard/stores");
              toggleMobile();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              pathname === "/dashboard/stores"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            Stores
          </button>
        )}
        <button
          onClick={() => {
            navigate("/dashboard/settings");
            toggleMobile();
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            pathname === "/dashboard/settings"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"
          }`}
        >
          Settings
        </button>
      </div>
    </div>
  );
}

export default MobileSideBar;
