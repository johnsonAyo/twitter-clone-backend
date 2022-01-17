import express,{ NextFunction, Response, Request} from 'express';
import Joi from 'joi';

export const getFollowerPolicy = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      userId: Joi.string().min(24).max(24).required(),
    //   pageno: Joi.number().max(255).required(),
    });
    const { userId} = req.params;
    const { error }: any = schema.validate({ userId});
    if (error) {
      return res.status(500).json({ message: error.details[0].message.split('"').join("") });
    }
    return next();
  };
export const postFollowerPolicy = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      userId: Joi.string().min(24).max(24).required(),
      followId: Joi.string().min(24).max(24).required(),
    //   pageno: Joi.number().max(255).required(),
    });
    const {followId, userId} = req.body;
    const { error }: any = schema.validate({followId, userId});
    if (error) {
      return res.status(500).json({ message: error.details[0].message.split('"').join("") });
    }
    return next();
  };

  export const unFollowPolicy = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      userId: Joi.string().min(24).max(24).required(),
      followId: Joi.string().min(24).max(24).required(),
    //   pageno: Joi.number().max(255).required(),
    });
    const {followId, userId} = req.body;
    const { error }: any = schema.validate({followId, userId});
    if (error) {
      return res.status(500).json({ message: error.details[0].message.split('"').join("") });
    }
    return next();
  };