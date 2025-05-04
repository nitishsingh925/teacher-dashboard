
import { Student } from "../models/student.models.js";
import moment from 'moment';

// Student List
export const Index = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;  
      const limit = parseInt(req.query.limit) || 10; 
      const skip = (page - 1) * limit;
  
      const { grade, section } = req.query;
  
      
      const filter = {};
      if (grade) filter.grade = grade;
      if (section) filter.section = section;
  
      const total = await Student.countDocuments(filter);
  
      const students = await Student.find(filter, 'first_name last_name grade section house profile_image')
        .skip(skip)
        .limit(limit)
        .lean();
  
      if (!students || students.length === 0) {
        return res.status(404).json({ message: "No record found." });
      }
  
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const studentsWithImage = students.map(student => ({
        ...student,
        profile_image: student.profile_image
          ? `${baseUrl}/students/${student.profile_image}`
          : null
      }));
  
      return res.status(200).json({
        message: "Student records successfully fetched.",
        page,
        limit,
        total,
        data: studentsWithImage
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
  
// Student Store
export const studentStore = async (req, res) => {
    try{
        const { roll_number, first_name, last_name, gender, dob, email, phone_number, father_name, father_mobile_number, mother_name, mother_mobile_number, nationality, section, grade, academic_year, house, is_captain, blood_group, weight, height, diet, special_needs, vision, address } = req.body;
        const user = req.user.payload;

        const formattedDOB = moment(dob, [
            'YYYY-MM-DD',
            'DD-MM-YYYY',
            'MM/DD/YYYY',
            'DD/MM/YYYY'
        ], true).format('YYYY-MM-DD');

        const student = await Student.create({
               school_id: user.school_id,
               teacher_id: user.id,
               roll_number : roll_number, 
               first_name : first_name, 
               last_name : last_name, 
               gender : gender, 
               gender : gender, 
               dob : formattedDOB, 
               email : email, 
               phone_number : phone_number, 
               father_name : father_name, 
               father_mobile_number : father_mobile_number, 
               mother_name : mother_name, 
               mother_mobile_number : mother_mobile_number, 
               nationality : nationality, 
               section : section, 
               grade : grade, 
               academic_year : academic_year,
               registration_date: new Date(),
               house : house, 
               is_captain : is_captain, 
               blood_group : blood_group, 
               weight : weight, 
               height : height, 
               diet : diet, 
               special_needs : special_needs, 
               vision : vision, 
               address : address, 
               profile_image: (req.file && req.file.profile_image) ? req.file.profile_image : null,
               status : true,
               created_by : user.id,
               updated_by : user.id
        });
        if(!student)
        {
            return res.status(404).json({message: "Data failed!"});
        }
        return res.status(200).json({message:"Student record is successfully created", data:student});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}  

// Student View
export const View = async (req, res) => {
    try{
        const id = req.params.id;
        const student = await Student.findById(id);
        if(!student){
            return res.status(404).json({message: "Student not found"});
        }

        return res.status(200).json({message:"Student record is successfully get", data:student});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}

// Student Update
export const studentUpdate = async (req, res) => {
    try{
        const id = req.params.id;
        const student = await Student.findByIdAndUpdate(id, req.body, {new: true});
        if(!student){
            return res.status(404).json({message: "Student not found"});
        }
        return res.status(200).json({message:"Student record is successfully updated", data:student});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}

// Student Delete
export const studentDelete = async (req, res) => {
    try{
        const id = req.params.id;
        const student = await Student.findByIdAndDelete(id);
        if(!student){
            return res.status(404).json({message: "Student not found"});
        }
        return res.status(200).json({message:"Student record is successfully deleted!"});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}