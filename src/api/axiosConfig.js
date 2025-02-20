import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://blog-backend-3l4r.onrender.com/api",
  timeout: 5000,
  //withCredentials: true, // Ensure credentials are sent if needed
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
