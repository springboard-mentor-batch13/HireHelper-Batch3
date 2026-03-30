import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", 
});

// 🔹 REQUEST INTERCEPTOR
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (response) => response,
  (error) => {

    // 🔥 AUTO LOGOUT
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    // 🔥 SERVER ERROR HANDLE
    if (error.response?.status === 500) {
      console.error("Server error:", error.response.data);
    }

    return Promise.reject(error);
  }
);

export default API;