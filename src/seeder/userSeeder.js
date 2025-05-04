import mongoose from 'mongoose'; 
import bcrypt from 'bcryptjs'; 
import connectDB from '../connectDB/db.js'; 
import { User } from '../models/user.model.js';
import { Role } from '../models/role.model.js';

// Seeder function
const seedUsers = async () => {
    await connectDB(); 
  
    try {
      await User.deleteMany();
      console.log('Existing users deleted');
  
      // Hash the password
      const hashedPassword = await bcrypt.hash('12345678', 10); 
  
      // Fetch or create role_id from the Role collection
      const role = await Role.findOne({ name: 'Super Admin' });
      if (!role) {
        throw new Error('Role "Super Admin" not found!');
      }
  
      // Seed users with ObjectId references
      const users = [
        {
          name: 'Super Admin',
          email: 'admin@example.com',
          password: hashedPassword,
          mobile: '1234567890',
          role_id: role._id, 
          status: true,
          create_by: null, 
          updated_by: null,
        },
      ];
  
      await User.insertMany(users);
      console.log('User seeded successfully');
    } catch (error) {
      console.error('Error seeding users:', error.message);
    } finally {
      mongoose.connection.close(); // Close DB connection
      process.exit();
    }
  };
  
  seedUsers(); // Run seeder
export default seedUsers;