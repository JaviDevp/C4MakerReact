import { firebase } from '../firebase/firebase-config';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React, { useEffect, useState } from 'react';
import { AuthRouter } from "./AuthRouter";
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { HomeScreen } from '../components/HomeScreen';
import { Board } from '../components/Board';
import { SocketProvider } from '../context/SocketContext';


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
          <Route
              path="/diagram/:id"
              element={<Board/>}
          />
          
        </Routes>
    </Router>
        
  )
};
