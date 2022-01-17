import mongoose, { Mongoose } from 'mongoose';
import userModels from './userModels';

// follow schema
const followSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userModels' },
    followId: { type: String, required: true },
    followTrackerId: { type: String, unique: true },
  },
  { timestamps: true },
);

// followSchema.index({ userId: 1, followId: 1 }, { unique: true });

const Follow = mongoose.model('Follow', followSchema);

// Create follow object
export const createFollow = async (userId: string, followId: string) => {
  let newId = userId + followId;
  const follow = new Follow({
    userId: userId,
    followId: followId,
    followTrackerId: newId,
  });
  const result = await follow.save();
  return result;
};
// Get follower list

export const getFollowers = async (userId: string, pageNo: number) => {
  const followList = await Follow.find({ userId });
  const userIdArray = followList.map((val) => val['followId']);
  const result = await userModels.find({ _id: { $in: userIdArray } }).select({ _id: 1, email: 1 });
  const resultWithPagno = await userModels
    .find({ _id: { $in: userIdArray } })
    .skip(pageNo)
    .limit(5);
  const output = { Totalfollowers: result.length, pageNo, pageSize: 5, followers: resultWithPagno };
  return output;
};
