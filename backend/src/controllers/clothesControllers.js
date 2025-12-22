import {
  getAllClothesService,
  updateClothesService,
  deleteClothesService,
} from "../services/CRUDservices.js";
import { createClothesWithImages } from "../services/clothes.service.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import Clothes from "../models/Clothes.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
const getAllClothes = async (req, res) => {
  try {
    console.log("getAllClothes called from", req.ip, req.headers["user-agent"]);
    console.log("Query params:", req.query);

    const { type, status, search, minPrice, maxPrice } = req.query;
    const filter = {};

    // 🔥 Hỗ trợ lọc nhiều loại: ?type=t-shirt&type=polo&type=hoodie&type=jacket
    if (type) {
      const types = Array.isArray(type) ? type : type.split(",");
      filter.type = { $in: types };
    }

    // Hỗ trợ lọc status (new, hot, sale, limited)
    if (status) {
      const statuses = Array.isArray(status) ? status : status.split(",");
      filter.status = { $in: statuses };
    }

    // Search by name
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const clothes = await Clothes.find(filter).sort({ createdAt: -1 }).lean();
    const shirtCount = await Clothes.countDocuments({
      type: { $in: ["hoodie", "polo", "jacket", "t-shirt"] },
    });
    const pantCount = await Clothes.countDocuments({
      type: { $in: ["pant", "short"] },
    });
    // If no clothes found, return empty array gracefully
    return res
      .status(200)
      .json({ clothes: clothes || [], shirtCount, pantCount });
  } catch (error) {
    console.error("Lỗi khi gọi getAllClothes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const getClothesById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid clothes ID" });
    }

    const clothes = await Clothes.findById(id).lean();

    if (!clothes) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔥 FIX CHO SẢN PHẨM CŨ - nếu có image field mà không có images array
    if ((!clothes.images || clothes.images.length === 0) && clothes.image) {
      clothes.images = [
        {
          url: clothes.image,
          isMain: true,
        },
      ];
    }

    // 🔥 FIX images dạng string[] thành object array
    if (
      Array.isArray(clothes.images) &&
      clothes.images.length > 0 &&
      typeof clothes.images[0] === "string"
    ) {
      clothes.images = clothes.images.map((url, index) => ({
        url,
        isMain: index === 0,
      }));
    }

    res.status(200).json(clothes);
  } catch (error) {
    console.error("Lỗi khi gọi getClothesById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createClothes = async (req, res) => {
  try {
    console.log("🔵 CREATE CLOTHES REQUEST");
    console.log("FILES:", req.files?.length, "| BODY:", Object.keys(req.body));

    // Upload files lên Cloudinary
    if (!req.files || req.files.length === 0) {
      console.error("❌ No files provided");
      return res.status(400).json({ message: "No images uploaded" });
    }

    console.log("Starting Cloudinary upload for", req.files.length, "files");

    const uploadToCloudinary = (file) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "clothes",
            quality: "auto",
            fetch_format: "auto",
            timeout: 60000,
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.on("error", (err) => {
          console.error("Stream error:", err);
          reject(err);
        });

        stream.end(file.buffer);
      });

    const results = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file))
    );

    const uploadedImages = results.map((r, index) => ({
      url: r.secure_url,
      isMain: index === 0,
    }));

    console.log("✅ All images uploaded");

    // Properly parse arrays from form data
    const parseArrayField = (field) => {
      if (!field) return [];
      return Array.isArray(field) ? field : [field];
    };

    const clothesData = {
      name: req.body.name?.trim() || "",
      price: Number(req.body.price),
      type: req.body.type,
      color: parseArrayField(req.body.color),
      size: parseArrayField(req.body.size),
      status: parseArrayField(req.body.status),
      images: uploadedImages,
      mainImage: uploadedImages[0]?.url || "",
      description: req.body.description?.trim() || "",
    };

    const newClothes = await Clothes.create(clothesData);

    console.log("✅ Clothes created:", newClothes._id);
    res.status(201).json(newClothes);
  } catch (err) {
    console.error("❌ Create clothes error:", err.message);

    if (err.errors) {
      console.error("Validation errors:");
      Object.keys(err.errors).forEach((field) => {
        console.error(`  ${field}:`, err.errors[field].message);
      });
    }

    // Handle MongoDB validation errors
    if (err.name === "ValidationError") {
      const errorMessages = Object.keys(err.errors).map((field) => {
        const error = err.errors[field];
        return `${field}: ${error.message}`;
      });
      return res.status(400).json({
        message: "Validation failed",
        details: errorMessages,
      });
    }

    // Handle duplicate key errors
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Duplicate key error",
        details: Object.keys(err.keyValue),
      });
    }

    res.status(500).json({
      message: "Create clothes failed: " + err.message,
    });
  }
};

