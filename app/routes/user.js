import { Router } from 'express';
import { UserController } from '../controllers/index.js';
//import AuthMiddleware from '../middelware/auth.js';

const router = Router();

// router.post('/create', UserController.userRegistration );
// router.get('/',AuthMiddleware, UserController.findOneUser );
// router.get('/search',AuthMiddleware, UserController.findAllUsers );
// router.put('/',AuthMiddleware, UserController.updateUser );
// router.post('/',AuthMiddleware, UserController.deleteUser );
router.post('/check-maintenance', UserController.getMaintenanceStatus);
router.post('/verify-recaptcha', UserController.verifyReCaptcha);
router.post('/payload-forte', UserController.payloadForte);
router.post('/forte-balance', UserController.forteBalance);
router.post('/collection', UserController.getCollection);
router.post('/collection-detail', UserController.getCollectionDetail);
router.post('/trade-history-list', UserController.getMarketHistory);
router.post('/trade-history-detail', UserController.getMarketHistoryDetail);
router.post('/get-wallet-payment-token', UserController.getWalletPaymentToken);
router.post('/get-wallet-crypto-transactions', UserController.getWalletCryptoTransactions);
router.post('/burn-nft', UserController.burnNft);

export default router;
