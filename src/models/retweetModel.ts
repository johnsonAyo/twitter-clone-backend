import mongoose from 'mongoose';

const reTweetSchema = new mongoose.Schema(
  {
    tweetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'allCreatedTweets',
    },
    reTweeterId: {
      type: String,
    }
  },
  { timestamps: true },
);

const CreateRetTweet = mongoose.model('allReTweets', reTweetSchema);

export default CreateRetTweet;
