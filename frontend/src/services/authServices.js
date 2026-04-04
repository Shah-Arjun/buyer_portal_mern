import axios from "axios";
import { jwtDecode } from "jwt-decode";



const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});



// function to check token expiry
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (err) {
    console.log(err)
    return true; // if unvalid token -> treat as expired
  }
};



// Request Interceptor   ---> attach token in every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(new Error("Token expired"));
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});



export default API;