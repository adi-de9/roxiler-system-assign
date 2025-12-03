import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { X } from "lucide-react";

function MobileSideBar({ toggleMobile }) {
  const { user } = useAuth();
  const navigate = useNavigate();

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
          className="text-left text-lg"
        >
          Dashboard
        </button>
        {user.role === "ADMIN" && (
          <button
            onClick={() => {
              navigate("/users");
              toggleMobile();
            }}
            className="text-left text-lg"
          >
            Users
          </button>
        )}
        {user.role === "ADMIN" && (
          <button
            onClick={() => {
              navigate("/stores");
              toggleMobile();
            }}
            className="text-left text-lg"
          >
            Stores
          </button>
        )}
        <button
          onClick={() => {
            navigate("/settings");
            toggleMobile();
          }}
          className="text-left text-lg"
        >
          Settings
        </button>
      </div>
    </div>
  );
}

export default MobileSideBar;
