import React from 'react';
import { Provider } from 'react-redux'
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';
import './index.css';
import { SocketProvider } from './context/SocketContext';
export const JournalApp = () => {
  return (
    <SocketProvider>
    <Provider store={store}>
        <AppRouter/>
    </Provider>
    </SocketProvider>
  );
};
