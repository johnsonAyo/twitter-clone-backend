import { IProfile } from '../utils/interfaces/profileInterface';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const ProfileSchema: mongoose.Schema<IProfile> = new mongoose.Schema({
    name: {type: String},
    bio: {type: String, default: ''},
    location: {type: String, default: ''},
    birthday: Date,
    website: {type: String, default: ''},
    profilePicture: {type: String, default: ''},
    user: { ref: 'User', type: mongoose.Types.ObjectId },
}, { timestamps: true });

export default mongoose.model<IProfile>('Profile', ProfileSchema);
