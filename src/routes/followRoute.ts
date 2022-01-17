import express, { NextFunction, Response, Request } from 'express';
import { postFollowerController,getFollowersController } from '../controllers/followController';
import { getFollowerPolicy, postFollowerPolicy } from '../utils/validations/followerValidation';
const router = express.Router();

router.post('/',postFollowerPolicy, postFollowerController); // post followers
router.get('/:userId?', getFollowerPolicy, getFollowersController); // post followers


export default router;
