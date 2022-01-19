import express, { Request, Response, NextFunction } from 'express';
import { createFollowModel, getFollowersModel, getFollowingModel, unFollowModel } from '../models/followModel';
import catchAsync from '../utils/catchAsync';
import ErrorHandler from '../utils/appError';

export const postFollowerController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let followId : any= req.user._id;
    followId=followId.toString()

    let { userId } = req.body;
    let data: any = await createFollowModel(userId, followId);
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
      let userId : any= req.user._id;
      userId=userId.toString()

      // let { userId } = req.params;
      let pageNo: any = req.query.pageNo;
      let pageSize: any = req.query.pageSize;
      let data: any = await getFollowersModel(userId, parseInt(pageNo), parseInt(pageSize));
      if (!data)
        return next(new ErrorHandler(401, 'Error occurred'));

      data
        ? res.status(200).json({ message: 'success', data })
        : res.status(500).json({ message: 'no data found' });
      return data;
    }
  },
);
export const getFolloweringController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    {
      let userId : any= req.user._id;
      userId=userId.toString()

      // let { userId } = req.params;
      let pageNo: any = req.query.pageNo;
      let pageSize: any = req.query.pageSize;
      let data: any = await getFollowingModel(userId, parseInt(pageNo), parseInt(pageSize));
      if (!data)
        return next(new ErrorHandler(401, 'Error occurred'));

      return res.status(200).json({ message: 'success', data })

      return data;
    }
  },
);

export const unFollowController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    {
      let followId : any= req.user._id;
      followId=followId.toString()
  
      let { userId } = req.body;
      let data: any = await unFollowModel(userId, followId);
      if (!data) return next(new ErrorHandler(401, 'Error occurred'));

      data
        ? res.status(200).json({ message: 'success', data })
        : res.status(500).json({ message: 'no data found' });
      return data;
    }
  },
);
