import { Router } from 'express';
import {
  exportAllLeadsExcel,
  downloadPhysicalExcel,
  syncLeadsDisk,
} from '../controllers/leadsController.js';

const router = Router();

/**
 * Security Middleware: Restrict access to internal lead export endpoints.
 * Requires ADMIN_SECRET header or query parameter to prevent unauthorized public scraping.
 */
function requireAdminAuth(req, res, next) {
  const adminSecret = process.env.ADMIN_SECRET || process.env.ADMIN_KEY;
  const providedKey = req.headers['x-admin-key'] || req.query.adminKey || req.query.key;

  if (!adminSecret || providedKey !== adminSecret) {
    return res.status(403).json({
      error: 'Access denied: Admin credentials required to export lead data.',
    });
  }
  next();
}

// Protected endpoints
router.get('/export-excel', requireAdminAuth, exportAllLeadsExcel);
router.get('/download', requireAdminAuth, downloadPhysicalExcel);
router.post('/sync', requireAdminAuth, syncLeadsDisk);

export default router;
