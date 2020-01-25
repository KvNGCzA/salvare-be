import express from 'express';
import user from './user';
import auth from './auth';
import cases from './case';

const router = express.Router();

router.use('/api/v1', user, auth, cases);

export default router;
