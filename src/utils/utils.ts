import fs from 'fs';
import path from 'path';
import Joi, { Err } from 'joi';
import { Mongoose } from 'mongoose';
import multer from 'multer';

export interface books {
  id?: string;
  name: string;
  isPublished: Boolean;
  datePublished: Date | null;
  serialNumber: number | null;
}
export interface author {
  id?: number;
  author: string;
  dateRegistered: Date;
  age: number;
  address: string;
  books: books[];
}
export interface LoginInt {
  email: string;
  password: string;
}

export interface errInt extends Mongoose {
  err: string;
}

interface reqObj extends Request {
  token: string;
}

const filePath = path.join(__dirname, '../../database.json');

export const readFile = () => {
  try {
    const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

export function generateIdsForBooks(booksData: books[]): books[] {
  return booksData.map((book: books, idx) => {
    return { id: `book${idx + 1}`, ...book };
  });
}

export const validateEntry = (data: author) => {
  const schema = Joi.object({
    author: Joi.string(),
    age: Joi.number(),
    address: Joi.string(),
    books: Joi.array(),
  }).unknown();
  return schema.validate(data);
};

export const validateLogin = (data: LoginInt) => {
  const schema = Joi.object({
    email: Joi.string().required,
    password: Joi.string().required,
  }).unknown();

  return schema.validate(data);
};

export const writeFile = (data: author[]) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 3));
};

export const multerJs = () => {
  const upload = multer({
    fileFilter: (req, file, cb) => {
      const fileFormat = ['jpg', 'jpeg', 'png'];
      const filename = file.filename.split('.');
      const fileExtension = filename[filename.length - 1];

      if (fileFormat.includes(fileExtension)) return cb(null, true);
      return cb(null, false);
    },
  }).single('profilePicture');

  return { upload }
};
