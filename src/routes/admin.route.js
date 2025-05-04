import {Router} from "express";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs";
import { userDelete, userIndex, userStatus, userStore, userUpdate, userView } from "../controllers/UserController.js";
import { userUpdateValidation, userValidation } from "../validation/userValidation.js";

// Multer setup for file uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // let folderName = req.body.folder || "default"; 
        let folderName = req.query.fd || "default";
        // Remove trailing slash if present
        folderName = folderName.replace(/\/$/, "");

        const uploadPath = path.join(__dirname, "..", "..", "uploads", folderName);

        console.log("Uploading to:", uploadPath); // Debugging ke liye


        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage: storage });


const Route = Router();

/* Start Authmiddleware scope */
Route.use(AuthMiddleware);

// Users
Route.get("/users", userIndex);               
Route.get("/users/:id", userView);            
Route.post("/users/store", upload.single('image'), ValidationMiddleware(userValidation), userStore);        
Route.put("/users/update/:id", upload.single('image'), ValidationMiddleware(userUpdateValidation), userUpdate);   
Route.delete("/users/delete/:id", userDelete);
Route.put("/users/status/:id", userStatus);


export default Route;