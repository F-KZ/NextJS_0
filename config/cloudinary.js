import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_KEY_API,
   // api_secret : process.env.CLOUDINARY_KEY_SECRET
})

export default cloudinary