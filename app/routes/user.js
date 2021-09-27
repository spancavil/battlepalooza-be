import { Router } from 'express';
import { UserController } from '../controllers/index';
import AuthMiddleware from '../middelware/auth';

const router = Router();

router.post('/create', UserController.userRegistration );
router.get('/',AuthMiddleware, UserController.findOneUser );
router.get('/search',AuthMiddleware, UserController.findAllUsers );
router.put('/',AuthMiddleware, UserController.updateUser );
router.post('/',AuthMiddleware, UserController.deleteUser );
export default router;
