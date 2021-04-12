import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { StatusBar } from "react-native";
import { Snackbar } from "react-native-paper";

import axios from 'axios'

const AuthContext = createContext({ signed: false, user: {} });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem("@RNAuth:user");
      const storageToken = await AsyncStorage.getItem("@RNAuth:token");

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      } else if (!storageUser && !storageToken) {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function signIn(userData) {
    try {
      const { data } = await axios.post("sessions", userData);
      setUser(data.user);
      await AsyncStorage.setItem("@RNAuth:user", JSON.stringify(data.user));
      await AsyncStorage.setItem("@RNAuth:token", data.token);
    } catch (error) {
      setError(true);
    }
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, loading }}
    >
      {!user ? (
        <StatusBar barStyle="light-content" backgroundColor="#0a0742" />
      ) : (
        <StatusBar barStyle="light-content" backgroundColor="#0a0742" />
      )}
      {children}
      <Snackbar visible={error} onDismiss={() => setError(false)}>
        Erro ao realizar login, tente novamente.
      </Snackbar>
    </AuthContext.Provider>
  );
};

export default AuthContext;
