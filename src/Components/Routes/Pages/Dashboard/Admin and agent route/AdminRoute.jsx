import { useQuery } from '@tanstack/react-query';
import { Navigate, useLocation } from 'react-router-dom';

import useAxiosSecure from '../../../../../customHooks/AxiosSecure';
import useAuth from '../../../../../customHooks/useAuth';
import Loading from '../../Loading';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  // Wait until Firebase auth is ready
  const { data: isAdmin, isLoading: adminLoading } = useQuery({
    queryKey: ['isAdmin', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data?.isAdmin; // should return true/false
    },
  });

  if (loading || adminLoading) return <Loading text="Checking admin..." />;

  if (!user || !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
