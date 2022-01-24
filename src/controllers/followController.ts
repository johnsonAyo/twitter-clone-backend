import express, { Request, Response, NextFunction } from 'express';
import {
  createFollowModel,
  getFollowersModel,
  getFollowingModel,
  suggestFollowersModel,
  unFollowModel,
} from '../models/followModel';
import catchAsync from '../utils/catchAsync';
import ErrorHandler from '../utils/appError';

/****************************************************************************
 *                                                                           *
 *               Creation of followers and following                         *
 *                                                                           *
/*****************************************************************************/

/***********************************
 * following a user  controller
 ***********************************/

export const postFollowerController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let followId: any = req.user._id;
    followId = followId.toString();

    let { userId } = req.body;
    let data: any = await createFollowModel(userId, followId);
    if (!data) return next(new ErrorHandler(401, 'error occurred'));

    return res.status(200).json({ message: 'success', data });
  },
);

/***********************************
 * get all followers for an authorized user
 ***********************************/

export const getFollowersController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    {
      let userId: any = req.user._id;
      userId = userId.toString();

      let pageNo: any = req.query.pageNo;
      let pageSize: any = req.query.pageSize;
      let data: any = await getFollowersModel(userId, parseInt(pageNo), parseInt(pageSize));
      if (!data) return next(new ErrorHandler(401, 'Error occurred'));
      return res.status(200).json({ message: 'success', data });
    }
  },
);

/***********************************
 * Get all accounts an authorized user follows
 ***********************************/

export const getFolloweringController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    {
      let userId: any = req.user._id;
      userId = userId.toString();

      let pageNo: any = req.query.pageNo;
      let pageSize: any = req.query.pageSize;
      let data: any = await getFollowingModel(userId, parseInt(pageNo), parseInt(pageSize));
      if (!data) return next(new ErrorHandler(401, 'Error occurred'));

      return res.status(200).json({ message: 'success', data });
    }
  },
);

/***********************************
 * unfollow user using userId
 ***********************************/

export const unFollowController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    {
      let followId: any = req.user._id;
      followId = followId.toString();

      let { userId } = req.body;
      let data: any = await unFollowModel(userId, followId);
      if (!data) return next(new ErrorHandler(401, 'Error occurred'));

      return res.status(200).json({ message: 'success', data });
    }
  },
);

/*********************************************************************************************************
 * Suggest follower based on users you follow.
 * The connections of the users you follow will be suggested to you as a recommended connection
 *********************************************************************************************************/

export const suggestFollowersController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    {
      let userId: any = req.user._id;
      userId = userId.toString();

      let pageNo: any = req.query.pageNo;
      let pageSize: any = req.query.pageSize;
      let data: any = await suggestFollowersModel(userId, parseInt(pageNo), parseInt(pageSize));
      if (!data) return next(new ErrorHandler(401, 'Error occurred'));

      return res.status(200).json({ message: 'success',count: data.length,'suggested-connection': data });
    }
  },
);
