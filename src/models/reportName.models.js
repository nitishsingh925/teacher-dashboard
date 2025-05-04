import mongoose from "mongoose";

const roleNameSchema = new mongoose.Schema({
  report_type_id: { type: mongoose.Schema.Types.ObjectId, ref: "ReportType" },
  name: { type: String, required: true, unique: true },
  subject: {
    type: Map,
    of: Number, // Each subject (key) will have a number value (marks)
    default: {}
  },
  status: { type: Boolean, default: true, comment: "0-Inactive, 1-Active" },
  create_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export const ReportName = mongoose.model("ReportName", roleNameSchema);
