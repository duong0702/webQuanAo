import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Clothes from "../models/Clothes.js";
import { connectDB } from "../config/db.js";

/**
 * Sanitize image URLs in the Clothes collection
 * Fixes cases where URLs are concatenated (e.g., "url1://...url2://...")
 */
const sanitizeImages = async () => {
  try {
    await connectDB();
    console.log("🔍 Starting image sanitization...");

    const allClothes = await Clothes.find();
    let updated = 0;

    for (const item of allClothes) {
      let needsUpdate = false;
      let cleanedImage = item.image;
      let cleanedImages = [...(item.images || [])];

      // Sanitize single image field
      if (item.image && typeof item.image === "string") {
        const urls = item.image.split("://");
        if (urls.length > 2) {
          // Multiple "://" detected — likely concatenated URLs
          // Reconstruct by keeping only the first valid URL
          cleanedImage = urls[0] + "://" + urls[1];
          console.log(`  ⚠️  Fixed malformed image for "${item.name}"`);
          console.log(`      From: ${item.image.substring(0, 80)}...`);
          console.log(`      To:   ${cleanedImage}`);
          needsUpdate = true;
        }
      }

      // Sanitize images array
      if (item.images && Array.isArray(item.images)) {
        cleanedImages = item.images.map((img) => {
          if (typeof img === "string") {
            const urls = img.split("://");
            if (urls.length > 2) {
              const fixed = urls[0] + "://" + urls[1];
              console.log(
                `  ⚠️  Fixed malformed image in array for "${item.name}"`
              );
              return fixed;
            }
          }
          return img;
        });
        if (JSON.stringify(cleanedImages) !== JSON.stringify(item.images)) {
          needsUpdate = true;
        }
      }

      // Update if needed
      if (needsUpdate) {
        await Clothes.updateOne(
          { _id: item._id },
          {
            image: cleanedImage,
            images: cleanedImages,
          }
        );
        updated++;
      }
    }

    console.log(`\n✅ Sanitization complete! Updated ${updated} items.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Sanitization failed:", err.message);
    process.exit(1);
  }
};

sanitizeImages();
