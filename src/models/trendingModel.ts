import mongoose from 'mongoose';

/***********************************
 * schema for extracting Harsh tag
 ***********************************/
const trendingHashtagSchema = new mongoose.Schema({
  hashtag: { type: String, unique: true },
  totalCount: { type: Number },
  hourlyCount: { type: Number },
  expiryDate: { type: Date },
});

function extractHashtag(str: string) {
  let PATTERN = /#([a-z0-9]+)/gi,
    hashTags = str.split(' ').filter(function (str) {
      return PATTERN.test(str);
    });
  return hashTags;
}
