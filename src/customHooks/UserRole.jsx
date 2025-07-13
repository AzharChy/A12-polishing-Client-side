// hooks/useUserRole.js
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './AxiosSecure';
import useAuth from './useAuth';


const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: dbUser = {}, isLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ['userRole', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  return { role: dbUser?.role, isLoading };
};

export default useUserRole;
