import express, { Request, Response, NextFunction } from 'express';
import { createFollow, getFollowers } from '../models/followModel';
import catchAsync from '../utils/catchAsync';
import ErrorHandler from '../utils/appError';

export const postFollowerController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let { userId, followId } = req.body;
    let data: any = await createFollow(userId, followId);
    if (!data) return next(new ErrorHandler(401, 'error occurred'));

    data
      ? res.status(200).json({ message: 'success', data })
      : res.status(500).json({ message: 'no data found' });
    return data;
  },
);

export const getFollowersController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    {
      let { userId } = req.params;
      let  pageNo  :any= req.query.pageNo;
      let data: any = await getFollowers(userId,parseInt(pageNo));
      if (!data) return next(new ErrorHandler(401, 'Error occurred'));

      data
        ? res.status(200).json({ message: 'success', data })
        : res.status(500).json({ message: 'no data found' });
      return data;
    }
  },
);
