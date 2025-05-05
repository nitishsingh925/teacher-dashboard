import mongoose from "mongoose";

const studentReportSchema = new mongoose.Schema({
  school_id: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  report_type_id: { type: mongoose.Schema.Types.ObjectId, ref: "ReportType" },
  report_name_id: { type: mongoose.Schema.Types.ObjectId, ref: "ReportName" },
  date: { type: Date, default: null },
  
  marks: {
    type: Map,
    of: new mongoose.Schema({
      full: { type: Number, default: 100 },
      obtained: { type: Number, required: true }
    }, { _id: false })
  },

  status: { type: Boolean, default: true, comment: "0-Inactive, 1-Active" },
  create_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

}, { timestamps: true });

export const StudentReport = mongoose.model("StudentReport", studentReportSchema);
