import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import ExcelJS from 'exceljs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Deterministic path pointing to leads.xlsx at the repository root
export const REPO_EXCEL_PATH = path.resolve(__dirname, '../../leads.xlsx');

// Safe sequential queue to avoid concurrent file write collisions
let writeQueue = Promise.resolve();

function enqueueExcelOperation(operation) {
  writeQueue = writeQueue.then(operation).catch((err) => {
    console.error('❌ Excel write error:', err.message);
  });
  return writeQueue;
}

const CELL_BORDER = {
  top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
  left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
  bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
  right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
};

/**
 * Configure columns, headers and styles for Admissions worksheet
 */
function setupAdmissionsSheet(sheet) {
  sheet.columns = [
    { header: 'Date & Time', width: 22 },
    { header: 'Full Name', width: 26 },
    { header: 'Email Address', width: 32 },
    { header: 'Phone Number', width: 18 },
    { header: 'Enquired Course', width: 24 },
    { header: 'Current Status', width: 22 },
    { header: 'Preferred Timing', width: 20 },
    { header: 'Message / Inquiry', width: 45 },
    { header: 'Lead Status', width: 16 },
    { header: 'Submission ID', width: 28 },
  ];

  // Freeze top row
  sheet.views = [{ state: 'frozen', ySplit: 1 }];

  // Format header row
  const headerRow = sheet.getRow(1);
  headerRow.height = 28;
  headerRow.eachCell((cell) => {
    cell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1E293B' }, // Slate-800
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = CELL_BORDER;
  });
}

/**
 * Configure columns, headers and styles for Contact Inquiries worksheet
 */
function setupContactSheet(sheet) {
  sheet.columns = [
    { header: 'Date & Time', width: 22 },
    { header: 'Full Name', width: 26 },
    { header: 'Email Address', width: 32 },
    { header: 'Phone Number', width: 18 },
    { header: 'Message Content', width: 50 },
    { header: 'Read Status', width: 16 },
    { header: 'Submission ID', width: 28 },
  ];

  // Freeze top row
  sheet.views = [{ state: 'frozen', ySplit: 1 }];

  // Format header row
  const headerRow = sheet.getRow(1);
  headerRow.height = 28;
  headerRow.eachCell((cell) => {
    cell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF312E81' }, // Deep Indigo
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = CELL_BORDER;
  });
}

/**
 * Format a regular data row with borders and clean fonts
 */
function formatDataRow(row) {
  row.height = 22;
  row.eachCell({ includeEmpty: true }, (cell) => {
    cell.font = { name: 'Segoe UI', size: 10, color: { argb: 'FF1E293B' } };
    cell.alignment = { vertical: 'middle', wrapText: false };
    cell.border = CELL_BORDER;
  });
}

function formatDate(dateVal) {
  if (!dateVal) return new Date().toLocaleString('en-US');
  const d = new Date(dateVal);
  return isNaN(d.getTime()) ? String(dateVal) : d.toLocaleString('en-US');
}

/**
 * Build a complete workbook from raw admission and contact arrays
 */
export async function buildCompleteWorkbook(admissions = [], contacts = []) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'HL Stack Auto-Capture';
  workbook.lastModifiedBy = 'HL Stack Server';
  workbook.created = new Date();
  workbook.modified = new Date();

  // 1. Admissions Worksheet
  const admSheet = workbook.addWorksheet('Admissions', {
    properties: { tabColor: { argb: 'FF4F46E5' } },
  });
  setupAdmissionsSheet(admSheet);

  admissions.forEach((item) => {
    const row = admSheet.addRow([
      formatDate(item.createdAt),
      item.fullName || '',
      item.email || '',
      item.phone || '',
      item.courseSlug || '',
      item.currentStatus || 'student',
      item.preferredTiming || 'evening',
      item.message || '',
      item.status || 'new',
      String(item._id || ''),
    ]);
    formatDataRow(row);
  });

  // 2. Contact Inquiries Worksheet
  const contactSheet = workbook.addWorksheet('Contact Inquiries', {
    properties: { tabColor: { argb: 'FF0EA5E9' } },
  });
  setupContactSheet(contactSheet);

  contacts.forEach((item) => {
    const row = contactSheet.addRow([
      formatDate(item.createdAt),
      item.fullName || '',
      item.email || '',
      item.phone || '',
      item.message || '',
      item.isRead ? 'Read' : 'Unread',
      String(item._id || ''),
    ]);
    formatDataRow(row);
  });

  return workbook;
}

