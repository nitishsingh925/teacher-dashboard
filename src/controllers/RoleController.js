import { Role } from "../models/role.model.js";
import { RolePermission } from "../models/rolePermission.models.js"
import { RoleMenu } from "../models/roleMenu.models.js"

export const roleIndex = async (req, res)=>{
    try{
        const roles = await Role.find();
        return res.status(200).json({message:"Role has been successfully get.", data:roles});
    }
    catch(err)
    {
     return res.status(500).json({message:"Something wents wrong"});
    }
}

export const roleStore = async (req, res) =>{
    try{
        // console.log(req.body);return false;
         const {name, status, menu_id, permission_id} = req.body;
         const data = {
             name:name,
             status:status,
             create_by:req.user.id,
             updated_by:req.user.id,
         };
         const role = await Role.create(data);
        
        // Insert role-menu relationships
        if (Array.isArray(menu_id)) {
            for (const menuid of menu_id) {
                await RoleMenu.create({
                    role_id: role.id,
                    menu_id: menuid,
                });
            }
        }

        // Insert role-permission relationships
        if (Array.isArray(permission_id)) {
            for (const permissionid of permission_id) {
                await RolePermission.create({
                    role_id: role.id,
                    permission_id: permissionid,
                });
            }
        }

         return res.status(200).json({message:"Role has been successuly saved"});
    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}

export const roleView = async (req, res) => {
    try{
         const id = req.params.id;
         const role = await Role.findById(id);
         if(!role)
         {
            return res.status(500).json({message:"Role is not found"});
         }
         return res.status(200).json({message:"Role has been successfully get", data:role});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

export const roleUpdate = async (req, res) => {
    try{
        const id = req.params.id;
        const {name, status, menu_id=[], permission_id=[]} = req.body;
        console.log(req.body);
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }
        role.name = name;
        role.status = status;
        role.updated_by = req.user.id;
        await role.save();

        await RoleMenu.deleteMany();
        await RolePermission.deleteMany();

        // Insert role-menu relationships
        if (Array.isArray(menu_id)) {
            for (const menuid of menu_id) {
                await RoleMenu.create({
                    role_id: role.id,
                    menu_id: menuid,
                });
            }
        }

        // Insert role-permission relationships
        if (Array.isArray(permission_id)) {
            for (const permissionid of permission_id) {
                await RolePermission.create({
                    role_id: role.id,
                    permission_id: permissionid,
                });
            }
        }

        return res.status(200).json({message:"Role has been successfully updated", data:role});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

export const roleDelete = async (req, res) =>{
    try{
         const id = req.params.id;
         const role = await Role.findByIdAndDelete(id);
         if(!role)
         {
            return res.status(500).json({message:"Role has not been found"});
         }
         return res.status(200).json({message:"Role has been successfully deleted!"});
    }
    catch(err)
    {
         return res.status(500).json({message:err.message});
    }
}

export const roleStatusChange = async (req, res) =>{
    try{
          const id = req.params.id;
          const role = await Role.findById(id);
          
          if(!role)
          {
            return res.status(500).json({message:"Role has not been found"});
          }

          if(role.status == true)
          {
             role.status = false;
          }
          else
          {
            role.status = true;
          }
            role.updated_by = req.user.id;
           await Role.findByIdAndUpdate(id, role);
           const data = await Role.findById(id);
           return res.status(200).json({message:"Role has been successfully updated", data:data});
        }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}