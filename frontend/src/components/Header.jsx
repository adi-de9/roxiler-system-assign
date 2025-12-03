import { Menu, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { logout } from "../utils/auth";

function Header({ toggleMobile }) {
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    const res = await logout();
    if (res.success) {
      setUser(null);
    }
  };

  return (
    <header className="bg-white shadow-xs h-16 border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button className="md:hidden text-gray-500" onClick={toggleMobile}>
          <Menu />
        </button>

        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          Dashboard
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end mr-2">
          <span className="text-sm font-semibold text-gray-800 capitalize">
            {user?.name || "User"}
          </span>
          <span className="text-xs text-gray-500">{user?.email}</span>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}

export default Header;
