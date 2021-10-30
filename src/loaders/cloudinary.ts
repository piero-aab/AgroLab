import {cloudinarykeys} from '../config/key'
// import cloudinary from 'cloudinary';
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: cloudinarykeys.CLOUDINARY_CLOUD_NAME,
  api_key: cloudinarykeys.CLOUDINARY_API_KEY,
  api_secret: cloudinarykeys.CLOUDINARY_API_SECRET
})

export default cloudinary;