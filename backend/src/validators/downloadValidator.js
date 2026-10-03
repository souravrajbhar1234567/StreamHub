import { body, param } from "express-validator";

export const downloadVideoValidator = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("Video ID is required"),
  body("quality")
    .optional()
    .isIn(["360p", "720p", "1080p", "4K"])
    .withMessage("Quality must be 360p, 720p, 1080p, or 4K"),
];

export default { downloadVideoValidator };
