import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Add token to request headers if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["x-auth-token"] = token;
  return config;
});

export default API;
