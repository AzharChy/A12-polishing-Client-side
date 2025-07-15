import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../../../customHooks/useAuth";
import useUserRole from "../../../../../customHooks/UserRole";
import Loading from "../../Loading";


const CustomerRoute = ({ children }) => {
  const { user, loading } = useAuth();              // Firebase user
  const { role, isLoading } = useUserRole();        // Role from MongoDB via /users?email=
  const location = useLocation();

  if (loading || isLoading) return <Loading />;

  if (user && role === 'user') return children;

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default CustomerRoute;
