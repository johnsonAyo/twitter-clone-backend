import express, { NextFunction, Response, Request } from 'express';
import { postFollower } from '../controllers/followController';
const router = express.Router();

router.get('/',postFollower); // gets all authors

export default router;
