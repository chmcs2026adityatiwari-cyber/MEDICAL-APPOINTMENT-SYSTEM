import axios from "axios";

const api = axios.create({
  baseURL: "https://medical-appointment-system-xwh9.onrender.com/api"
});

export default api;