import { Router } from 'express';
import { createContactMessage, getContactMessages, exportContactExcel } from '../controllers/contactController.js';
import { requireFields } from '../middleware/validate.js';

const router = Router();

router.get('/export-excel', exportContactExcel);
router.get('/', getContactMessages);
router.post('/', requireFields(['fullName', 'email', 'message']), createContactMessage);

export default router;
