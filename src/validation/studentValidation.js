import { check } from "express-validator";
import { Student } from "../models/student.models.js";

export const studentValidation = [
  check("roll_number")
    .trim()
    .notEmpty()
    .withMessage("Roll number is required")
    .isLength({ min: 3 })
    .withMessage("Roll number must be at least 3 characters")
    .custom(async (value, { req }) => {
      const existingStudent = await Student.findOne({ roll_number: value });
      
      if (req.params?.id && existingStudent && existingStudent._id.toString() === req.params.id) {
        return true;
      }

      if (existingStudent) {
        throw new Error("Roll number already exists");
      }
      return true;
    }),

  check("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3, max: 150 })
    .withMessage("First name must be between 3 and 150 characters"),
 
   check("gender")
    .trim()
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be either 'male', 'female', or 'other'"),

   check("dob")
  .notEmpty()
  .withMessage("Date of birth is required"),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .isLength({ min: 4, max: 150 })
    .withMessage("Email must be between 4 and 150 characters")
    .custom(async (email) => {
        const existingUser = await Student.findOne({ email: email });
        if (existingUser) {
        throw new Error("Email already exists");
        }
        return true;
    }),

    check("phone_number")
    .trim()
    .notEmpty()
    .withMessage("Mobile is required")
    .isNumeric()
    .withMessage("Mobile must contain only numeric characters"),

  check("nationality")
    .trim()
    .notEmpty()
    .withMessage("Nationality is required"),
  
  check("section")
    .trim()
    .notEmpty()
    .withMessage("Section is required"), 

  check("grade")
    .trim()
    .notEmpty()
    .withMessage("Grade is required"),

  check("academic_year")
    .trim()
    .notEmpty()
    .withMessage("Academic year is required"), 

  check("profile_image")
    .optional(),

];

export const studentUpdateValidation = [
  check("roll_number")
    .trim()
    .notEmpty().withMessage("Roll number is required")
    .custom(async (value, { req }) => {
      const studentId = req.params.id;

      const existingStudent = await Student.findOne({ roll_number: value });

      if (existingStudent && existingStudent._id.toString() !== studentId) {
        throw new Error("Roll number already exists");
      }

      return true;
    }), 
    
    check("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3, max: 150 })
    .withMessage("First name must be between 3 and 150 characters"),
 
   check("gender")
    .trim()
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be either 'male', 'female', or 'other'"),

    check("dob")
    .notEmpty()
    .withMessage("Date of birth is required"),

    check("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Invalid email address")
      .isLength({ min: 4, max: 150 }).withMessage("Email must be between 4 and 150 characters")
      .custom(async (value, { req }) => {
        const studentId = req.params.id;

        const existingStudent = await Student.findOne({ email: value });

        if (existingStudent && existingStudent._id.toString() !== studentId) {
          throw new Error("Email already exists");
        }

        return true;
      }),

  check("phone_number")
    .trim()
    .notEmpty()
    .withMessage("Mobile is required")
    .isNumeric()
    .withMessage("Mobile must contain only numeric characters"),

  check("nationality")
    .trim()
    .notEmpty()
    .withMessage("Nationality is required"),
  
  check("grade")
    .trim()
    .notEmpty()
    .withMessage("Section is required"), 

  check("grade")
    .trim()
    .notEmpty()
    .withMessage("Grade is required"), 

  check("academic_year")
    .trim()
    .notEmpty()
    .withMessage("Academic year is required"), 

  check("profile_image")
    .optional(),

];
