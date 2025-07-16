
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from './useAuth';


const axiosSecure = axios.create({
  baseURL: 'https://insurance-app-server.vercel.app',
  withCredentials: true
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(
      config => {
        const token = user?.accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const resInterceptor = axiosSecure.interceptors.response.use(
      res => res,
      error => {
        const status = error.response?.status;

        if (status === 403) {
          navigate('/forbidden');
        } else if (status === 401) {
          logOut()
            .then(() => navigate('/unauthorized'))
            .catch(() => {});
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
