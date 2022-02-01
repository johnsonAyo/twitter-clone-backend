import { IMessage } from '../utils/interfaces/chatInterface';
import { Schema, model } from 'mongoose';

// const ReceiverSchema = new Schema({
//     receiverId: {
//         type: String
//     },
//     isDeleted: {
//         type: Boolean,
//         default: false
//     }
// })

const MessageSchema = new Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    deleted: {
        type: Boolean,
        default: false
    },
   
    text: {
      type: String,
    },
    emoji: {
      type: String,
    },
    media: {
      media:{
        type: String,
        data: URL
      },
      enums: ['Document', 'Audio', 'Picture', 'Video'],
    },
    audioR: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IMessage>('Message', MessageSchema);
