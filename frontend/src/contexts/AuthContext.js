import React, { createContext, useState, useEffect, useContext } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from 'react-toastify';

import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem('@App:user');
    const storagedToken = sessionStorage.getItem('@App:token');

    if (storagedToken && storagedUser) {
      setAuthenticatedUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }

    setLoading(false);
  }, []);

  async function handleLogin(userData) {
    try {
      const {
        data: { token, user },
      } = await api.post('sessions', userData);

      api.defaults.headers.Authorization = `Bearer ${token}`;
      
      sessionStorage.setItem('@App:user', JSON.stringify(user));
      sessionStorage.setItem('@App:token', token);
      
      setAuthenticatedUser(user);
      
      toast.success('Autenticação realizada com sucesso!');
    } catch (error) {
      toast.error('Falha na autenticação.');
    }
  }

  function handleReloadAvatar(avatar) {
    setAuthenticatedUser({ ...authenticatedUser, avatar });
    sessionStorage.setItem('@App:user', JSON.stringify({ ...authenticatedUser, avatar }));
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
        authenticated: Boolean(authenticatedUser),
        user: authenticatedUser,
        loading,
        handleLogin,
        handleLogout,
        handleReloadUser,
        handleReloadAvatar
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
