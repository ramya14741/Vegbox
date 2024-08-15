import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as cloudinary from 'cloudinary';
const dotenv = require('dotenv');
dotenv.config();

// Define a type for the 'params' property
interface CustomParams  {
  folder: string;
  allowed_formats: string[];
}

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Use the custom 'params' type
export const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  } as CustomParams, // Cast to the custom type
});
