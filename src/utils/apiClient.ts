import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.openweathermap.org/data",
  timeout: 5000,
});

export default apiClient;
