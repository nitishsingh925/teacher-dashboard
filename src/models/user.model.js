import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    mobile: Number,
    image: String,
    role_id: {type: mongoose.Schema.Types.ObjectId, ref: "Role"},
    reporting_head_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    reporting_user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    status: {type:Boolean, default: true},
    create_by:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
    updated_by:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);