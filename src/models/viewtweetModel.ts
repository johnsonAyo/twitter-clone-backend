import { Follow } from './followModel';
import CreateTweetCln from './tweetModel';
import mongoose from 'mongoose';
import CreateReTweet from './retweetModel';

export async function viewTweet(userId: string, pageNo: number, pageSize: number): Promise<void> {
  let followers: any = await Follow.find({ userId })
    .skip(pageNo - 1)
    .limit(pageSize);
  let followersId = followers.map((val: any) => val.followId);

  let retweet:any =await CreateReTweet.find({ reTweeterId: { $in: followersId } })

  let data: any = await CreateTweetCln.find({ userId: { $in: followersId } });
  console.log(data);
  let output: any = { followers: followersId, tweet: data};
  return output;
}
