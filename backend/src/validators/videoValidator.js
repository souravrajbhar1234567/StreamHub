import { body } from "express-validator";

export const createVideoValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),
  body("videoUrl")
    .trim()
    .notEmpty()
    .withMessage("Video URL is required"),
  body("category")
    .optional()
    .trim(),
];

export const updateVideoValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),
];

export default { createVideoValidator, updateVideoValidator };
