import axios from "axios";
import { environment } from "../Environment/environment"
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: environment, // or your environment variable
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Add auth token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // You can add more logic here
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can handle global response logic here
    return response;
  },
  (error) => {
    // Example: Handle 401 errors globally
    if (error.response && error.response.status === 401) {
      // Optionally redirect to login or show a message
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;