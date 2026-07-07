import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://learning-management-system-backend-jyq5.onrender.com/api/v1",

  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
