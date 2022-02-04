import express, { Request, Response, NextFunction } from 'express';
import CreateTweetCln from '../models/tweetModel';
import catchAsync from '../utils/catchAsync';
import ErrorHandler from '../utils/appError';

export const getLatestTweet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //const tweetId = req.params.id;
    const tweets = await CreateTweetCln.find()
      .sort({
        updatedAt: -1,
      })
      .populate('_id');
    if (!tweets) return next(new ErrorHandler(400, 'Error occurred'));
    res.status(200).json({ message: 'Latest tweets', data: tweets });
  },
);

export const getMediaTweet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const mediaTweet = await CreateTweetCln.find({ tweetImage: /.+/i })
    .sort({
      updatedAt: -1,
    })
    .populate('_id');
  if (!mediaTweet) return next(new ErrorHandler(400, 'Error occurred'));
  res.status(200).json({ message: 'Media tweets', data: mediaTweet });
});
