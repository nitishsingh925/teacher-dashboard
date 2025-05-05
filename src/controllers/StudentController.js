
import { Student } from "../models/student.models.js";
import { ReportType } from "../models/reportType.models.js";
import { ReportName } from "../models/reportName.models.js";
import { StudentReport } from "../models/studentReport.models.js";
import moment from 'moment';

// Student List
export const Index = async (req, res) => {
    try {
      const user = req.user.payload;  
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      const { grade, section } = req.query;
  
      const filter = { school_id: user.school_id }; 
    if (grade) filter.grade = grade;
    if (section) filter.section = section;
  
      const total = await Student.countDocuments(filter);
  
      const students = await Student.find(
        filter,
        'roll_number first_name last_name grade section house profile_image'
      )
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
  
      if (!students || students.length === 0) {
        return res.status(404).json({ message: "No record found." });
      }
  
      const baseUrl = `${req.protocol}://${req.get('host')}`;
  
      const studentsWithImage = students.map(student => {
      const hasImage = student.profile_image && student.profile_image.trim() !== '';
  
        return {
          ...student,
          profile_image: hasImage
            ? `${baseUrl}/students/${student.profile_image}`
            : null
        };
      });
  
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
               profile_image: (req.file && req.file.filename) ? req.file.filename : null,
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
    try {
      const id = req.params.id;
  
      const user = req.user.payload;
      const student = await Student.findOne({ _id: id, school_id: user.school_id })
      .select('-password')
      .lean();
  
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const hasImage = student.profile_image && student.profile_image.trim() !== '';
  
      student.profile_image = hasImage
        ? `${baseUrl}/students/${student.profile_image}`
        : null;
  
      return res.status(200).json({
        message: "Student record is successfully fetched",
        data: student
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

// Student Update
export const studentUpdate = async (req, res) => {
    try {
      const {
        roll_number, first_name, last_name, gender, dob, email, phone_number,
        father_name, father_mobile_number, mother_name, mother_mobile_number,
        nationality, section, grade, academic_year, house, is_captain,
        blood_group, weight, height, diet, special_needs, vision,
        address, status
      } = req.body;
  
      const user = req.user.payload;
      const id = req.params.id;
  
      const student = await Student.findOne({ _id: id, school_id: user.school_id });
      if (!student) {
        return res.status(404).json({ message: "Student has not been found" });
      }
  
      let formattedDOB = student.dob; 
      if (dob) {
        const parsedDOB = moment(dob, [
          'YYYY-MM-DD',
          'DD-MM-YYYY',
          'MM/DD/YYYY',
          'DD/MM/YYYY'
        ], true);
  
        if (!parsedDOB.isValid()) {
          return res.status(400).json({ message: "Invalid date format for DOB" });
        }
  
        formattedDOB = parsedDOB.toDate();
      }
  
      student.school_id            = user.school_id;
      student.teacher_id           = user.id;
      student.roll_number          = roll_number;
      student.first_name           = first_name;
      student.last_name            = last_name;
      student.gender               = gender;
      student.dob                  = formattedDOB;
      student.email                = email;
      student.phone_number         = phone_number;
      student.father_name          = father_name;
      student.father_mobile_number = father_mobile_number;
      student.mother_name          = mother_name;
      student.mother_mobile_number = mother_mobile_number;
      student.nationality          = nationality;
      student.section              = section;
      student.grade                = grade;
      student.academic_year        = academic_year;
      student.registration_date    = new Date();
      student.house                = house;
      student.is_captain           = is_captain;
      student.blood_group          = blood_group;
      student.weight               = weight;
      student.height               = height;
      student.diet                 = diet;
      student.special_needs        = special_needs;
      student.vision               = vision;
      student.address              = address;
      student.profile_image        = (req.file && req.file.filename) ? req.file.filename : student.profile_image;
      student.status               = (status == true || status === 'true') ? true : false;
      student.created_by           = user.id;
      student.updated_by           = user.id;
  
      await student.save();
  
      return res.status(200).json({ message: "Student record is successfully updated", data: student });
  
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

// Student Delete
export const studentDelete = async (req, res) => {
    try{
        const id = req.params.id;
        const user = req.user.payload;
        const student = await Student.findOneAndDelete({
            _id: id,
            school_id: user.school_id
          });
        if(!student){
            return res.status(404).json({message: "Student not found"});
        }
        return res.status(200).json({message:"Student record is successfully deleted!"});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}

// Report Type
export const reportTypes = async (req, res) => {
  try{
      const reportTypes = await ReportType.find();
      if(!reportTypes){
          return res.status(404).json({message: "Report Type not found"});
      }
      return res.status(200).json({message:"Report Type record is successfully fetched", data:reportTypes});
  }
  catch(err){
      return res.status(500).json({message: err.message});
  }
}

// Report Names
export const reportNames = async (req, res) => {
  try{
      const reportNames = await ReportName.find();
      if(!reportNames){
          return res.status(404).json({message: "Report Name not found"});
      }
      return res.status(200).json({message:"Report Name record is successfully fetched", data:reportNames});
  }
  catch(err){
      return res.status(500).json({message: err.message});
  }
}

// Academic Report List
export const AcademicReport = async (req, res) => {
  try {
    const user = req.user.payload;  
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { grade, section } = req.query;

    const filter = { school_id: user.school_id }; 
  if (grade) filter.grade = grade;
  if (section) filter.section = section;

    const total = await Student.countDocuments(filter);

    const students = await Student.find(
      filter,
      'roll_number first_name last_name grade section house profile_image'
    )
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No record found." });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const studentsWithImage = students.map(student => {
    const hasImage = student.profile_image && student.profile_image.trim() !== '';

      return {
        ...student,
        profile_image: hasImage
          ? `${baseUrl}/students/${student.profile_image}`
          : null
      };
    });

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
}

// Academic Report Create
export const AcademicReportCreate = async (req, res) => {
  try{
      const id = req.params.id;
      const user = req.user.payload;
      const student = await Student.findOne({ _id: id, school_id: user.school_id })
      .select('first_name last_name roll_number') 
      .lean();
  
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      const { report_type, report_name } = req.query;

      const reportname = await ReportName.findOne({ _id: report_name, report_type_id: report_type });
      if(!reportname)
      {
          return res.status(404).json({message: "Report Name not found"});
      }

      return res.status(200).json({message:"Report Name record is successfully fetched", data:reportname, student:student});
  }
  catch(err){
      return res.status(500).json({message: err.message});
  }
}

export const AcademicReportStore = async (req, res) => {
  try {
    const { report_type_id, report_name_id, date, marks } = req.body;
    const id = req.params.id; 
    const user = req.user.payload; 

    // Find student in the same school
    const student = await Student.findOne({ _id: id, school_id: user.school_id })
      .select('first_name last_name roll_number')
      .lean();

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Validate report name
    const reportname = await ReportName.findOne({ _id: report_name_id, report_type_id: report_type_id });
    if (!reportname) {
      return res.status(404).json({ message: "Report Name not found" });
    }

    // Create and save report
    const report = new StudentReport({
      school_id: user.school_id,
      student_id: id,
      report_type_id,
      report_name_id,
      date,
      marks,
      create_by: user.id,
      updated_by: user.id
    });

    await report.save();

    return res.status(200).json({
      message: "Student Report is successfully Stored",
      data: report
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};