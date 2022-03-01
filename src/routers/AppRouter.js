import { firebase } from '../firebase/firebase-config';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";

import React, { useEffect, useState } from 'react';
import { AuthRouter } from "./AuthRouter";
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { LoginScreen } from '../components/auth/LoginScreen';
import { PrivateRoute } from './PrivateRoute';
import { HomeScreen } from '../components/HomeScreen';


export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)  =>{
      if( user?.uid ){
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);

      }
      setChecking(false);
    });

  }, [dispatch, setChecking, setIsLoggedIn])

  if(checking) {
    return (
      <h1>Espere...</h1>
    )
  }
  
  return (
    <Router>
      <Routes>
          <Route
              exact
              path="/auth/*"
              element={
                <PublicRoute isAuth={isLoggedIn}>
                  <AuthRouter/>
                </PublicRoute>
              }
          />
          <Route
              path="/*"
              element={
                <PrivateRoute isAuth={isLoggedIn}>
                  <HomeScreen/>
                </PrivateRoute>
              }
          />
          
        </Routes>
    </Router>
        
  )
};
