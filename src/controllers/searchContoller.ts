import catchAsync from './../utils/catchAsync';
import express, { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/appError';
import QueryApi from '../utils/QueryApi';
import CreateTweetCln from '../models/tweetModel';
import Responses from '../utils/response';
import CreateReTweet from '../models/retweetModel';
import User from '../models/userModels';

const resData = new Responses();

export const searchTweetsAndRetweets = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.search) {
      return next(new ErrorHandler(400, 'Query must be provided'));
    }

    const tweets = await CreateTweetCln.find({
      $text: { $search: req.query.search as string },
    });
    const retweets = await CreateReTweet.find({
      $text: { $search: req.query.search as string },
    });

    resData.setSuccess(200, 'successfully searched for tweets and retweets', { tweets, retweets });
    return resData.send(res);
  },
);

export const searchUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.search) {
    return next(new ErrorHandler(401, 'Query must be provided'));
  }

  const usersQuery = new QueryApi(
    User.find({ $text: { $search: req.query.search as string } }),
    req.query,
  )
    .sort()
    .limit()
    .paginate();

  const users = await usersQuery.query;

  resData.setSuccess(200, 'successfully searched for tweets and retweets', { users });
  return resData.send(res);
});

export const searchPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.search) {
    return next(new ErrorHandler(401, 'Query must be provided'));
  }

  const tweetsQuery = new QueryApi(
    CreateTweetCln.find({ $text: { $search: req.query.search as string } }),
    req.query,
  )
    .sort()
    .limit()
    .paginate();

  const tweets = await tweetsQuery.query;

  resData.setSuccess(200, 'successfully searched for tweets', { tweets });
  return resData.send(res);
});
