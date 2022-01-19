import express, { NextFunction, Response, Request } from 'express';
import { protectRoute } from '../controllers/authController';
import { viewTweetController } from '../controllers/viewTweetController';
import { viewtwitterPolicy } from '../utils/validations/viewTweetPolicy';
const router = express.Router();

router.get('/', viewtwitterPolicy, protectRoute, viewTweetController); // get followers

export default router;
