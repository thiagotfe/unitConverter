import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

import express from 'express';
import lengthRoutes from './routes/lengthRoutes';
import temperatureRoutes from './routes/temperatureRoutes';

const corsOptions = {
  origin: '*',
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet({ crossOriginEmbedderPolicy: false }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/length', lengthRoutes);
    this.app.use('/temperature', temperatureRoutes);
  }
}

export default new App().app;
