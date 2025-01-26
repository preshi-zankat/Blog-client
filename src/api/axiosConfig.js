import axios from "axios";

//Configure Axios with the base URL and optional interceptors
const axiosInstance = axios.create({
  baseURL:"https://blog-backend-3l4r.onrender.com/api" ,
  //import.meta.env.VITE_API_URL || process.env.VITE_API_URL, // Using proxy to route requests
  timeout: 5000,
  withCredentials: true,
});


export default axiosInstance;