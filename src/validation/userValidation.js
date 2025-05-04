import { check } from "express-validator";
import { User } from "../models/user.model.js";

export const userValidation = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 150 })
    .withMessage("Name must be between 3 and 150 characters"),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .isLength({ min: 4, max: 150 })
    .withMessage("Email must be between 4 and 150 characters")
    .custom(async (email) => {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
        throw new Error("Email already exists");
        }
        return true;
    }),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 100 })
    .withMessage("Password must be between 8 and 100 characters"),

  check("mobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile must be exactly 10 characters")
    .isNumeric()
    .withMessage("Mobile must contain only numeric characters"),

  check("role_id")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .withMessage("Role must be exactly 10 characters"),

  check("reporting_head_id")
    .optional(),

  check("reporting_user_id")
    .optional(),

  check("image")
    .optional(),

  check("status")
    .notEmpty()
    .withMessage("Status is required")
    .isNumeric()
    .withMessage("Status must be a number")
    .isIn([0, 1])
    .withMessage("Status must be either 0 (Inactive) or 1 (Active)"),
];

export const userUpdateValidation = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 150 })
    .withMessage("Name must be between 3 and 150 characters"),

  check("mobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile must be exactly 10 characters")
    .isNumeric()
    .withMessage("Mobile must contain only numeric characters"),

  check("role_id")
    .trim()
    .notEmpty() 
    .withMessage("Role is required")
    .withMessage("Role must be exactly 10 characters"),

  check("reporting_head_id")
    .optional(),

  check("reporting_user_id")
    .optional(),

  check("image")
    .optional(),

  check("status")
    .notEmpty()
    .withMessage("Status is required")
    .isNumeric()
    .withMessage("Status must be a number") 
    .isIn([0, 1])
    .withMessage("Status must be either 0 (Inactive) or 1 (Active)"),   
];
