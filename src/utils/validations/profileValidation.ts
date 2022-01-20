import Joi from 'joi';
import { IProfile } from '../interfaces/profileInterface';

export const profileValidator = (profile: IProfile) => {
  const schema = Joi.object({
    name: Joi.string().min(3),
    bio: Joi.string().min(7),
  });
  return schema.validate(profile);
};
