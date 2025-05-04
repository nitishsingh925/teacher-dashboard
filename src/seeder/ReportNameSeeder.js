import mongoose from 'mongoose'; 
import connectDB from '../connectDB/db.js';
import { ReportName } from '../models/reportName.models.js';

// Seeder function
const seedReportName = async () => {
  await connectDB(); 

  try {
    await ReportName.deleteMany();
    console.log('Existing report type deleted');

    // Seed ReportName
    const reports = [
      { 
        report_type_id: '6817a083df9b9693b6576c4b', 
        name: 'Unit-1',
        subject: {
          Mathematics: 100,
          Science: 100,
          "Social Science": 100,
          English: 100,
          Hindi: 100 
        }
      },    
      { 
        report_type_id: '6817a083df9b9693b6576c4b', 
        name: 'Unit-2',
        subject: {
          Mathematics: 100,
          Science: 100,
          "Social Science": 100,
          English: 100,
          Hindi: 100 
        }
      }, 
      { 
        report_type_id: '6817a083df9b9693b6576c4b', 
        name: 'Unit-3',
        subject: {
          Mathematics: 100,
          Science: 100,
          "Social Science": 100,
          English: 100,
          Hindi: 100 
        }
      }, 
      { 
        report_type_id: '6817a083df9b9693b6576c4b', 
        name: 'Unit-4',
        subject: {
          Mathematics: 100,
          Science: 100,
          "Social Science": 100,
          English: 100,
          Hindi: 100 
        }
      }, 

      { 
        report_type_id: '6817a083df9b9693b6576c4c', 
        name: 'Term-1',
        subject: {
          Mathematics: 100,
          Science: 100,
          "Social Science": 100,
          English: 100,
          Hindi: 100 
        }
      },
      { 
        report_type_id: '6817a083df9b9693b6576c4c', 
        name: 'Term-2',
        subject: {
          Mathematics: 100,
          Science: 100,
          "Social Science": 100,
          English: 100,
          Hindi: 100 
        }
      }
    ];

    await ReportName.insertMany(reports);
    console.log('Report type seeded successfully');
  } catch (error) {
    console.error('Error seeding Report type:', error.message);
  } finally {
    mongoose.connection.close(); 
    process.exit();
  }
};

seedReportName(); 
export default seedReportName;
