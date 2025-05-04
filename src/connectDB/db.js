import mongoose from "mongoose";
import { DB_URI } from "../utils/constant.js";

const connectDB = async () =>{
    try{
         const conn = await mongoose.connect(DB_URI);
         console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch(err)
    {
        console.log(err)
        process.exit(1)
    }
}

export default connectDB;