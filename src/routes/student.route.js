import {Router} from "express";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs";
import { Index, studentStore, studentUpdate, View, studentDelete } from "../controllers/StudentController.js";
import { studentUpdateValidation, studentValidation } from "../validation/studentValidation.js";

// Multer setup for file uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // let folderName = req.body.folder || "default"; 
        let folderName = req.query.folder_name || "default";
        // Remove trailing slash if present
        folderName = folderName.replace(/\/$/, "");

        const uploadPath = path.join(__dirname, "..", "..", "uploads", folderName);

        // console.log("Uploading to:", uploadPath); 


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

// Students
Route.get("/students", Index);               
Route.post("/students", upload.single('profile_image'), ValidationMiddleware(studentValidation), studentStore);        
Route.put("/students/:id", upload.single('profile_image'), ValidationMiddleware(studentUpdateValidation), studentUpdate);   
Route.get("/students/:id", View);            
Route.delete("/students/:id", studentDelete);


export default Route;