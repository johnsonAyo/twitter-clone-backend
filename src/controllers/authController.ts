import { Request, Response, NextFunction, response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModels';
import { ISign } from '../utils/interfaces/userInterface';
import catchAsync from '../utils/catchAsync';
import ErrorHandler from '../utils/appError';


const generateToken = (email: string) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
  });

  const token = generateToken(newUser._id);

  res.status(201).json({
    status: 'successful!',
    token,
    data: {
      newUser,
    },
  });
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //check if user submitted email and password
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler(401, 'Please provide email and password'));
  }

  //check if user with the email exists
  const user: ISign | null = await User.findOne({ email: req.body.email }).select('+password');
  if (!user) {
    return next(new ErrorHandler(401, 'invalid login credentials'));
  }
  //Check if password is correct
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return next(new ErrorHandler(401, 'invalid login credentials'));
  }

  //Generate token for user
  const token = generateToken(user.email);
  res.status(201).json({
    status: 'Login successful!',
    token,
    user,
  });
});
