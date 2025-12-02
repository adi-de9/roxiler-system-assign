import { LogOut, Menu } from "lucide-react";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "../components/SideBar";

function DashboardLayout() {
    // const { user } = useAuth();
    const { navigate } = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Mobile nav logic (simplified for single file)
    const toggleMobile = () => setMobileMenuOpen(!mobileMenuOpen);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Topbar */}
                <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-gray-500" onClick={toggleMobile}>
                            <Menu />
                        </button>
                        <h2 className="text-lg font-semibold text-gray-700 capitalize">
                            {/* {currentPath.replace("/", "").replace("-", " ") || "Dashboard"} */}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex flex-col items-end mr-2">
                            <span className="text-sm font-semibold text-gray-800">
                                aDITYA    {/* {user.name} */}
                            </span>
                            <span className="text-xs text-gray-500">ADMI@GMAIL.COM</span>
                        </div>
                        <button
                            onClick={() => {

                                navigate("/login");
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-y-auto"><Outlet /></main>
            </div>

            {/* Mobile Menu Overlay (Simplified) */}
            {mobileMenuOpen && (
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
                        {/* {user.role === "ADMIN" && (
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
                        )} */}
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
            )}
        </div>
    );
}

export default DashboardLayout;
