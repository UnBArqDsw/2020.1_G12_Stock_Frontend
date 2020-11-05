import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use(
  async (config) => {
      const token = JSON.parse(localStorage.getItem('@auth:token'));
      config.headers['x-auth-token'] = token;
      return config;
  },
  (error) => {
      console.log(error);
  }
);

export default api;
