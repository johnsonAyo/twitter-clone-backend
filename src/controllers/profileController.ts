import { Request, Response, NextFunction, response } from 'express';
import multer from 'multer';
import Profile from '../models/profileModel';
import catchAsync from '../utils/catchAsync';
import { multerJs } from '../utils/utils';

const { upload } = multerJs();

export const uploadProfilePicture = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return next(err);
      } else if (err) {
        return next(err);
      }

      return res.json(req.file);
    });
  },
);

export const createProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const newProfile = await Profile.create({
    name: req.body.name,
    bio: req.body.bio,
    location: req.body.location,
    birthday: req.body.birthday,
    website: req.body.website,
  });

  return res.status(201).json({
    status: 'successful!',
    data: { newProfile },
  });
});
