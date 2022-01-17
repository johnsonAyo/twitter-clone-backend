const cloudinaryImage = require('cloudinary');

import dotenv from 'dotenv';

dotenv.config();

cloudinaryImage.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default cloudinaryImage;
