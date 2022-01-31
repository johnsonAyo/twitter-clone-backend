import express, { NextFunction, Response, Request } from 'express';
import { protectRoute } from '../controllers/authController';
import { viewTrendsController } from '../controllers/trendingController';
const router = express.Router();



router
  .route('/')
  .get(protectRoute, viewTrendsController) //get trending Hashtags

export default router;
