import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT;
export const DB_URI = process.env.DB_URI;
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(",");
