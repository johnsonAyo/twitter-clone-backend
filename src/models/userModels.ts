import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { ISign } from '../utils/interfaces/userInterface';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide your email address'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
  },
});

UserSchema.pre<ISign>('save', async function (next) {
  const user = this;
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

UserSchema.methods.confirmPassword = async function (userPassword: string) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

export default mongoose.model<ISign>('User', UserSchema);
