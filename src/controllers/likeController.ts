import express, { Request, Response, NextFunction, urlencoded } from 'express';
import Like from '../models/likeModel';
import tweet from '../models/tweetModel';

export const likeTweet = async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  const userId = req.user._id;

  try {
    const like = await Like.create({ id, userId });
    res.status(200).json({ message: 'The post has been liked', data: like });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const unlikeTweet = async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  console.log(req.body);
  const userId = req.user._id;

  try {
    const result = await Like.deleteOne({ tweetId: id, userId });
    console.log(result);
    res.status(200).json('The post has been disliked');
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getLikes = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const likes = await Like.find();
    res.status(200).json({ message: 'All likes', data: likes });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
