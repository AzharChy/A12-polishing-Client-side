import { Navigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../../customHooks/useAuth';
import useAxiosSecure from '../../../../../customHooks/AxiosSecure';

const AdminOrAgentRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user from DB
  const { data: dbUser, isLoading: dbLoading } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    }
  });

  if (authLoading || dbLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (dbUser?.role === 'admin' || dbUser?.role === 'agent') {
    return children;
  }

  return <Navigate to="/unauthorized" />;
};

export default AdminOrAgentRoute;
