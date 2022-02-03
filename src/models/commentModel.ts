import mongoose from 'mongoose';

<<<<<<< HEAD
const commentSchema = new mongoose.Schema(
  {
    tweetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tweet',
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
=======
const commentSchema = new mongoose.Schema({
  tweetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'allCreatedTweets',
>>>>>>> e8ca4462b7af93bac54246534e5829c44b9cfa1e
  },
  { timestamps: true },
);

commentSchema.index({ content: "text" });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
