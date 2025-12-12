import dotenv from "dotenv";
dotenv.config();

import cloudinary from "./utils/cloudinary.js";

async function testUpload() {
  try {
    const result = await cloudinary.uploader.upload(
      "https://example.com/your-image.jpg"
    );
    console.log("Upload success:", result.secure_url);
  } catch (err) {
    console.error("Upload error:", err);
  }
}

testUpload();
