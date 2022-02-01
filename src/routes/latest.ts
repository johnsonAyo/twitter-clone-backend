import express, { NextFunction, Request, Response } from 'express';
import { protectRoute } from '../controllers/authController';
import { getLatestTweet } from '../controllers/lastestController';


const router = express.Router();

router.use(protectRoute);

//GET Request Lastest Tweet
router.get("/latest", getLatestTweet);

//Get Request Tweet with Media
router.get("/media")

export default router;