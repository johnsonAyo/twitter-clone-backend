import { IChat } from '../utils/interfaces/chatInterface';
import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.model<IChat>('Conversation', ConversationSchema);
