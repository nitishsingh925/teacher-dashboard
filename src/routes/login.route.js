import { Router } from "express";
import { login, logout, checkAuth } from "../controllers/AuthController.js";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware.js";
import { loginValidation } from "../validation/loginValidation.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";

const Route = Router();

Route.post("/teacher-login", ValidationMiddleware(loginValidation), login);

Route.post("/teacher-logout", logout);
Route.get("/auth/check", AuthMiddleware, checkAuth);

export default Route;
