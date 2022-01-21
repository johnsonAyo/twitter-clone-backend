import Joi from 'joi';
import { ISign } from '../interfaces/userInterface';

export const profileValidator = (profile: ISign) => {
  const schema = Joi.object({
    name: Joi.string().min(3),
    bioData: Joi.string().min(7),
  });
  return schema.validate(profile);
};
