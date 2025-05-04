import mongoose from 'mongoose'; 
import bcrypt from 'bcryptjs'; 
import connectDB from '../connectDB/db.js'; 
import { Teacher } from '../models/teacher.models.js';
import { Role } from '../models/role.model.js';
import { School } from '../models/school.models.js';

// Seeder function
const seedTeachers = async () => {
    await connectDB(); 
  
    try {
      await Teacher.deleteMany();
      console.log('Existing teacher deleted');
  
      // Hash the password
      const hashedPassword = await bcrypt.hash('12345678', 10); 
  
      // Fetch or role_id from the Role table
      const role = await Role.findOne({ name: 'Teacher' });
      if (!role) {
        throw new Error('Role "Teacher" not found!');
      }

      // Fetch or school from the school Table
      const school = await School.findOne({ email: 'school@example.com' });
      if (!school) {
        throw new Error('School not found!');
      }

      // Seed teachers with ObjectId references
      const teachers = [
        {
          school_id: school._id, 
          role_id: role._id, 
          teacher_code : 'SMST001',
          name: 'Teacher',
          email: 'teacher@example.com',
          password: hashedPassword,
          phone: '1234567890',
          gender: 'male',
          joining_date: new Date(),
          profile_image: '',
          qualification: '',
          experience: 0,
          specialization: '',
          address: '',
          status: true,
          create_by: school._id, 
          updated_by: null, 
          deleted_by: null,
        },
      ];
  
      await Teacher.insertMany(teachers);
      console.log('Teacher seeded successfully');
    } catch (error) {
      console.error('Error seeding teacher:', error.message);
    } finally {
      mongoose.connection.close(); 
      process.exit();
    }
  };
  
  seedTeachers(); 
  export default seedTeachers;