import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Ajustalo si el backend cambia
});

export default api;
