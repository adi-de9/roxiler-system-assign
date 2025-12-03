import { Key, LayoutDashboard, Star, Store, Users } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const menuItems = useMemo(() => {
    const common = [{ label: "Settings", path: "/settings", icon: Key }];

    if (user.role === "ADMIN") {
      return [
        { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { label: "Users", path: "/users", icon: Users },
        { label: "Stores", path: "/stores", icon: Store },
        ...common,
      ];
    }
    if (user.role === "STORE_OWNER") {
      return [
        { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        ...common,
      ];
    }
    return [
      // User
      { label: "Browse Stores", path: "/dashboard", icon: Store },
      ...common,
    ];
  }, [user]);

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 hidden  flex-col  md:flex">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3 text-indigo-400">
          <Star size={24} fill="currentColor" />
          <h2 className="text-xl font-bold text-white tracking-wide">RateIt</h2>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              "/dashboard" === item.path
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-800 rounded-lg p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
            {user.role[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate capitalize">
              {user.role.replace("_", " ").toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
