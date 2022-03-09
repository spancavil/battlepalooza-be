import { Router } from 'express';
import { DropController } from '../controllers/drop.controller.js';

const router = Router();

router.post('/', DropController.getDrops);
router.post('/detail', DropController.getDropDetail);
router.post('/pay-coin-nft', DropController.payCoinNft);
router.post('/buy-shop-nft', DropController.buyShopNft);
router.post('/txstatus', DropController.getTxStatus);

export default router;