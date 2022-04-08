import { Router } from 'express';
import { StaticController } from '../controllers/static.controller';

const router = Router();

router.get('/nft-data', StaticController.getNftData);
router.get('/clans', StaticController.getClans);
router.get('/rarity', StaticController.getRarity);
router.get('/rep-id', StaticController.getRepresentId);

export default router;