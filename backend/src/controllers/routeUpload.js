// src/controller/routeUpload.js
import express from "express";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

// ----- Multer setup (form-data file) -----
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ----- POST /upload -----
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    let result;

    // 1️⃣ Nếu gửi file (form-data)
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
      fs.unlinkSync(req.file.path); // xóa file tạm
    }
    // 2️⃣ Nếu gửi Base64 (raw JSON)
    else if (req.body.imageBase64) {
      const image = req.body.imageBase64;
      const matches = image.match(/^data:(.+);base64,(.+)$/);
      if (!matches) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Base64 image" });
      }
      const ext = matches[1].split("/")[1];
      const buffer = Buffer.from(matches[2], "base64");
      const filePath = path.join(uploadDir, `${Date.now()}.${ext}`);
      fs.writeFileSync(filePath, buffer);

      result = await cloudinary.uploader.upload(filePath);
      fs.unlinkSync(filePath);
    }
    // 3️⃣ Nếu gửi link ảnh URL
    else if (req.body.imageUrl) {
      const imageUrl = req.body.imageUrl;
      result = await cloudinary.uploader.upload(imageUrl);
    }
    // Không có gì cả
    else {
      return res
        .status(400)
        .json({ success: false, message: "No image provided" });
    }

    res.status(200).json({
      success: true,
      message: "Uploaded successfully!",
      data: result,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
