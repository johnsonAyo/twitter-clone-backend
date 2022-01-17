import { Request, Response, NextFunction, response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModels';
import { ISign } from '../utils/interfaces/userInterface';
import catchAsync from '../utils/catchAsync';
import ErrorHandler from '../utils/appError';
import sendEmail from '../utils/email';

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
  await sendEmail(newUser.email);
  res.status(200).json({
    status: 'success',
    message: 'Token sent to email',
  });
  
});


export const confirmEmail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const emailToken: any = jwt.verify(
    req.params.token as string,
    process.env.JWT_EMAIL_KEY as string,
  );
  if(!emailToken){
    return next(new ErrorHandler(401, 'Invalid Token. Please SignUp!'));
  }
  //console.log(decodedToken)
  const data = await User.findOne({email: emailToken.email})
  if(!data){
    return next(new ErrorHandler(401, 'We were unable to find a user for this verification. Please SignUp!'));
  }else{
    data.isActive = true;
    await data.save()
  }
  
  //await User.updateOne({ isActive: emailToken.isActive }, isActive: true, { new: true});

  return res.redirect('back');
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

  if (!user.isActive) {
    await sendEmail(user.email);
    return next(new ErrorHandler(401, 'A mail has been sent to you. Please confirm email to login'));
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

export const protectRoute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorHandler(401, 'You are not authorized! 🚨'));
  }

  const decodedToken: any = jwt.verify(token as string, process.env.JWT_SECRET_KEY as string);
  const user = await User.findOne({ email: decodedToken.email });
  req.user = user;
  next();
});
