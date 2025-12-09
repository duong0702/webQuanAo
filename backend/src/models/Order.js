import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        clothesId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Clothes",
        },
        title: String,
        price: Number,
        quantity: Number,
      },
    ],
    shippingAddress: String,
    totalPrice: Number,
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipping", "done"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
export { orderSchema };
