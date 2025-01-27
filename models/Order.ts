import mongoose, {
  Schema,
  model,
  models,
  mongo,
} from "mongoose";
import {
  ImageVariant,
  ImageVariantType,
} from "./Product";

export interface IOrder {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId | PopulatedUser;
  productId:
    | mongoose.Types.ObjectId
    | PopulatedProduct;
  variant: ImageVariant;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  downloadUrl?: string;
  previewUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PopulatedUser {
  _id: mongoose.Types.ObjectId;
  email: string;
}

interface PopulatedProduct {
  _id: mongoose.Types.ObjectId;
  name: string;
  imageUrl: string;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    variant: {
      type: {
        type: String,
        required: true,
        enum: [
          "SQUARE",
          "WIDE",
          "PORTRAIT",
        ] as ImageVariantType[],
        set: (v: string) => v.toUpperCase(),
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      license: {
        type: String,
        required: true,
        enum: ["personal", "commercial"],
      },
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    downloadUrl: {
      type: String,
    },
    previewUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order =
  models?.Order ||
  model<IOrder>("Order", orderSchema);

export default Order;
