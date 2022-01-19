import { Request, Response, NextFunction } from 'express';

export default (validator: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    
    const { error } = validator(req.body);

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message.split('"').join(''),
      });
    }
    next();
  };
};
