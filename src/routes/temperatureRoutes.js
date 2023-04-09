import { Router } from 'express';
import TemperatureController from '../controllers/TemperatureController';

const router = new Router();

router.post('/', TemperatureController.index);

export default router;
