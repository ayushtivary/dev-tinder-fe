import axios from "axios";
import { environment } from "../Environment/environment";

// Simple loader control (replace with your global loader logic)
let loaderCount = 0;
const showLoader = () => {
  loaderCount++;
  // Show loader (e.g., set global state)
  window.dispatchEvent(new CustomEvent("showLoader"));
};
const hideLoader = () => {
  loaderCount = Math.max(loaderCount - 1, 0);
  if (loaderCount === 0) {
    // Hide loader (e.g., set global state)
    window.dispatchEvent(new CustomEvent("hideLoader"));
  }
};

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
    // If config.hideLoader is not true, show loader
    if (!config.hideLoader) {
      showLoader();
    }
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
    // Hide loader unless config.hideLoader is true
    if (!response.config.hideLoader) {
      hideLoader();
    }
    // You can handle global response logic here
    return response;
  },
  (error) => {
    if (!error.config?.hideLoader) {
      hideLoader();
    }
    // Example: Handle 401 errors globally
    if (error.response && error.response.status === 401) {
      // Optionally redirect to login or show a message
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;