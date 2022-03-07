import { Router } from 'express';
import { DropController } from '../controllers/drop.controller.js';

const router = Router();

router.post('/', DropController.getDrops);
router.get('/detail', DropController.getDropDetail);
router.get('/pay-coin-nft', DropController.payCoinNft);
router.put('/buy-shop-nft', DropController.buyShopNft);
router.post('/txstatus', DropController.getTxStatus);

export default router;