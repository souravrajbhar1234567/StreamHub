import { body } from "express-validator";

export const addCommentValidator = [
  body("text")
    .optional()
    .trim(),
  body("content")
    .optional()
    .trim(),
  body().custom((value, { req }) => {
    const text = req.body.text || req.body.content;
    if (!text || text.trim().length === 0) {
      throw new Error("Comment text cannot be empty");
    }
    if (text.length > 1000) {
      throw new Error("Comment cannot exceed 1000 characters");
    }
    return true;
  }),
];

export const reportCommentValidator = [
  body("reason")
    .trim()
    .notEmpty()
    .withMessage("Reason for reporting is required"),
];

export default { addCommentValidator, reportCommentValidator };
