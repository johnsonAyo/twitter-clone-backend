import { ObjectId } from 'mongoose';

export interface IProfile {
  name: string;
  bio: string;
  profilePicture: string;
  user: string | ObjectId;
}
