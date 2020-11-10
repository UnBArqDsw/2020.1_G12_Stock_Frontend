import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('@auth:token');
    token = token ? JSON.parse(token) : '';
    // eslint-disable-next-line no-param-reassign
    config.headers['x-auth-token'] = token;
    return config;
  },
  (error) => {
    console.log(error);
  }
);

export default api;
