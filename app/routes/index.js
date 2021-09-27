import express from 'express';
import user from './user';
import login from './login'

var router = express.Router();

router.use('/api/login', login);
router.use('/api/user', user);

export default router;
