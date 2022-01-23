import Joi from 'joi';

interface tweetIn {
  messageBody: string;
  tweetImage: string;
  whoCanReply: string;
}

export const tweetValidate = (data: tweetIn) => {
  let tweetSchema = Joi.object({
    messageBody: Joi.string()
      .trim()

      .required()
      .error(new Error('Message body must not not be null and the max words is 140')),
    whoCanReply: Joi.string()
      .required()
      .error(new Error('Provide who can reply. It can not be null')),
    tweetImage: Joi.string(),
  });

  return tweetSchema.validate(data);
};
