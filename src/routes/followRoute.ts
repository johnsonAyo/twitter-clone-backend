import express, { NextFunction, Response, Request } from 'express';
import { postFollowerController,getFollowersController, unFollowController } from '../controllers/followController';
import { getFollowerPolicy, postFollowerPolicy, unFollowPolicy } from '../utils/validations/followerValidation';
const router = express.Router();

router.route("/")
        .delete(unFollowPolicy,unFollowController) //delete followers or unfollow
        .post(postFollowerPolicy, postFollowerController); //post followers
router.get('/:userId?', getFollowerPolicy, getFollowersController); // get followers


export default router;
