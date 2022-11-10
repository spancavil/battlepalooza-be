import { Router } from 'express';
import { PackController } from '../controllers/index.js';

const router = Router();

router.post('/', PackController.getPackNftInfo);
router.post('/now', PackController.getDateNow);

export default router;
