// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // porta back
});

export default api;
