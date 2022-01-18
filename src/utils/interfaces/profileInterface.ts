import { ObjectId } from "mongoose";

export interface IProfile {
    name: string;
    bio: string;
    location: string;
    birthday: Date;
    website: string;
    profilePicture: string;
    user: string | ObjectId;
}