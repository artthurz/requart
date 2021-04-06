import React from 'react';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/auth';

import GlobalStyles from './styles/global';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <GlobalStyles />
      <ToastContainer autoClose={3000} position="bottom-right" />
    </div>
  );
}

export default App;
