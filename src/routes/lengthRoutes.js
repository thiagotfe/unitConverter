import { Router } from 'express';
import lengthController from '../controllers/LengthController';

const router = new Router();

router.post('/', lengthController.convert);

export default router;
