import mongoose from 'mongoose';

/***********************************
 * tweet content interface
 ***********************************/

interface tweetIn {
  messageBody: string;
  tweetImage: string;
  userId: any;
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
      ref: 'users',
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
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

// count likes

tweetSchema.virtual('noOfLikes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'tweetId',
  count: true,
});

//count comment

tweetSchema.virtual('commentCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'tweetId',
  count: true,
});

//count the number of retweet a particular tweet has

tweetSchema.virtual('retweetCount', {
  ref: 'allReTweets',
  localField: '_id',
  foreignField: 'tweetId',
  count: true,
});

//return comments

tweetSchema.virtual('allComment', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'tweetId',
});

//name of person that created the tweet

tweetSchema.virtual('who_that_created_tweet', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
});

const CreateTweetCln = mongoose.model('allCreatedTweets', tweetSchema);

export default CreateTweetCln;
