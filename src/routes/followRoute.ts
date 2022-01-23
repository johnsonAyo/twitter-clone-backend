import express, { NextFunction, Response, Request } from 'express';
import { protectRoute } from '../controllers/authController';
import {
  postFollowerController,
  getFollowersController,
  unFollowController,
  getFolloweringController,
  suggestFollowersController,
} from '../controllers/followController';
import {
  paginationPolicy,
  postFollowerPolicy,
  unFollowPolicy,
} from '../utils/validations/followerValidation';
const router = express.Router();

router
  .route('/')
  .delete(unFollowPolicy, protectRoute, unFollowController) //delete followers or unfollow
  .post(postFollowerPolicy, protectRoute, postFollowerController) //post followers
  .get(paginationPolicy, protectRoute, getFollowersController); // get followers

router.get('/following', paginationPolicy, protectRoute, getFolloweringController);
router.get('/suggest', paginationPolicy, protectRoute, suggestFollowersController);

export default router;
