import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",  // Change if your backend is hosted
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
