import React, { createContext, useState, useEffect, useContext } from 'react';
// import _ from "lodash";
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from 'react-toastify';

import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem('@App:user');
    const storagedToken = sessionStorage.getItem('@App:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  async function Login(userData) {
    try {
      const response = await api.post('sessions', userData);
      setUser(response.data.user);
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      sessionStorage.setItem('@App:user', JSON.stringify(response.data.user));
      sessionStorage.setItem('@App:token', response.data.token);
      toast.success('Autenticação realizada com sucesso!');
    } catch (error) {
      toast.error('Falha na autenticação.');
    }
  }

  function ReloadAvatar(avatar) {
    setUser({ ...user, avatar });
    sessionStorage.setItem('@App:user', JSON.stringify({ ...user, avatar }));
  }

  function ReloadUser(user) {
    setUser(user);
    sessionStorage.setItem('@App:user', JSON.stringify(user));
  }

  function Logout() {
    setUser(null);
    toast('Volte sempre!');
    sessionStorage.setItem('@App:user', JSON.stringify(null));
    sessionStorage.setItem('@App:token', JSON.stringify(null));
  }

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        user,
        Login,
        Logout,
        ReloadUser,
        ReloadAvatar,
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
