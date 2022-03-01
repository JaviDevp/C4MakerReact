import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({isAuth, children}) => {
  //const {user} = useContext(AuthContext);
  return isAuth
    ? <Navigate to="/"/>
    : children
};
