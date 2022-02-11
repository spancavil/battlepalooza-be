import {Router} from "express";
import { MarketController } from "../controllers/marketplace.controller.js";

const router = Router()

router.post('/data', MarketController.getMarketData);
router.post('/list', MarketController.getMarketList);
router.post('/detail', MarketController.getMarketDetail);
router.post('/register', MarketController.registerProduct);
router.post('/buy-product', MarketController.buyProduct);
router.post('/tx-status', MarketController.getTxStatus);
router.post('/cancel-selling', MarketController.cancelSelling);
router.post('/request-withdraw', MarketController.requestWithdraw);

export default router
