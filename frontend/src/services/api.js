
import axios from "axios";

export const getBaseURL = () => {
  let url = import.meta.env.VITE_API_URL;

  if (typeof window !== "undefined") {
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (!isLocal) {
      if (!url || url.includes("localhost") || url.includes("127.0.0.1")) {
        return "https://streamhub-backend-zlf8.onrender.com/api";
      }
    }
  }

  if (!url) {
    return "http://localhost:5001/api";
  }

  url = url.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }
  if (!url.endsWith("/api")) {
    url = url.replace(/\/$/, "") + "/api";
  }

  return url;
};

const api = axios.create({
  baseURL: getBaseURL(),

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("streamhub_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("streamhub_token");
    }

    return Promise.reject(error);
  }
);

export default api;

