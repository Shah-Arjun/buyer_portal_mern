import axios from "axios";



const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});


// Add token to headers automatically in every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});



export default API;