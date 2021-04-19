import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './hooks/auth';

import GlobalStyles from './styles/global';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>

      <GlobalStyles />
      <ToastContainer autoClose={3000} position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
