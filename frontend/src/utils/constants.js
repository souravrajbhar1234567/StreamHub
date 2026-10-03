export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:5001";

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
