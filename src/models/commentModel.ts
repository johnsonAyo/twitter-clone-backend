import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1000,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
