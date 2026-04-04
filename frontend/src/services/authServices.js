import axios from "axios";

const API = axios.create({
  baseURL: "https://buyer-portal-mern.onrender.com/api",
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