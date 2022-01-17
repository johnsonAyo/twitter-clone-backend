import mongoose from 'mongoose';

export interface ISign extends mongoose.Document {
  name: string;
  profilePic: string;
  bioData: string;
  email: string;
  password: string;
  isActive: boolean;
  provider: string;
}
