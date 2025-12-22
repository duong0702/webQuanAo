import mongoose from "mongoose";

const clothesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    color: {
      type: [String],
      default: [],
    },

    type: {
      type: String,
      enum: ["hoodie", "polo", "jacket", "t-shirt", "pant", "short"],
      required: true,
    },

    size: {
      type: [String],
      enum: ["s", "m", "l", "xl"],
      required: true,
    },

    mainImage: {
      type: String,
      required: true,
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        isMain: {
          type: Boolean,
          default: false,
        },
      },
    ],

    description: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: [String],
      enum: ["new", "hot", "sale", "limited"],
      default: [],
    },
  },
  { timestamps: true }
);

const ClothesModel =
  mongoose.models.Clothes || mongoose.model("Clothes", clothesSchema);
export default ClothesModel;
export { clothesSchema };
