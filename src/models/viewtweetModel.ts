import { Follow } from './followModel';
import CreateTweetCln from './tweetModel';
import mongoose from 'mongoose';
import CreateReTweet from './retweetModel';

/***********************************
 * Method to view tweets and retweets
 * for users a user follows
 ***********************************/
export async function viewTweet(userId: string, pageNo: number, pageSize: number): Promise<void> {
  let following: any = await Follow.find({ followId: userId })
    .skip(pageNo - 1)
    .limit(pageSize);
  let followingId = following.map((val: any) => val.userId);

  let data: any = await CreateTweetCln.find({ userId: { $in: followingId } }).populate('userId');

  let followingIdRe = following.map((val: any) => val.userId.toString());
  let retweet: any = await CreateReTweet.find({ reTweeterId: { $in: followingIdRe } }).populate(
    'reTweeterId',
  );

  let output: any = { following: followingId, tweet: data, retweet };
  return output;
}
export async function viewTweetofFriend(
  userId: string,
  pageNo: number,
  pageSize: number,
): Promise<void> {
  let data: any = await CreateTweetCln.find({ userId: userId })
    .skip(pageNo - 1)
    .limit(pageSize);

  return data;
}
