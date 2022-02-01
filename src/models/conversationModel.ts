import { IChat } from '../utils/interfaces/chatInterface';
import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema(
  {
user1: {
    type: mongoose.Types.ObjectId
},
user2: {
    type: mongoose.Types.ObjectId
}

  },

  {
    timestamps: true,
  },
);

ConversationSchema.index({ user1: 1, user2: 1 }, { unique: true });

export default mongoose.model<IChat>('Conversation', ConversationSchema);
