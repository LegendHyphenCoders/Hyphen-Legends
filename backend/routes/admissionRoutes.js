import { Router } from 'express';
import { createAdmission, getAdmissions } from '../controllers/admissionController.js';
import { requireFields, normalizeAdmissionPayload } from '../middleware/validate.js';

const router = Router();

router.post(
  '/',
  requireFields(['fullName', 'email', 'phone', 'courseSlug']),
  normalizeAdmissionPayload,
  createAdmission
);

router.get('/', getAdmissions);

export default router;
