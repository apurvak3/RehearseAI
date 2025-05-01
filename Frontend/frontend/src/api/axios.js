import axios from "axios";

const instance = axios.create({
  baseURL: "https://rehearseai.onrender.com",  // Change if your backend is hosted
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
