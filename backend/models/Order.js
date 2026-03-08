import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: String, // snapshot of product name
    size: String,
    quantity: Number,
    price: Number, // snapshot price
    image: String, // snapshot image
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [orderItemSchema],

    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,

    status: {
      type: String,
      enum: ["processing", "shipped", "delivered"],
      default: "processing",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
