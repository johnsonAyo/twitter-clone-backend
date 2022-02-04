import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  tweetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'allCreatedTweets',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1000,
  },
});

commentSchema.index({ content: 'text' });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
