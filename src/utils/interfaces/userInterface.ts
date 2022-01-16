import mongoose from 'mongoose';

export interface ISign extends mongoose.Document {
  email: string;
  password: string;
}
