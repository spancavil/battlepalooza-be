import { Router } from 'express';
import { LoginController } from '../controllers/index.js';
const router = Router();

router.post('/verify-code', LoginController.sentCodeByMail );
router.get('/', LoginController.login );

export default router;