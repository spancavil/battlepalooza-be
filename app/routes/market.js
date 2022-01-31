import {Router} from "express";
import { MarketController } from "../controllers/marketplace.controller.js";

const router = Router()

router.post('/data', MarketController.getMarketData);
router.post('/list', MarketController.getMarketList);
router.post('/detail', MarketController.getMarketDetail);

export default router
