import { body } from "express-validator";

export const subscribeValidator = [
  body("planCode")
    .trim()
    .notEmpty()
    .withMessage("Plan code is required (free, pro, or premium)")
    .isIn(["free", "pro", "premium"])
    .withMessage("Plan code must be free, pro, or premium"),
];

export default { subscribeValidator };
