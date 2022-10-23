// import React, { useContext } from 'react';
// import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({isAuth, children}) => {
  // const {uid} = useSelector(state => state.auth)
  // const {pathname, search} = useLocation();

  // const {user} = useContext(AuthContext);
    
  return isAuth
    ? children
    : <Navigate to="auth/login"/>
  
};
