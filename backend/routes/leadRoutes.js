import { Router } from 'express';
import {
  exportAllLeadsExcel,
  downloadPhysicalExcel,
  syncLeadsDisk,
} from '../controllers/leadsController.js';

const router = Router();

// Live Excel export with latest records from MongoDB
router.get('/export-excel', exportAllLeadsExcel);

// Direct download of the repository's leads.xlsx file
router.get('/download', downloadPhysicalExcel);

// Trigger re-sync of database records into local leads.xlsx
router.post('/sync', syncLeadsDisk);
router.get('/sync', syncLeadsDisk);

export default router;
