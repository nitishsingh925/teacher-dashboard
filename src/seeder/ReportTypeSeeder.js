import mongoose from 'mongoose'; 
import connectDB from '../connectDB/db.js';
import { ReportType } from '../models/reportType.models.js';

// Seeder function
const seedReportType = async () => {
  await connectDB(); 

  try {
    await ReportType.deleteMany();
    console.log('Existing report type deleted');

    // Seed ReportType
    const reports = [
      { name: 'Unit' },
      { name: 'Term' },
    ];

    await ReportType.insertMany(reports);
    console.log('Report type seeded successfully');
  } catch (error) {
    console.error('Error seeding Report type:', error.message);
  } finally {
    mongoose.connection.close(); 
    process.exit();
  }
};

seedReportType(); 
export default seedReportType;
