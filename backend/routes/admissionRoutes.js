import { Router } from 'express';
import { createAdmission, getAdmissions, exportAdmissionsExcel } from '../controllers/admissionController.js';
import { requireFields, normalizeAdmissionPayload } from '../middleware/validate.js';

const router = Router();

router.get('/export-excel', exportAdmissionsExcel);

router.post(
  '/',
  requireFields(['fullName', 'email', 'phone', 'courseSlug']),
  normalizeAdmissionPayload,
  createAdmission
);

router.get('/', getAdmissions);

export default router;
