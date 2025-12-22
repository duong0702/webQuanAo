import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// UPLOAD using memory buffer
export const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "clothes",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};

// DELETE old image by URL
export const deleteFromCloudinary = async (url) => {
  if (!url) return;

  try {
    const publicId = url.split("/").pop().split(".")[0];
    return await cloudinary.uploader.destroy(`clothes/${publicId}`);
  } catch (err) {
    console.error("❌ Delete Cloudinary error:", err.message);
  }
};
