import { Router } from 'express';
import { PackController } from '../controllers/index.js';
import AuthMiddleware from '../middelware/auth.js';

const router = Router();

router.post('/', AuthMiddleware, PackController.getPackNftInfo);

export default router;
