import { Router } from 'express';
import { submitContractForAudit } from '../controllers/audit.controller';

const router = Router();

// Route to handle contract submission
// POST /api/audit
router.post('/', submitContractForAudit);

export default router; 