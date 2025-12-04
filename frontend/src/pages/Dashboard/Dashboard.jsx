import { useAuth } from "../../context/AuthContext";
import AdminDashboard from "../../components/AdminDashboard";
import OwnerDashboard from "../../components/OwnerDashboard";
import UserDashboard from "../../components/UserDashboard";
import Errorhandler from './../../components/Errorhandler';

function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case "ADMIN":
      return <AdminDashboard />;

    case "OWNER":
      return <OwnerDashboard />;

    case "USER":
      return <UserDashboard />;

    default:
      return <Errorhandler />;
  }
}

export default Dashboard;
