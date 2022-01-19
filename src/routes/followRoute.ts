import express, { NextFunction, Response, Request } from 'express';
import { protectRoute } from '../controllers/authController';
import {
  postFollowerController,
  getFollowersController,
  unFollowController,
  getFolloweringController,
} from '../controllers/followController';
import {
  getFollowerPolicy,
  postFollowerPolicy,
  unFollowPolicy,
} from '../utils/validations/followerValidation';
const router = express.Router();

router
  .route('/')
  .delete(unFollowPolicy, protectRoute, unFollowController) //delete followers or unfollow
  .post(postFollowerPolicy, protectRoute, postFollowerController) //post followers
  .get(getFollowerPolicy, protectRoute, getFollowersController); // get followers

router.get('/following', getFollowerPolicy, protectRoute, getFolloweringController);

export default router;
