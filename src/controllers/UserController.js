import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";


export const userIndex = async (req, res) =>{
     try{
            const users = await User.find();
            return res.status(200).json({message:"User records are successfully get", data:users});
     }
     catch(err)
     {
         return res.status(500).json({message: err.message});
     }
}

export const userStore = async (req, res) =>{
    try{
          const {name, email, password, mobile, role_id, reporting_head_id, reporting_user_id, status} = req.body;
          
          // Validate ObjectId
         if (!mongoose.Types.ObjectId.isValid(role_id)) {
               return res.status(400).json({ message: "Invalid role_id" });
          }
          if (!mongoose.Types.ObjectId.isValid(reporting_head_id)) {
               return res.status(400).json({ message: "Invalid reporting_head_id" });
          }
          if (!mongoose.Types.ObjectId.isValid(reporting_user_id)) {
               return res.status(400).json({ message: "Invalid reporting_user_id" });
          }
          const hashpassword = await bcrypt.hash(req.body.password, 10);
         const user = await User.create({
                                         name:name, 
                                         email:email, 
                                         password:hashpassword, 
                                         mobile:mobile, 
                                         image:req.file.filename,
                                         role_id:role_id, 
                                         reporting_head_id:reporting_head_id, 
                                         reporting_user_id:reporting_user_id, 
                                         status:status,
                                         create_by:req.user.id,
                                         updated_by:req.user.id
                                        });
         return res.status(200).json({message:"User is successfully created", data:user});     

    } catch(err){
        return res.status(500).json({message: err.message});
    }
    
}

export const userView = async (req, res) => {
       const id = req.params.id;
       try{
             const user = await User.findById(id);
             if(!user){
                  return res.status(404).json({message: "User not found"});
             }
             return res.status(200).json({message:"User record is successfully get", data:user});
       }
       catch(err){
          return res.status(500).json({message: err.message});
       }
}

export const userUpdate = async (req, res) => {
    const {name, mobile, status, role_id, reporting_head_id, reporting_user_id} = req.body;
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

          if (!mongoose.Types.ObjectId.isValid(role_id)) {
          return res.status(400).json({ message: "Invalid role_id" });
          }
          if (!mongoose.Types.ObjectId.isValid(reporting_head_id)) {
               return res.status(400).json({ message: "Invalid reporting_head_id" });
          }
          if (!mongoose.Types.ObjectId.isValid(reporting_user_id)) {
               return res.status(400).json({ message: "Invalid reporting_user_id" });
          }
        user.name = name;
        user.mobile = mobile;
        user.status = status;
        if (req.file && req.file.filename) {
            user.image = req.file.filename; 
       }
        user.role_id = role_id;
        user.reporting_head_id = reporting_head_id;
        user.reporting_user_id = reporting_user_id;
        user.updated_by = req.user.id;
        await User.findByIdAndUpdate(id, user);
        return res.status(200).json({message:"User record is successfully updated", data:user});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}

export const userDelete = async (req, res) => {
    try{
          const id = req.params.id;
          const userDel = await User.findByIdAndDelete(id);
          if(!userDel)
          {
            return res.status(400).json({message:"User is not found"});
          }

          return res.status(200).json({message:"User is successfully deleted!"});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}

export const userStatus = async (req, res) => {
   try{
        const id = req.params.id;
        const user = await User.findById(id);
        // if(user.status == true)
        // {
        //     user.status = false
        // }
        // else{
        //     user.status = true;
        // }
        //     user.updated_by = req.user.id;
        // await User.findByIdAndUpdate(id, user);

        const updated = await User.findByIdAndUpdate(
            id,
            { status: !user.status }, 
        );
        const data = await User.findById(id);
        return res.status(200).json({message:"Status is successfully change", data:data});
   }
   catch(err)
   {
      console.log(err);
      return res.status(500).json({message:"Something wents wrong"});
   }
} 