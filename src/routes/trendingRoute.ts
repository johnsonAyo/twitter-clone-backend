import express from 'express';
import { protectRoute } from '../controllers/authController';
import {
  viewTrendsController,
  trendsTweetCountController,
} from '../controllers/trendingController';
const router = express.Router();

router.get('/', protectRoute, viewTrendsController); //get trending Hashtags

router.get('/tweetcount', protectRoute, trendsTweetCountController);
export default router;
