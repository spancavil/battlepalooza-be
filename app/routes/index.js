import express from 'express';
import user from './user.js';
import login from './login.js'
import pack from './pack.js';

const router = express.Router();

router.use('/api/login', login);
router.use('/api/user', user);
router.use('/api/pack', pack);

export default router;
