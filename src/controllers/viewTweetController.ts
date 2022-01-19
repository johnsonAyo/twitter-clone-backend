import express, { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import ErrorHandler from '../utils/appError';
import { viewTweet } from '../models/viewtweetModel';


export const viewTweetController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      let userId : any= req.user._id;
      userId=userId.toString()
      console.log(userId);
      
      let pageNo: any =req.query.pageNo;
      let pageSize: any =req.query.pageSize;
      let data: any = await viewTweet(userId,parseInt(pageNo),parseInt(pageSize));
      if (!data) return next(new ErrorHandler(401, 'error occurred'));
  
      return res.status(200).json({ message: 'success', data })
    },
  );
  