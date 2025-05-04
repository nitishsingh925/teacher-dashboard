import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  school_id: { type: mongoose.Schema.Types.ObjectId, ref: 'School', default: null},
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', default: null},
  roll_number: { type: String, required: true, trim: true },
  first_name: { type: String, trim: true, default: null },
  last_name: { type: String, trim: true, default: null },
  gender: { type: String, enum: ['male', 'female', 'other'], trim: true, default: null },
  dob: { type: Date, default: null },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, default: null },
  password: { type: String, default: null },
  phone_number: { type: String, default: null },
  
  father_name: { type: String, trim: true, default: null },
  father_mobile_number: { type: String, trim: true, default: null },
  mother_name: { type: String, trim: true, default: null },
  mother_mobile_number: { type: String, trim: true, default: null },

  nationality: { type: String, trim: true, default: null },
  section: { type: String, trim: true, default: null },
  grade: { type: String, trim: true, default: null },
  academic_year: { type: String, trim: true, default: null },
  house: { type: String, trim: true, default: null },
  is_captain: { type: Boolean, default: true, default: null },
  blood_group: { type: String, trim: true, default: null },
  weight: { type: String, default: 0, default: null },
  height: { type: String, default: 0, default: null },
  diet: { type: String, trim: true, default: null },
  special_needs: { type: String, trim: true, default: null },
  vision: { type: String, trim: true, default: null },
  
  profile_image: { type: String, default: '', trim: true, default: null },
  registration_date: { type: Date, default: null },
  address: { type: String, trim: true, default: null },
  
  status: { type: Boolean, default: true, default: null }, // true = Active, false = Inactive
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', default: null },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', default: null },
  deleted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', default: null },

  deleted_at: { type: Date, default: null },
}, {
  timestamps: true 
});

export const Student = mongoose.model("Student", studentSchema);
