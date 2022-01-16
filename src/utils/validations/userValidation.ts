import Joi from 'joi';
import { ISign } from '../interfaces/userInterface';


export const validateSignup = (user: ISign) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  });
  return schema.validate(user);
};



