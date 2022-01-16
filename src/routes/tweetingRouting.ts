import express, { Request, Response } from 'express';
import imageMulter from '../utils/tweet_utils/multerImageUpload';
import * as tweetControls from '../controllers/tweetController';

const router = express.Router();

//create tweet

router.post('/tweet', imageMulter.single('tweetImage'), tweetControls.userNewTweet);


export default router;
