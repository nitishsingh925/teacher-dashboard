import mongoose from 'mongoose'; 
import connectDB from '../connectDB/db.js';
import { Role } from '../models/role.model.js';

// Seeder function
const seedRoles = async () => {
  await connectDB(); 

  try {
    await Role.deleteMany();
    console.log('Existing roles deleted');

    // Seed roles
    const roles = [
      { name: 'Super Admin' },
      { name: 'School Admin' },
      { name: 'Teacher' },
      { name: 'Parent' },
      { name: 'Student' },
    ];

    await Role.insertMany(roles);
    console.log('Roles seeded successfully');
  } catch (error) {
    console.error('Error seeding roles:', error.message);
  } finally {
    mongoose.connection.close(); 
    process.exit();
  }
};

seedRoles(); 
export default seedRoles;
