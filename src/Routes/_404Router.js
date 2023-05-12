import express from 'express';
import { myTest404 } from '../Controllers/TestController';

const router = express.Router();

/* ADS */
router.route('/*').delete(myTest404).get(myTest404).post(myTest404).put(myTest404);

export default router;
