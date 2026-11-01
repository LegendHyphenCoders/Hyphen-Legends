import { Admission } from '../models/Admission.js';
import { ContactMessage } from '../models/ContactMessage.js';
import {
  generateExcelBuffer,
  writeAllLeadsToFile,
  REPO_EXCEL_PATH,
  ensureExcelFileExists,
} from '../utils/excelService.js';
import fs from 'fs';

/**
 * @route   GET /api/leads/export-excel
 * @desc    Live export of all admissions + contact inquiries in a single Excel file
 * @access  Public / Admin
 */
export async function exportAllLeadsExcel(req, res, next) {
  try {
    const [admissions, contacts] = await Promise.all([
      Admission.find().sort({ createdAt: -1 }),
      ContactMessage.find().sort({ createdAt: -1 }),
    ]);

    // Generate Excel binary buffer
    const buffer = await generateExcelBuffer(admissions, contacts);

    // Also update the local file on disk so disk matches
    writeAllLeadsToFile(admissions, contacts).catch((err) =>
      console.error('Failed to sync disk file on export:', err.message)
    );

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="HL_Stack_Leads.xlsx"');
    return res.send(Buffer.from(buffer));
  } catch (error) {
    next(error);
  }
}

/**
 * @route   GET /api/leads/download
 * @desc    Download the physical leads.xlsx file directly from the repository root
 * @access  Public / Admin
 */
export async function downloadPhysicalExcel(req, res, next) {
  try {
    await ensureExcelFileExists();

    if (!fs.existsSync(REPO_EXCEL_PATH)) {
      return res.status(404).json({ error: 'Excel file not found yet.' });
    }

    return res.download(REPO_EXCEL_PATH, 'leads.xlsx');
  } catch (error) {
    next(error);
  }
}

/**
 * @route   POST /api/leads/sync
 * @desc    Trigger full synchronization of database records to local leads.xlsx file
 * @access  Public / Admin
 */
export async function syncLeadsDisk(req, res, next) {
  try {
    const [admissions, contacts] = await Promise.all([
      Admission.find().sort({ createdAt: -1 }),
      ContactMessage.find().sort({ createdAt: -1 }),
    ]);

    await writeAllLeadsToFile(admissions, contacts);

    return res.status(200).json({
      success: true,
      message: 'leads.xlsx successfully updated with all records from database.',
      counts: {
        admissions: admissions.length,
        contacts: contacts.length,
        total: admissions.length + contacts.length,
      },
      filePath: REPO_EXCEL_PATH,
    });
  } catch (error) {
    next(error);
  }
}
