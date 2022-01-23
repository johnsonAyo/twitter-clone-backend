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

      return res.json({ 'Tweet saved suucessfully...': createTweet });
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
    //Check if user has already retweet a particular tweet, if so undo reweet

    // const checkRetweetId = await CreateRetTweet.findOne({$and:[{tweetId: req.params.id },{userId: req.user._id}]});

    // if (checkRetweetId) {
    //   return res.json({ msg: 'You already retweeted this tweet.. 😁' });
    // }

    //Get the tweet of the user you want to reweet his tweet

    //save the retweet and the user id if not created..

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
    //get id of reweet and search the message body in tweet colltn using populate function
    const userReTweet: any = await CreateRetTweet.find({ reTweeterId: req.user._id }).populate(
      'tweetId',
    );

    if (userReTweet) return res.status(200).json({ AllUserLoginRetweet: userReTweet });
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

export const allUserTweet = async (req: Request, res: Response) => {
  try {
    //All user tweet

    CreateTweetCln.find({ userId: req.user._id }, (err: any, allTweets: any) => {
      if (err) return res.status(404).json({ msg: 'Error Occured in retweet fetching...' });

      if (allTweets == []) {
        return res.status(404).json({ msg: 'No tweet for this user' });
      } else {
        return res.status(200).json(allTweets);
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

export const deleteTweet = async (req: Request, res: Response) => {
  try {
    const tweetId = req.params.id;
    CreateTweetCln.findById(tweetId, async (err: any, user: any) => {
      console.log(user);

      if (err) {
        return res.status(404).json({ msg: 'Error occured in finding a particular tweet' });
      } else {
        //delete image from cloudinary according to post id

        if (!user) return res.status(404).json({ msg: 'The document you want is not found...' });
        await cloudinaryImage.uploader.destroy(user.cloudinary_id);

        //delete user tweet
        await user.remove();

        // delete also the retweet which a user has deleted from retweet collection

        await CreateRetTweet.deleteMany({ tweetId: tweetId });

        res.json({ msg: 'Tweet  Removed ...' });
      }
    });
  } catch (error: any | undefined) {
    res.json({ msg: error.message });
  }
};

/****************************************************************************
 *                 
 *                   Undo a particular tweet you reweeted.                            *                  
 /*****************************************************************************/

export const undoUserReweet = async (req: Request, res: Response) => {
  try {
    await CreateRetTweet.deleteOne({ tweetId: req.params.id }, (err: any, content: any) => {
      if (err) return res.status(404).json({ msg: err.message });

      if (content) return res.status(200).json({ msg: 'Reweet is been undo successfully...' });
    });
  } catch (err: any) {
    console.error(err.message);
  }
};

/****************************************************************************
 *                 
 *                   Get All tweet and retweet of other user you visit 
 *                    their page                                              *                  
 /*****************************************************************************/

export const getAllUserTweetNRetweet = async (req: Request, res: Response) => {
  try {
    //get other user retweet and and combine it with his tweet

    const otherUserId = req.params.id;

    console.log(otherUserId);

    const otherUserReTweetDetail = await CreateRetTweet.find({ reTweeterId: otherUserId }).populate(
      'tweetId',
    );

    const allOtherUserTweet = await CreateTweetCln.find({ userId: otherUserId });

    const allOtherUserChat = [
      { otherRetweetUser: otherUserReTweetDetail },
      { OtherUserTweet: allOtherUserTweet },
    ];

    return res.status(200).json(allOtherUserChat);
  } catch (error: any) {
    console.error(error.message);
  }
};
