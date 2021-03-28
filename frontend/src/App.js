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
        <GlobalStyles />
        <ToastContainer autoClose={3000}/>
      </AuthProvider>
    </div>
  );
}

export default App;
