require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import {errorHandler} from './middlewares';
import api from './api';
import {MessageResponse} from './interfaces';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'api/v1',
  });
});

app.use('/api/v1', api);
app.use(errorHandler);

export default app;
