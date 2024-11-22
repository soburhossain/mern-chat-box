import axios from "axios";

const API = axios.create({
  baseURL: "https://chat-app-backend-1-u5q1.onrender.com/api",
});

// Add token to request headers if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["x-auth-token"] = token;
  return config;
});

export default API;
