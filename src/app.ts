import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes';

const app: Express = express();
app.use(morgan('dev'));

app.use(authRoutes);

export default app;
