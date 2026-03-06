import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:3001/api"
  baseURL: "https://medical-appointment-system-1-zid3.onrender.com"
});


export default api;