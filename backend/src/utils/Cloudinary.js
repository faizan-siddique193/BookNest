import { v2 as cloudinary } from "cloudinary";

console.log("Api Secret:: ", process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (fileUri) => {
  try {
    if (!fileUri) return null;

    const response = await cloudinary.uploader.upload(fileUri, {
      resource_type: "auto",
    });

    //   file has been upload on cloudinary
    console.log("File is uploaded on cloudinary:: Url:: ", response.url);

    return response;
  } catch (error) {
    console.log("Cloudinary Error:: ", error);
    return null;
  }
};

export { uploadOnCloudinary };
