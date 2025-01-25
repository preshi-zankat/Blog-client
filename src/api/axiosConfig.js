import axios from "axios";

//Configure Axios with the base URL and optional interceptors
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || process.env.VITE_API_URL, // Using proxy to route requests
  timeout: 5000,
});


export default axiosInstance;