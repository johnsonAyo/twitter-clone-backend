import express, { NextFunction, Response, Request } from 'express';
import { viewTweetController } from '../controllers/viewTweetController';
const router = express.Router();

// router.get('/', viewTweetController); // get followers
// router.get('/', viewTweetController); // get followers
router.get('/:userId', viewTweetController); // get followers


export default router;
