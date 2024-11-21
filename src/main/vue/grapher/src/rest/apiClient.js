import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.API_URL
});

export default apiClient;
