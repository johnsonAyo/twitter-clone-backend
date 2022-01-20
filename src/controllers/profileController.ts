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
        const profile = await Profile.findOne({ user: req.user.id });
        if (!profile) return next(new ErrorHandler(500, 'Profile does not exist'));
        const file = await cloudinaryImage.uploader.upload(path as string);
        await profile.update({ profilePicture: file.url });
        const updateProfile = await Profile.findOne({ user: req.user.id });
        return res.status(201).json({
          status: 'successful!',
          profile: updateProfile,
        });
      } catch (error: any) {
        next(new ErrorHandler(500, error.message));
      }
    });
  },
);

export const createProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const profile = await Profile.findOne({ user: req.user.id });
  if (profile) return next(new ErrorHandler(400, 'User can not create multiple profiles'));
  const newProfile = await Profile.create({
    user: req.user.id,
    name: req.body.name,
    bio: req.body.bio,
  });

  return res.status(201).json({
    status: 'successful!',
    data: { newProfile },
  });
});

export const updateProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const profile = await Profile.findOne({ user: req.user.id });
  if (!profile) return next(new ErrorHandler(404, 'profile does not exist'));
  await profile.update({
    name: req.body.name || profile.name,
    bio: req.body.bio || profile.bio,
  });
  const updateProfile = await Profile.findOne({ user: req.user.id });
  return res.status(201).json({
    status: 'successful!',
    profile: updateProfile,
  });
});

export const userProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const profile = await Profile.findOne({ user: req.user.id });
  return res.status(201).json({
    status: 'successful!',
    profile,
  });
})
