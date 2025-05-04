import { check } from "express-validator";
import { Teacher } from "../models/teacher.models.js";

export const loginValidation = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .isLength({ min: 4, max: 150 })
    .withMessage("Email must be between 4 and 150 characters")
    .custom(async (email) => {
        const existingUser = await Teacher.findOne({ email: email });
        if (!existingUser) {
        throw new Error("Email not found");
        }
        return true;
    }),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 100 })
    .withMessage("Password must be between 8 and 100 characters"),
];
