import express from 'express';

import userRoute from './routes/userRoute';
import authRoute from './routes/authenticationRoute';
import {MessageResponse} from '../interfaces';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'routes: users, auth',
  });
});

router.use('/auth', authRoute);
router.use('/users', userRoute);

export default router;
