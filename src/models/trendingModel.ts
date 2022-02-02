import mongoose from 'mongoose';
import CreateTweetCln from './tweetModel';
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

/************************************************************
 *           helper method for create newhashtag
 ************************************************************/

async function createNewHashtag(hashtagArr: string[]) {
  let expiryDate = addHoursToDate(3);
  let hashtag;
  let data: any = {};
  hashtagArr.map(async (val) => {
    hashtag = new Hashtag({
      hashtag: val,
      totalCount: 1,
      hourlyCount: 10,
      expiryDate: expiryDate,
    });
    let result = await hashtag.save();
    data.val = result;
  });
  return new Promise((resolve: any, reject: any) => {
    data ? resolve(data) : reject(data);
  });
}

/************************************************************
 * helper method to extract hashtag
 ************************************************************/
export async function extractHashtag(str: string) {
  let PATTERN = /(?<!\w)#\w+/,
    hashTagsArr = str.split(' ').filter(function (str) {
      return PATTERN.test(str);
    });
  let uniqueHashtag = [...new Set(hashTagsArr)];
  return new Promise((resolve, reject) => {
    uniqueHashtag ? resolve(uniqueHashtag) : reject(uniqueHashtag);
  });
}

/************************************************************
 *              helper method to add hours
 ************************************************************/

function addHoursToDate(hours: number) {
  let expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + hours);
  return expiryDate;
}

/************************************************************
 * helper method to compare input with existing harshtag
 ************************************************************/
async function compareArrayReturnDiff(arr1: string[], arr2: string[]) {
  let notExist: any;
  let existing: any;
  console.log('step1', arr1, arr2);

  if (arr1.length > arr2.length) {
    notExist = arr1.filter((val) => !arr2.includes(val));
    existing = arr1.filter((val) => arr2.includes(val));
    console.log('step2', notExist, existing);
  } else {
    notExist = arr2.filter((val) => !arr1.includes(val));
    existing = arr2.filter((val) => arr1.includes(val));
    console.log('step3', notExist, existing);
  }
  let result = { notExist, existing };
  return new Promise((resolve, reject) => {
    result ? resolve(result) : reject(result);
  });
}

/************************************************************
 * helper method to increment count of hashtag if they exist
 ************************************************************/
async function incrementHashtagCount(existingHashtag: any) {
  let output: any = [];
  let resultData: any = {
    acknowledged: false,
    modifiedCount: 0,
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 0,
  };
  let currentData = await Hashtag.find();
  currentData.map(async (val: any, index: number) => {
    if (existingHashtag.includes(val.hashtag)) {
      if (Date.now() >= val.expiryDate) {
        let newExpiryDate = addHoursToDate(3);
        let result = await Hashtag.updateOne(
          { _id: val._id },
          {
            $set: { totalCount: val.totalCount + 1, hourlyCount: 0 + 10, expiryDate: newExpiryDate },
          },
        );
        resultData.modifiedCount = +result.modifiedCount;
        resultData.matchedCount = +result.matchedCount;
        resultData.acknowledged = result.acknowledged;
      } else {
        let result = await Hashtag.updateOne(
          { _id: val._id },
          { $set: { totalCount: val.totalCount + 1, hourlyCount: val.hourlyCount + (1*10) } },
        );
        resultData.modifiedCount = +result.modifiedCount;
        resultData.matchedCount = +result.matchedCount;
        resultData.acknowledged = result.acknowledged;
      }
    }
  });
  return new Promise((resolve, reject) => {
    output ? resolve(resultData) : reject(output);
  });
}

/************************************************************
 *           Create Hashtag Main Method
 ************************************************************/
export async function createHashtag(data: string) {
  let newHashtagRes;
  let hashtagArr: any = await extractHashtag(data);
  let detectedTag: any = await Hashtag.find({ hashtag: { $in: hashtagArr } });
  let mapData = detectedTag.map((val: any) => val.hashtag);
  let newHashtag: any = await compareArrayReturnDiff(hashtagArr, mapData);

  if (newHashtag['notExist'].length > 0) {
    newHashtagRes = await createNewHashtag(newHashtag['notExist']);
  }

  let dataResponse;
  if (detectedTag.length > 0) {
    dataResponse = await incrementHashtagCount(mapData);
  }
  return hashtagArr;
}

/************************************************************
 *           Get top 6 Hashtag Main Method
 ************************************************************/

export async function getTrendingHashtagwithTweet() {
  let trendingHashtag = await Hashtag.find().sort({ hourlyCount: -1 });
  let hashtagArr = trendingHashtag.map((val) => val.hashtag);
  let trending = hashtagArr.reduce((a, v) => ({ ...a, [v]: [] }), {});

  let data: any;
  data = await CreateTweetCln.find({ hashtag: { $in: hashtagArr } });


  // { $project : {
  //   // 'totalA' : '$totalA',
  //   // 'totalB' : '$totalB',
  //   // 'totalSum' : { '$add' : [ '$totalA', '$totalB' ] }
  //  }

  data.map((val: any) => {
    for (let i = 0; i < val.hashtag.length; i++) {
      if (hashtagArr.includes(val.hashtag[i])) {
        for (let x = 0; x < val.hashtag.length; x++) {
          trending[val.hashtag[i]].push(val)
          // trending[val.hashtag[i]].push(val)
        }
      }
    }
  });
  return new Promise((resolve, reject) => {
    hashtagArr ? resolve({ trending }) : reject(hashtagArr);
  });
}

export async function getTrendingHashtagWithTweetCount() {
  let trendingHashtag = await Hashtag.find().sort({ hourlyCount: -1 });
  let hashtagArr = trendingHashtag.map((val) => val.hashtag);
  let trending = hashtagArr.reduce((a, v) => ({ ...a, [v]: 0 }), {});

  let data: any;
  data = await CreateTweetCln.find({ hashtag: { $in: hashtagArr } });

  data.map((val: any) => {
    for (let i = 0; i < val.hashtag.length; i++) {
      if (hashtagArr.includes(val.hashtag[i])) {
        trending[val.hashtag[i]] = trending[val.hashtag[i]] + 1;
        console.log(trending[val.hashtag[i]]);
      }
    }
  });
  console.log(trendingHashtag);
  return new Promise((resolve, reject) => {
    hashtagArr ? resolve({ trending }) : reject(hashtagArr);
  });
}
