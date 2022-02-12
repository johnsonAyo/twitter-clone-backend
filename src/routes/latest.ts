import express, { NextFunction, Request, Response } from 'express';
import { protectRoute } from '../controllers/authController';
import { getLatestTweet, getMediaTweet } from '../controllers/lastestController';

const router = express.Router();

router.use(protectRoute);

//GET Request Lastest Tweet
router.get('/', getLatestTweet);

//Get Request Tweet with Media
router.get('/media', getMediaTweet);

export default router;
