import mongoose from 'mongoose';

const reTweetSchema = new mongoose.Schema(
  {
    tweetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'allCreatedTweets',
    },
  },
  { timestamps: true },
);

const CreateTweet = mongoose.model('allReTweets', reTweetSchema);

export default CreateTweet;
