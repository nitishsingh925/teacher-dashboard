import { Router } from "express";
import { login } from "../controllers/AuthController.js";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware.js";
import { loginValidation } from "../validation/loginValidation.js";

const Route = Router();

Route.post("/teacher-login", ValidationMiddleware(loginValidation), login);

export default Route;