import { Navigate, useLocation } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../../customHooks/useAuth';
import useAxiosSecure from '../../../../../customHooks/AxiosSecure';
import Loading from '../../Loading';

const AgentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  const { data: isAgent, isLoading } = useQuery({
    queryKey: ['isAgent', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/agent/${user.email}`);
      console.log(res.data.isAgent)
      return res.data.isAgent;
    }
  });

  if (loading || isLoading) return <Loading text="Checking Customers..." />;
  if (isAgent) return children;

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AgentRoute;