const updateClothes = async (req, res) => {
  try {
    const id = req.params.id;

    const body = req.body;

    const parseArray = (field) => {
      if (!field) return [];
      return Array.isArray(field) ? field : [field];
    };

    // ================== Get old images client gửi ==================
    const oldMainImage = body.oldMainImage || null;
    const oldDetailImages = parseArray(body.oldDetailImages);

    // ================== Upload ảnh mới ==================
    let newUploads = [];
    if (req.files && req.files.length > 0) {
      newUploads = await Promise.all(
        req.files.map((f) => uploadToCloudinary(f))
      );
    }

    // newUploads = array secure_url luôn theo thứ tự

    let newMainImageUrl = null;
    let newDetailImagesUrl = [];

    if (newUploads.length > 0) {
      // 👉 phần tử đầu tiên luôn là ảnh main
      newMainImageUrl = newUploads[0].secure_url;

      // 👉 các phần tử sau là ảnh detail
      newDetailImagesUrl = newUploads.slice(1).map((u) => u.secure_url);
    }

    // ================= HANDLE MAIN =================

    let finalMainImage = oldMainImage;

    if (newMainImageUrl) {
      // xoá main cũ nếu có
      if (oldMainImage) await deleteFromCloudinary(oldMainImage);

      finalMainImage = newMainImageUrl;
    }

    // ================= HANDLE DETAIL =================

    // tìm ảnh detail cũ bị xoá (client không gửi lại)
    let removedOldDetails = [];

    const existingDoc = await Clothes.findById(id);

    const existingDetailImages = existingDoc.images
      .filter((i) => !i.isMain)
      .map((i) => i.url);

    removedOldDetails = existingDetailImages.filter(
      (img) => !oldDetailImages.includes(img)
    );

    // xoá cloudinary ảnh đó
    await Promise.all(
      removedOldDetails.map((url) => deleteFromCloudinary(url))
    );

    // detail mới = ảnh cũ còn lại + ảnh mới upload
    const finalDetailImages = [...oldDetailImages, ...newDetailImagesUrl];

    // ================ BUILD FINAL IMAGE ARRAY =================

    const finalImages = [
      { url: finalMainImage, isMain: true },
      ...finalDetailImages.map((url) => ({ url, isMain: false })),
    ];

    // ================= UPDATE DB =================

    const updateData = {
      name: body.name?.trim(),
      price: Number(body.price),
      type: body.type,
      description: body.description || "",
      color: parseArray(body.color),
      size: parseArray(body.size),
      status: parseArray(body.status),
      mainImage: finalMainImage,
      images: finalImages,
    };

    const updated = await Clothes.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return res.status(200).json(updated);
  } catch (err) {
    console.error("❌ UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

const deleteClothes = async (req, res) => {
  try {
    const deleted = await deleteClothesService(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Clothes not found" });
    }
    res.status(200).json({ message: "Clothes deleted successfully" });
  } catch (error) {
    console.error("Lỗi khi gọi DeleteClothes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const searchClothes = async (req, res) => {
  try {
    const { type, status } = req.query;

    const query = {};

    if (type) {
      query.type = type;
    }

    if (status) {
      query.status = { $in: [status] };
    }

    const clothes = await Clothes.find(query).sort({ createdAt: -1 }).lean();

    res.status(200).json({
      total: clothes.length,
      clothes,
    });
  } catch (error) {
    console.error("Lỗi khi search clothes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getAllClothes,
  createClothes,
  updateClothes,
  deleteClothes,
  getClothesById,
  searchClothes,
};
