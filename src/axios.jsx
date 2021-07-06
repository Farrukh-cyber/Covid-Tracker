import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.covid19api.com",
});

export default axiosInstance;