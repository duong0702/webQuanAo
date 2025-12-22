import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "../config/db.js";
import Clothes from "../models/Clothes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const migrate = async () => {
  try {
    await connectDB();

    const clothes = await Clothes.find({
      $or: [{ mainImage: { $exists: false } }, { mainImage: "" }],
    });

    console.log("🔍 Found items to migrate:", clothes.length);

    for (const item of clothes) {
      const mainImage =
        item.mainImage ||
        item.image ||
        (Array.isArray(item.images) && item.images.length > 0
          ? item.images[0]
          : "");

      if (!mainImage) continue;

      item.mainImage = mainImage;
      item.images =
        Array.isArray(item.images) && item.images.length
          ? item.images
          : [mainImage];

      item.image = undefined;

      await item.save();
    }

    console.log("✅ Migration mainImage DONE");
    process.exit();
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
};

migrate();
