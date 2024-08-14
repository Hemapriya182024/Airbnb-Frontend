// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://airbnb-backend-tm1o.onrender.com/',
  
});

export default axiosInstance;
