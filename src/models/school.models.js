import mongoose from "mongoose";
import { default as mongooseSequence } from "mongoose-sequence"; 

const AutoIncrement = mongooseSequence(mongoose);

const schoolSchema = new mongoose.Schema({
  uni_id: { type: Number, unique: true },

  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role", default: null },

  name: { type: String, required: true, default: null },
  email: { type: String, required: true, unique: true, default: null },
  password: { type: String, required: true, default: null },

  phone: { type: String, required: true, default: null },
  address: { type: String, required: true, default: null },
  city: { type: String, required: true, default: null },
  state: { type: String, required: true, default: null },
  country: { type: String, required: true, default: null },
  zip_code: { type: String, default: null },

  principal_name: { type: String, default: null },
  logo: { type: String, default: null },
  registration_number: { type: String, default: null },
  board: { type: String, default: null },
  established_year: { type: Number, default: null },

  prefix: { type: String, default: null },

  subscription_plan: { type: String, default: 'Free' }, 
  expiry_date: { type: Date, default: null },

  lat: { type: Number, default: null },
  lng: { type: Number, default: null },

  status: { type: Boolean, default: true }, 
  database_name: { type: String, default: null },

  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  deleted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

  deleted_at: { type: Date, default: null },
}, {
  timestamps: true
});

schoolSchema.plugin(AutoIncrement, { inc_field: 'uni_id' });

export const School = mongoose.model('School', schoolSchema);