/**
 * Initializes the Excel file at repo root if it does not already exist
 */
export async function ensureExcelFileExists() {
  if (fs.existsSync(REPO_EXCEL_PATH)) {
    return;
  }

  const workbook = await buildCompleteWorkbook([], []);
  await workbook.xlsx.writeFile(REPO_EXCEL_PATH);
  console.log(`📄 Initialized new leads Excel file at: ${REPO_EXCEL_PATH}`);
}

/**
 * Appends a new admission record row to leads.xlsx
 */
export async function appendAdmissionLead(admission) {
  return enqueueExcelOperation(async () => {
    const workbook = new ExcelJS.Workbook();

    if (fs.existsSync(REPO_EXCEL_PATH)) {
      await workbook.xlsx.readFile(REPO_EXCEL_PATH);
    }

    let sheet = workbook.getWorksheet('Admissions');
    if (!sheet) {
      sheet = workbook.addWorksheet('Admissions', {
        properties: { tabColor: { argb: 'FF4F46E5' } },
      });
      setupAdmissionsSheet(sheet);
    }

    // Ensure Contact Inquiries sheet exists
    if (!workbook.getWorksheet('Contact Inquiries')) {
      const contactSheet = workbook.addWorksheet('Contact Inquiries', {
        properties: { tabColor: { argb: 'FF0EA5E9' } },
      });
      setupContactSheet(contactSheet);
    }

    const row = sheet.addRow([
      formatDate(admission.createdAt),
      admission.fullName || '',
      admission.email || '',
      admission.phone || '',
      admission.courseSlug || '',
      admission.currentStatus || 'student',
      admission.preferredTiming || 'evening',
      admission.message || '',
      admission.status || 'new',
      String(admission._id || ''),
    ]);

    formatDataRow(row);

    await workbook.xlsx.writeFile(REPO_EXCEL_PATH);
    console.log(`📊 [Excel] Appended admission lead: ${admission.fullName} -> ${REPO_EXCEL_PATH}`);
  });
}

/**
 * Appends a new contact message row to leads.xlsx
 */
export async function appendContactMessage(contact) {
  return enqueueExcelOperation(async () => {
    const workbook = new ExcelJS.Workbook();

    if (fs.existsSync(REPO_EXCEL_PATH)) {
      await workbook.xlsx.readFile(REPO_EXCEL_PATH);
    }

    // Ensure Admissions sheet exists
    if (!workbook.getWorksheet('Admissions')) {
      const admSheet = workbook.addWorksheet('Admissions', {
        properties: { tabColor: { argb: 'FF4F46E5' } },
      });
      setupAdmissionsSheet(admSheet);
    }

    let sheet = workbook.getWorksheet('Contact Inquiries');
    if (!sheet) {
      sheet = workbook.addWorksheet('Contact Inquiries', {
        properties: { tabColor: { argb: 'FF0EA5E9' } },
      });
      setupContactSheet(sheet);
    }

    const row = sheet.addRow([
      formatDate(contact.createdAt),
      contact.fullName || '',
      contact.email || '',
      contact.phone || '',
      contact.message || '',
      contact.isRead ? 'Read' : 'Unread',
      String(contact._id || ''),
    ]);

    formatDataRow(row);

    await workbook.xlsx.writeFile(REPO_EXCEL_PATH);
    console.log(`📊 [Excel] Appended contact message: ${contact.fullName} -> ${REPO_EXCEL_PATH}`);
  });
}

/**
 * Generate an Excel file buffer directly for HTTP download / live export
 */
export async function generateExcelBuffer(admissions, contacts) {
  const workbook = await buildCompleteWorkbook(admissions, contacts);
  return await workbook.xlsx.writeBuffer();
}

/**
 * Fully syncs given admissions and contact records into the physical leads.xlsx file
 */
export async function writeAllLeadsToFile(admissions, contacts) {
  return enqueueExcelOperation(async () => {
    const workbook = await buildCompleteWorkbook(admissions, contacts);
    await workbook.xlsx.writeFile(REPO_EXCEL_PATH);
    console.log(`📊 [Excel] Fully synchronized ${admissions.length} admissions and ${contacts.length} contact records into: ${REPO_EXCEL_PATH}`);
  });
}
