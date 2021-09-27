import { Router } from 'express';
import { UserController } from '../controllers/index';
const router = Router();

router.post('/create', UserController.userRegistration );
router.get('/', UserController.findOneUser );
router.get('/search', UserController.findAllUsers );
router.put('/', UserController.updateUser );
router.post('/', UserController.deleteUser );
export default router;
