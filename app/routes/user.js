import { Router } from 'express';
import { UserController } from '../controllers/index.js';
import AuthMiddleware from '../middelware/auth.js';

const router = Router();

router.post('/create', UserController.userRegistration );
router.get('/',AuthMiddleware, UserController.findOneUser );
router.get('/search',AuthMiddleware, UserController.findAllUsers );
router.put('/',AuthMiddleware, UserController.updateUser );
router.post('/',AuthMiddleware, UserController.deleteUser );
export default router;
