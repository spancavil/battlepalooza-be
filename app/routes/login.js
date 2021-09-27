import { Router } from 'express';
import { LoginService } from '../controllers/index';
const router = Router();

router.post('/verify-code', LoginService.sentCodeByMail );
router.get('/', LoginService.login );

export default router;