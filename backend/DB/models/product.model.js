
import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name required"],
      min: [3, "minimum length 3 char"],
      max: [20, "max length 20 char"],
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "description required"],
      min: [3, "minimum length 3 char"],
      max: [1000, "max length 1000 char"],
    },
    price: {
      type: Number,
      required: [true, "price required"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity required"],
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: [true, "categoryId required"],
    },
    images: {
      type: [String],
      validate: {
        validator: function (array) {
          return array.every((url) => typeof url === "string");
        },
        message: "Each image must be a URL string",
      },
      default: [],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);
export default Product;
