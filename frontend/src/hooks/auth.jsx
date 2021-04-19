import React, { createContext, useState, useEffect, useContext } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from 'react-toastify';

import api from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(
    JSON.parse(sessionStorage.getItem('@App:user'))
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem('@App:user');
    const storagedToken = sessionStorage.getItem('@App:token');

    if (storagedToken && storagedUser) {
      setAuthenticatedUser(JSON.parse(storagedUser));
    }

    setLoading(false);
  }, []);

  async function handleLogin(userData) {
    try {
      setLoading(true);
      const {
        data: { token, user },
      } = await api.post('sessions', userData);

      sessionStorage.setItem('@App:user', JSON.stringify(user));
      sessionStorage.setItem('@App:token', token);

      setAuthenticatedUser(user);

      toast.success('Autenticação realizada com sucesso!');
    } catch (error) {
      toast.error('Falha na autenticação.');
    } finally {
      setLoading(false);
    }
  }

  function handleReloadAvatar(avatar) {
    setAuthenticatedUser({ ...authenticatedUser, avatar });
    sessionStorage.setItem(
      '@App:user',
      JSON.stringify({ ...authenticatedUser, avatar })
    );
  }

  function handleReloadUser(user) {
    setAuthenticatedUser(user);
    sessionStorage.setItem('@App:user', JSON.stringify(user));
  }

  function handleLogout() {
    setAuthenticatedUser(null);
    toast('Volte sempre!');
    sessionStorage.setItem('@App:user', JSON.stringify(null));
    sessionStorage.setItem('@App:token', JSON.stringify(null));
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(authenticatedUser),
        user: authenticatedUser,
        loading,
        handleLogin,
        handleLogout,
        handleReloadUser,
        handleReloadAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
