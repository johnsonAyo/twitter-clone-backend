import mongoose, { Mongoose } from 'mongoose';

// follow schema
const followSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    follerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

followSchema.index({ userId: 1, follerId: 1 }, { unique: true });

const Follow = mongoose.model('Follow', followSchema);

// Create follow object
export const createFollow = async (userId: string, followId: string) => {
    const follow= new Follow({
        userId: userId,
        followId: followId
    })
    const result = await follow.save()
    return result
};
// Get follower list
export const getFollowers = async (userId: string, followId: string) => {
    const follow= new Follow({
        userId: userId,
        followId: followId
    })
    const result = await follow.save()
};

