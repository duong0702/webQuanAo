import mongoose from "mongoose";
import Clothes from "../src/models/Clothes.js";
import dotenv from "dotenv";

dotenv.config();

async function fixClothesDescription() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Kết nối MongoDB thành công");

    const result = await Clothes.updateMany(
      { description: { $exists: false } },
      { $set: { description: "" } }
    );

    console.log(`✅ Đã sửa ${result.modifiedCount} sản phẩm cũ`);
    console.log(`ℹ️  Tất cả description đều là "" giờ`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
    process.exit(1);
  }
}

fixClothesDescription();
