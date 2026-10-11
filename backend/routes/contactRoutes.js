import { Router } from 'express';
import { createContactMessage } from '../controllers/contactController.js';
import { requireFields } from '../middleware/validate.js';

const router = Router();

router.post('/', requireFields(['fullName', 'email', 'message']), createContactMessage);

export default router;
