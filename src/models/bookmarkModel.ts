import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema(
  {
    tweetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'allCreatedTweets',
    },
    isBookmark: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

//virtual field for book mark count

bookmarkSchema.virtual('bookmarkCount', {
  ref: 'allCreatedTweets',
  localField: 'tweetId',
  foreignField: '_id',
  count: true,
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

export default Bookmark;
