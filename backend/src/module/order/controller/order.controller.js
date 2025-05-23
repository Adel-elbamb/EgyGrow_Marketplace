import { asyncHandler } from "../../../utils/asyncHandler.js";
import Product from "../../../../DB/models/product.model.js";
import couponModel from "../../../../DB/models/coupon.model.js";
import orderModel from "../../../../DB/models/order.model.js";

export const createOrder = asyncHandler(async (req, res, next) => {
  const order = req.body;

  const productIds = order.products.map((prod) => prod.productId);
  const products = await Product.find({ _id: { $in: productIds } });

  if (products.length !== productIds.length) {
    return next(new Error("Some products not found", { cause: 400 }));
  }

  let totalprice = 0;
  for (let item of order.products) {
    const product = products.find(
      (prod) => prod._id.toString() === item.productId
    );
    if (product) {
      totalprice += product.price * item.quantity;
    }
  }

  const coupon = await couponModel.findOne({ code: order.couponCode });
  const couponValidation =
    (coupon.expirationDate > new Date() && coupon.isActive) || false;

  if (couponValidation) {
    totalprice = totalprice * ((100 - coupon.discountPercentage) / 100);
  }

  const newOrder = await orderModel.create({
    customerInfo: order.customerInfo,
    products: order.products,
    totalAmount: totalprice,
    couponCode: couponValidation ? order.couponCode : null,
    paymentMethod: order.paymentMethod,
  });

  res.status(200).json({ message: newOrder });
});
