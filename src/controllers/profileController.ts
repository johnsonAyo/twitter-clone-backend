import { Request, Response, NextFunction, response } from 'express';
import multer from 'multer';
import Profile from '../models/profileModel';
import catchAsync from '../utils/catchAsync';
import cloudinary from 'cloudinary';
import ErrorHandler from '../utils/appError';
import imageMulter from '../utils/tweet_utils/multerImageUpload';
import cloudinaryImage from '../utils/tweet_utils/cloudinaryImageStorage';
import userModels from '../models/userModels';

const upload = imageMulter.single('profilePicture');

export const uploadProfilePicture = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return next(new ErrorHandler(500, err.message));
      } else if (err) {
        return next(new ErrorHandler(500, err.message));
      }

      const path = req.file?.path;
      try {
        const file = await cloudinaryImage.uploader.upload(path as string);
        const profile = await Profile.findOne({ _id: req.params.id });
        if (!profile) return next(new ErrorHandler(500, err.message));
        await profile.update({ profilePicture: file.url });
        return res.status(201).json({
          status: 'successful!',
          profile,
        });
      } catch (error: any) {
        next(new ErrorHandler(500, error.message));
      }
    });
  },
);

export const createProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userModels.findById(req.params.id);
  if (!user) return next(new ErrorHandler(404, 'User not found'));
  const newProfile = await Profile.create({
    user: user.id,
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

export const updateProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const profile = await Profile.findById(req.params.id);
  await profile?.update({
    name: req.body.name || profile.name,
    bio: req.body.bio || profile.bio,
    location: req.body.location || profile.location,
    birthday: req.body.birthday || profile.birthday,
    website: req.body.website || profile.website,
  });
  return res.status(201).json({
    status: 'successful!',
    profile,
  });
});
