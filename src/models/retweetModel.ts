import mongoose from 'mongoose';

const reTweetSchema = new mongoose.Schema(
  {
    tweetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'allCreatedTweets',
    },
    reTweeterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"users"
    },
  },
  { timestamps: true },
);

const CreateReTweet = mongoose.model('allReTweets', reTweetSchema);

export default CreateReTweet;
