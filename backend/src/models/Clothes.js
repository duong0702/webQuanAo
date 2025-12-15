import mongoose from "mongoose";

const clothesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: [String], required: true },

    type: {
      type: String,
      enum: ["hoodie", "polo", "shirt", "pant", "short"],
      required: true,
    },

    size: {
      type: [String],
      enum: ["s", "m", "l", "xl"],
      required: true,
    },

    images: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const ClothesModel =
  mongoose.models.Clothes || mongoose.model("Clothes", clothesSchema);
export default ClothesModel;
export { clothesSchema };
