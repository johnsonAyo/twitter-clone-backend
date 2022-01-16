import express, { Request, Response } from 'express';

import CreateTweetCln from '../models/tweetModel';
import { tweetValidate } from '../utils/tweet_utils/tweetingValidation';
import cloudinaryImage from '../utils/tweet_utils/cloudinaryImageStorage';



/****************************************************************************
 *                                                                           *
 *               Creation of new Tweet by the user                           *
 *                                                                           *
/*****************************************************************************/


export const userNewTweet = async (req:any, res: Response) => {
  //check error for incoming request

  const { error } = tweetValidate(req.body);

  if (error) return res.json({ msg: error.message });

    const { messageBody, whoCanReply } = req.body;

    try {
      
        let cloudImage =  await cloudinaryImage.uploader.upload(req.file.path);


    let createTweet = new CreateTweetCln({
      userId: '61e3343d24f623682851e297',
      messageBody,
      tweetImage: cloudImage.secure_url,
      whoCanReply,
      cloudinary_id: cloudImage.public_id,
    });
        
        if (createTweet) {
            
            createTweet.save();
            
            return res.json("Tweet saved suucessfully...");
        } else {
            return res.status(404).json({msg: "Error  occur for file uploading"})
        }
    
        
    } catch (error:any) {
        console.error(error.message)
  }
};
