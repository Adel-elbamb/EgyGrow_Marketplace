import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    customerInfo: {
      fullname: {
        type: String,
        required: [true, "Full name is required"],
        minlength: [12, "Minimum length is 3 characters"],
        maxlength: [50, "Maximum length is 50 characters"],
      },
      address: {
        type: String,
        minlength: [12, "Minimum length is 3 characters"],
        maxlength: [50, "Maximum length is 50 characters"],
      },
      mobileNumber: {
        type: String,
        required: [true, "mobileNumber required"],
      },
      Government: {
        type: String,
      },
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: true,
          min: [0, "Price cannot be negative"],
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: [0, "Total amount cannot be negative"],
    },
    couponCode: {
      type: String,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["CashOnDelivery", "Company", "e-wallet"],
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
      required: true,
    },
    statusHistory: [
      {
        status: {
          type: String,
          enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
          required: true,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// Middleware to update status history
orderSchema.pre("save", function (next) {
  if (this.isModified("orderStatus")) {
    this.statusHistory.push({
      status: this.orderStatus,
      updatedAt: new Date(),
    });
  }
  next();
});

export default mongoose.model("Order", orderSchema);
