import axios from 'axios';

const storagedToken = sessionStorage.getItem('@App:token');

const api = axios.create({
  baseURL: 'http://192.168.0.4:3333/',
  headers: {
    Authorization: `Bearer ${storagedToken}`
  }
});

export default api;
