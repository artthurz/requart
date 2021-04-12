import "react-native-gesture-handler";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";


import { AuthProvider } from "./contexts/auth";
import Routes from "./routes";


import axios from 'axios'
import AsyncStorage from "@react-native-community/async-storage"

axios.defaults.baseURL='http://192.168.0.4:3333/'

axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('@RNAuth:token')
    if (token) {
      config.headers.Authorization = "Bearer "+token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
