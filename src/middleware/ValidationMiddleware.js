import { validationResult } from "express-validator";

export const ValidationMiddleware = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Map the errors to only send the first error per field
      const errorMessages = Object.values(errors.mapped()).map((error) => ({
        key: error.path,
        message: error.msg,
      }));

      return res.status(400).json({ errors: errorMessages });
    }

    next();
  };
};
