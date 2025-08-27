import axios from "axios";
import Cookies from "js-cookie";

// Create an Axios instance with a base URL for the backend server
const api = axios.create({
  baseURL: "https://rentapp-03a7e5a6efce.herokuapp.com", // Change this to your deployed backend URL in production
});

// Request interceptor to include the JWT token from cookies
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Retrieve token stored in cookies
    if (token) {
      // Attach the token to the Authorization header if available
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error) // Handle request errors
);

export default api;
