import React, { Children } from 'react';
import useAuth from '../../../../../customHooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({Children}) => {
  const {user} = useAuth();

  const location = useLocation();

  if(!user){
     return <Navigate state={{from: location.pathname}} to='/login'></Navigate>
  }
  return Children;
};

export default PrivateRoute;