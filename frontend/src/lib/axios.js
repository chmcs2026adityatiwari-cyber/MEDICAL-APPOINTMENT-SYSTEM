import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:3001/api"
  baseURL: "https://your-backend-name.onrender.com/api/appointments"
});


export default api;