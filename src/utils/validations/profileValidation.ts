import Joi from 'joi';
import { ISign } from '../interfaces/userInterface';

export const profileValidator = (profile: ISign) => {
  const schema = Joi.object({
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),
  profilePic: Joi.string().required(),
  bioData: Joi.string().required(),
  });
  return schema.validate(profile);
};
