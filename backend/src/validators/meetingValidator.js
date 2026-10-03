import { body } from "express-validator";

export const createMeetingValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Meeting title is required")
    .isLength({ min: 3, max: 120 })
    .withMessage("Title must be between 3 and 120 characters"),
];

export const joinMeetingValidator = [
  body("roomId")
    .trim()
    .notEmpty()
    .withMessage("Room ID is required"),
];

export default { createMeetingValidator, joinMeetingValidator };
