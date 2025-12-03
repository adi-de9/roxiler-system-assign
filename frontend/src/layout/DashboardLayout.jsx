import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import MobileSideBar from "../components/MobileSideBar";

function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mobile nav logic (simplified for single file)
  const toggleMobile = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen ">
        {/* Topbar */}
        <Header toggleMobile={toggleMobile} />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Menu Overlay (Simplified) */}
      {mobileMenuOpen && <MobileSideBar toggleMobile={toggleMobile} />}
    </div>
  );
}

export default DashboardLayout;
