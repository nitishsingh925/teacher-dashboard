import connectDB from '../connectDB/db.js';
import mongoose from 'mongoose';

import roleSeeder from './roleSeeder.js';
import userSeeder from './userSeeder.js';
import schoolSeeder from './schoolSeeder.js';
import teacherSeeder from './teacherSeeder.js'; // Optional

const runAllSeeders = async () => {
  await connectDB();

  try {
    console.log('🚀 Starting seeding process...\n');

    await roleSeeder();       // Run Role Seeder
    await userSeeder();       // Run User Seeder
    await schoolSeeder();     // Run School Seeder
    await teacherSeeder();    // Run Teacher Seeder

    console.log('\n✅ All seeders executed successfully!');
  } catch (err) {
    console.error('❌ Seeding Error:', err.message);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
};

runAllSeeders();
