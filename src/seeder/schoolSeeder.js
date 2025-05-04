import mongoose from 'mongoose'; 
import bcrypt from 'bcryptjs'; 
import connectDB from '../connectDB/db.js'; 
import { School } from '../models/school.models.js';
import { Role } from '../models/role.model.js';
import { User } from '../models/user.model.js';

// Seeder function
const seedSchool = async () => {
  await connectDB(); 

  try {
    await School.deleteMany();
    console.log('Existing school deleted');

    // Hash the password
    const hashedPassword = await bcrypt.hash('12345678', 10); 

    // Fetch role_id from the Role Table
    const role = await Role.findOne({ name: 'Super Admin' });
    if (!role) {
      throw new Error('Role "Super Admin" not found!');
    }

    // Fetch user from the User Table
    const user = await User.findOne({ email: 'admin@example.com' });
    if (!user) {
      throw new Error('User "Super Admin" not found!');
    }

    const school = new School({
      role_id: role._id, 
      user_id: user._id, 
      name: 'Sunrise Public School',
      email: 'school@example.com',
      password: hashedPassword, 
      phone: '9876543210',
      address: '123, Main Street, Sector 12',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      zip_code: '302001',
      principal_name: 'Mr. Sharma',
      logo: 'uploads/schools/sunrise_logo.png',
      registration_number: 'REG-2025-001',
      board: 'CBSE',
      established_year: 2005,
      prefix: 'SPS',
      subscription_plan: 'Premium',
      expiry_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      lat: 26.9124,
      lng: 75.7873,
      status: true,
      database_name: 'sunrise_school_db',
      created_by: user._id, 
      updated_by: null, 
      deleted_by: null,
    });
    await school.save(); 

    console.log('School seeded successfully:');
  } catch (error) {
    console.error('Error seeding school:', error.message);
  } finally {
    mongoose.connection.close(); 
    process.exit();
  }
};

seedSchool(); 
export default seedSchool;
