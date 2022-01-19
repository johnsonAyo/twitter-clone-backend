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

export const Follow = mongoose.model('Follow', followSchema);

// Create follow object
export const createFollowModel = async (userId: string, followerId: string) => {
  let newId = userId + followerId;
  const follow = new Follow({
    userId: userId,
    followId: followerId,
    followTrackerId: newId,
  });
  const result = await follow.save();
  return result;
};
// Get follower list

export const getFollowersModel = async (userId: string, pageNo: number, pageSize: number) => {
  const followList = await Follow.find({ userId });
  const userIdArray = followList.map((val) => val['followId']);
  const result = await userModels.find({ _id: { $in: userIdArray } }).select({ _id: 1, email: 1 });
  const resultWithPagno = await userModels
    .find({ _id: { $in: userIdArray } })
    .skip(pageNo - 1)
    .limit(pageSize);
  const output = { Totalfollowers: result.length, pageNo, pageSize, followers: resultWithPagno };

  return output;
};

export const getFollowingModel = async (userId: string, pageNo: number, pageSize: number) => {
  const followList = await Follow.find({ followId: userId });
  console.log(followList);

  const userIdArray = followList.map((val) => val['userId']);
  const result = await userModels.find({ _id: { $in: userIdArray } }).select({ _id: 1, email: 1 });
  const resultWithPagno = await userModels
    .find({ _id: { $in: userIdArray } })
    .skip(pageNo - 1)
    .limit(pageSize);
  const output = { Totalfollowing: result.length, pageNo, pageSize, following: resultWithPagno };

  return output;
};

export const unFollowModel = async (userId: string, followId: string) => {
  let result = await Follow.deleteOne({ userId, followId });
  return result;
};
