import express from 'express';
import user from './user.js';
import login from './login.js'

const router = express.Router();

router.use('/api/login', login);
router.use('/api/user', user);

export default router;
