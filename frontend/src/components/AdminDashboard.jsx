import { Star, Store, Users } from "lucide-react";
import { getDashboardStats } from "../utils/adminApi";
import { useQuery } from "@tanstack/react-query";
import Loader from '../components/Loader';

function AdminDashboard() {
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
    staleTime: 1000 * 60 * 1, // 1 minute caching
    refetchOnWindowFocus: false,
  });

    if (isLoading) return <Loader/>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Total Users"
          value={data?.stats?.total_users || 0}
          icon={Users}
          color="blue"
        />
        <Card
          title="Total Stores"
          value={data?.stats?.total_stores || 0}
          icon={Store}
          color="indigo"
        />
        <Card
          title="Total Ratings"
          value={data?.stats?.total_ratings || 0}
          icon={Star}
          color="yellow"
        />
      </div>
    </div>
  );
}

export const Card = ({ title, value, icon: Icon, subtext, color = "blue" }) => {
  return (
    <div
      className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200 
      flex items-center justify-between transition-all duration-200 
      hover:bg-orange-500 hover:border-orange-600 hover:shadow-md cursor-pointer"
    >
      {/* Text Section */}
      <div>
        <p
          className="text-sm font-medium text-gray-500 
          group-hover:text-white duration-200"
        >
          {title}
        </p>

        <h3
          className="text-2xl font-bold text-gray-800 mt-1 
          group-hover:text-white duration-200"
        >
          {value}
        </h3>

        {subtext && (
          <p
            className="text-xs text-gray-400 mt-1 
            group-hover:text-orange-100 duration-200"
          >
            {subtext}
          </p>
        )}
      </div>

      {/* Icon Section */}
      <div
        className={`
          p-4 rounded-full bg-${color}-100 text-${color}-600
          group-hover:bg-white group-hover:text-orange-500
          transition-all duration-200
        `}
      >
        <Icon size={24} />
      </div>
    </div>
  );
};

export default AdminDashboard;
