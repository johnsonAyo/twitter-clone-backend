import catchAsync from './../utils/catchAsync';
import express, { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/appError';
import QueryApi from '../utils/apiFeatures';
import CreateTweetCln from '../models/tweetModel';
import Responses from '../utils/response';
import CreateReTweet from '../models/retweetModel';
import User from '../models/userModels';
import Comment from '../models/commentModel';

const resData = new Responses();

export const searchTweetsAndComments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const searchString = req.query.search as string;

    if (!req.query.search) {
      return next(new ErrorHandler(400, 'Query must be provided'));
    }

    const tweets = await CreateTweetCln.find({
      messageBody: { $regex: `${searchString}` },
    });
    console.log(tweets);
    const comments = await Comment.find({
      content: { $regex: `${searchString}` },
    });

    resData.setSuccess(200, 'successfully searched for tweets and retweets', { tweets, comments });
    return resData.send(res);
  },
);

export const searchUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const searchString = req.query.search as string;
  if (!req.query.search) {
    return next(new ErrorHandler(401, 'Query must be provided'));
  }

  const usersQuery = new QueryApi(
    User.find({
      $or: [
        { firstName: { $regex: `${searchString}` } },
        { lastName: { $regex: `${searchString}` } },
      ],
    }),
    req.query,
  )
    .sort()
    .paginate();

  const users = await usersQuery.query;

  resData.setSuccess(200, 'successfully searched for tweets and retweets', { users });
  return resData.send(res);
});
