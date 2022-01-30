import mongoose from 'mongoose';
type ResultTypes = object;
/***********************************
 * schema for trending Hashtags
 ***********************************/
const hashtagSchema = new mongoose.Schema({
  hashtag: { type: String, unique: true },
  totalCount: { type: Number },
  hourlyCount: { type: Number },
  expiryDate: { type: Date },
});

const Hashtag = mongoose.model('Hashtag', hashtagSchema);

export async function createHashtag(data: string) {
  let hashtag;
  let hashtagArr = await extractHashtag(data);
  let currentData = await Hashtag.find({ hashtag: hashtagArr });
  let result: ResultTypes;
  if (currentData) {
    currentData.map(async (val: any) => {
      if (hashtagArr.includes(val.hashtag)) {
        if (Date.now() >= val.expiryDate) {
          result = await Hashtag.updateOne(
            { _id: val._id },
            { $set: { totalCount: val.totalCount + 1, hourlyCount: 0 + 1 } },
          );
        } else {
          result = await Hashtag.updateOne(
            { _id: val._id },
            { $set: { totalCount: val.totalCount + 1, hourlyCount: val.hourlyCount + 1 } },
          );
        }
      }
    });
  } else {
    let expiryDate = addHoursToDate(3);
    hashtagArr.map(async (val: string) => {
      hashtag = new Hashtag({
        hashtag: val,
        totalCount: 1,
        hourlyCount: 1,
        expiryDate: expiryDate,
      });
      result = await hashtag.save();
    });
  }
}

/***********************************
 * helper method to extract hashtag
 ***********************************/
async function extractHashtag(str: string) {
  let PATTERN = /#([a-z0-9]+)/gi,
    hashTagsArr = str.split(' ').filter(function (str) {
      return PATTERN.test(str);
    });
  let uniqueHashtag = [...new Set(hashTagsArr)];
  return uniqueHashtag;
}

/***********************************
 * helper method to add hours
 ***********************************/

function addHoursToDate(hours: number) {
  let expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + hours);
  console.log(expiryDate);

  return expiryDate;
}

// let word = `#chima we are the best #cima`;

// console.log(extractHashtag(word));
