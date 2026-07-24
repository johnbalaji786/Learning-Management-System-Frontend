import axios from "axios";

const protectedInstance = axios.create({
  baseURL:
    "https://learning-management-system-backend-jyq5.onrender.com/api/v1",

  timeout: 30000,

  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

export default protectedInstance;
