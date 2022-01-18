import mongoose, { mongo } from 'mongoose';

/***********************************
 * tweet content interface
 ***********************************/

interface tweetIn {
  messageBody: string;
  tweetImage: string;
  userId: Number;
  whoCanReply: string;
  cloudinary_id: string;
}

// /***********************************
//  * sub schema for who can replay
//  ***********************************/

/***********************************
 * let whoCanReply = mongoose.model
 ***********************************/

const tweetSchema = new mongoose.Schema<tweetIn>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userCollection',
    },
    messageBody: {
      type: String,
      default: '',
    },
    tweetImage: {
      type: String,
    },
    whoCanReply: {
      type: String,
    },
    cloudinary_id: {
      type:String,
    },
  },
  { timestamps: true },
);

const CreateTweetCln = mongoose.model('allCreatedTweets', tweetSchema);

export default CreateTweetCln;
