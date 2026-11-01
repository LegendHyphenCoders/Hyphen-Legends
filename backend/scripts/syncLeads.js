import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { Admission } from '../models/Admission.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { writeAllLeadsToFile, REPO_EXCEL_PATH } from '../utils/excelService.js';

dotenv.config();

async function syncLeads() {
  try {
    console.log('🔄 Connecting to MongoDB to synchronize leads...');
    await connectDB();

    const admissions = await Admission.find().sort({ createdAt: -1 });
    const contacts = await ContactMessage.find().sort({ createdAt: -1 });

    console.log(`📥 Retrieved ${admissions.length} admissions and ${contacts.length} contact inquiries from database.`);

    await writeAllLeadsToFile(admissions, contacts);

    console.log(`\n======================================================`);
    console.log(`✅ Leads synchronized successfully into:`);
    console.log(`   ${REPO_EXCEL_PATH}`);
    console.log(`📊 Total Admissions: ${admissions.length}`);
    console.log(`📊 Total Contact Messages: ${contacts.length}`);
    console.log(`🚀 Ready to git commit and push!`);
    console.log(`======================================================\n`);
  } catch (err) {
    console.error('❌ Failed to synchronize leads:', err.message);
    console.log('\n💡 Tip: Verify your MONGODB_URI in backend/.env and ensure your IP address is whitelisted in MongoDB Atlas Network Access.\n');
    process.exit(1);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(0);
  }
}

syncLeads();
