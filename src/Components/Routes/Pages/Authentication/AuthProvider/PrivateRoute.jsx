import React, { Children } from 'react';
import useAuth from '../../../../../customHooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Loading';

const PrivateRoute = ({children}) => {
  const {user, loading} = useAuth();

  const location = useLocation();

  if(loading){
    return <Loading></Loading>
  }

  if(!user){
     return <Navigate state={{from: location.pathname}} to='/login'></Navigate>
  }
  return children;
};

export default PrivateRoute;