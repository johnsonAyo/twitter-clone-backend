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
import Responses from '../utils/response';

const responseClass = new Responses();

/****************************************************************************
 *                                                                           *
 *               Creation of trending Hashtags                               *
 *                                                                           *
/*****************************************************************************/

/***********************************
 * create a harsh controller
 ***********************************/

export const postFollowerController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let followId: any = req.user._id;
    followId = followId.toString();
    let data: any;
    let { userId } = req.body;
    try {
      data = await createFollowModel(userId, followId);
    } catch (error) {
      return next(new ErrorHandler(401, 'Already following user'));
    }
    responseClass.setSuccess(200, 'success', data);
    return responseClass.send(res);
  },
);
