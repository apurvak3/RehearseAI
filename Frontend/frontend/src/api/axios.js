import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ Set base to backend port
  withCredentials: true,
});

export default instance;
