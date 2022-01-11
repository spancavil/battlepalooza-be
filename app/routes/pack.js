import { Router } from 'express';
import { PackController } from '../controllers/index.js';
import AuthMiddleware from '../middelware/auth.js';

const router = Router();

router.post('/create', PackController.packRegistration);
router.get('/', AuthMiddleware, PackController.findOnePack);
router.get('/search', AuthMiddleware, PackController.findAllPacks);
router.put('/', AuthMiddleware, PackController.updatePack);
router.post('/', AuthMiddleware, PackController.deletePack);

export default router;
