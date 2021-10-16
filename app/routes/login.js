import { Router } from 'express';
import { LoginController } from '../controllers/index.js';
const router = Router();

router.post('/first-login', LoginController.firstLogin );
router.post('/', LoginController.login );
router.post('/verify-code', LoginController.verifyCode);

export default router;