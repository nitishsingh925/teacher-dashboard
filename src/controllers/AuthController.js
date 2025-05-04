
import bcrypt from "bcryptjs";
import {Teacher} from "../models/teacher.models.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
            const teacher = await Teacher.findOne({email:email});
            if(!teacher){
                return res.status(404).json({message: "Teacher has not been found"});
            }
            const isMatch = await bcrypt.compare(password, teacher.password);
            if(!isMatch)
            {
                return res.status(404).json({message: "Invalid credentials"});
            }
            const payload = {id:teacher._id, school_id:teacher.school_id, name:teacher.name, email:teacher.email, mobile:teacher.mobile};
            const token = jwt.sign({payload,}, process.env.JWT_SECRET, {expiresIn: "12000h"});

            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
                sameSite: "none",
                secure: true,
            });

            return res.status(200).json({message:"Teacher is successfully logged in.", data:payload, token: token,});
    }
    catch(err){
        return res.status(500).json({
            message: err.message,
        });
    }
}