import axios from "axios";

const api = axios.get({
  //baseURL: "http://localhost:3001/api"
  baseURL: "https://medical-appointment-system-xwh9.onrender.com/api/appointments"
});


export default api;