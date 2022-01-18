import express, { Request, Response } from 'express';

import CreateTweetCln from '../models/tweetModel';
import CreateRetTweet from '../models/retweetModel';
import { tweetValidate } from '../utils/tweet_utils/tweetingValidation';
import cloudinaryImage from '../utils/tweet_utils/cloudinaryImageStorage';

/****************************************************************************
 *                                                                           *
 *               Creation of new Tweet by the user                           *
 *                                                                           *
/*****************************************************************************/

export const userNewTweet = async (req: any, res: Response) => {
  //check error for incoming request

  const { error } = tweetValidate(req.body);

  if (error) return res.json({ msg: error.message });

  const { messageBody, whoCanReply } = req.body;

  try {
    let cloudImage = await cloudinaryImage.uploader.upload(req.file.path);

    let createTweet = new CreateTweetCln({
      userId: req.user._id,
      messageBody,
      tweetImage: cloudImage.secure_url,
      whoCanReply,
      cloudinary_id: cloudImage.public_id,
    });

    if (createTweet) {
      await createTweet.save();

      return res.json('Tweet saved suucessfully...');
    } else {
      return res.status(404).json({ msg: 'Error  occur for file uploading' });
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

/****************************************************************************
 *                 
 *              Retweeting function                                          *
 *               An authorised user can reweet another person's tweet   
 *                                                                           *
 *                                                                           *
/*****************************************************************************/

export const reTweeting = async (req: Request, res: Response) => {
  try {
    //Get the tweet of the user you want to reweet his tweet

    //save the reweet of the and the user id

    const createReTweet = new CreateRetTweet({
      tweetId: req.params.id,
      reTweeterId: req.user._id,
    });

    if (createReTweet) {
      await createReTweet.save();
      return res.status(201).json({ msg: 'Reweet created....' });
    }
  } catch (error: any) {
    return res.status(404).json({ msg: error.message });
  }
};

/****************************************************************************
 *                 
 *                     Show All user reTweet                                 *                  
 *                                                                           *
 *                                                                           *
/*****************************************************************************/

export const allUserRetweet = async (req: Request, res: Response) => {
  try {
    //get id of reweet and search the message body in tweet colltn
    const userReTweet: any | undefined = await CreateRetTweet.find({ userId: req.user._id });

    CreateTweetCln.find({ tweetId: userReTweet.tweetId }, (err: any, allReTweets: any) => {
      if (err) return res.status(404).json({ msg: 'Error Occured in retweet fetching...' });

      if (allReTweets) {
        return res.status(200).json({ allReTweets: allReTweets });
      }
    });
  } catch (error: any | undefined) {
    res.json({ msg: error.message });
  }
};

/****************************************************************************
 *                 
 *                     Show All user Tweet                                 *                  
 *                                                                           *
 *                                                                           *
/*****************************************************************************/

export const allUserTweet = (req: Request, res: Response) => {
  try {
    //All user tweet

    CreateTweetCln.find({ userId: req.user._id }, (err: any, allTweets: any) => {
      if (err) return res.status(404).json({ msg: 'Error Occured in retweet fetching...' });

      if (allTweets) {
        return res.status(200).json({ allTweets: allTweets });
      }
    });
  } catch (error: any | undefined) {
    res.json({ msg: error.message });
  }
};

/****************************************************************************
 *                 
 *                    User Can delete his tweet                              *                  
 *                                                                           *
 *                                                                           *
/*****************************************************************************/

export const deleteTweet = (req: Request, res: Response) => {
  try {
    CreateTweetCln.findById(req.params.id, async (err: any, user: any) => {
      if (err) return res.status(404).json({ msg: 'Error occured in finding a particular tweet' });

      //delete image from cloudinary according to post id

      await cloudinaryImage.uploader.destroy(user.cloudinary_id);

      //delete user
      await user.remove();
      res.json('User Removed ...');
    });
  } catch (error: any | undefined) {
    res.json({ msg: error.message });
  }
};
