import axios from "axios";

const protectedInstance = axios.create({
  baseURL: "http://localhost:3001/api/v1",

  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

export default protectedInstance;
