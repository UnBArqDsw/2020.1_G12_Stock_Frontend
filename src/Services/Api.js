import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.20.0.1:8000/api',
});

export default api;
