const resolveApiUrl = () => {
  let url = import.meta.env.VITE_API_URL;
  if (typeof window !== "undefined") {
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    if (!isLocal && (!url || url.includes("localhost") || url.includes("127.0.0.1"))) {
      return "https://streamhub-backend-zlf8.onrender.com/api";
    }
  }
  if (!url) return "http://localhost:5001/api";
  url = url.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) url = `https://${url}`;
  if (!url.endsWith("/api")) url = url.replace(/\/$/, "") + "/api";
  return url;
};

const resolveSocketUrl = () => {
  let url = import.meta.env.VITE_SOCKET_URL;
  if (typeof window !== "undefined") {
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    if (!isLocal && (!url || url.includes("localhost") || url.includes("127.0.0.1"))) {
      return "https://streamhub-backend-zlf8.onrender.com";
    }
  }
  if (!url) return "http://localhost:5001";
  url = url.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) url = `https://${url}`;
  return url.replace(/\/$/, "").replace(/\/api$/, "");
};

export const API_BASE_URL = resolveApiUrl();
export const SOCKET_URL = resolveSocketUrl();

export const APP_NAME = "StreamHub";

export const PLANS = {
  FREE: "Free",
  BRONZE: "Bronze",
  SILVER: "Silver",
  GOLD: "Gold",
};

export const CATEGORIES = [
  "All",
  "Development",
  "DevOps",
  "Architecture",
  "Design",
  "WebRTC",
  "Database",
  "Artificial Intelligence",
  "Cloud",
];

export const PLAYBACK_RATES = [0.5, 1, 1.25, 1.5, 2];

export const VIDEO_QUALITIES = ["Auto", "360p", "720p", "1080p", "4K"];

export default {
  API_BASE_URL,
  SOCKET_URL,
  APP_NAME,
  PLANS,
  CATEGORIES,
  PLAYBACK_RATES,
  VIDEO_QUALITIES,
};
