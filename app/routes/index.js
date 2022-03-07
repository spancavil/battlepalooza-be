import express from 'express';
import user from './user.js';
import login from './login.js'
import pack from './pack.js';
import market from './market.js';
import drops from './drops.js';

const router = express.Router();

router.use('/api/login', login);
router.use('/api/user', user);
router.use('/api/pack', pack);
router.use('/api/market', market);
router.use('/api/drops', drops);

export default router;
