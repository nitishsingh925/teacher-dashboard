import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  school_id: { type: mongoose.Schema.Types.ObjectId, ref: 'School', default: null},
  role_id: {type: mongoose.Schema.Types.ObjectId, ref: "Role", default: null},
  teacher_code: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true, default: null },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, default: null },
  phone: { type: String, required: true, unique: true, trim: true, default: null },
  password: { type: String, required: true, default: null },

  gender: { type: String, enum: ['male', 'female', 'other'], trim: true, default: null },
  dob: { type: Date, default: null },
  joining_date: { type: Date, default: null },

  profile_image: { type: String, default: '', trim: true, default: null },
  qualification: { type: String, trim: true, default: null },
  experience: { type: Number, default: 0, default: null },
  specialization: { type: String, trim: true, default: null },
  address: { type: String, trim: true, default: null },
  
  status: { type: Boolean, default: true, default: null }, // true = Active, false = Inactive
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  deleted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

  deleted_at: { type: Date, default: null },
}, {
  timestamps: true 
});

export const Teacher = mongoose.model("Teacher", teacherSchema);
