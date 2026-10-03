import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env.js";

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME || "streamhub",
  api_key: ENV.CLOUDINARY_API_KEY || "dummy_key",
  api_secret: ENV.CLOUDINARY_API_SECRET || "dummy_secret",
});

export default cloudinary;
