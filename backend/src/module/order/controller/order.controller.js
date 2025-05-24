import { asyncHandler } from "../../../utils/asyncHandler.js";
import Product from "../../../../DB/models/product.model.js";
import couponModel from "../../../../DB/models/coupon.model.js";
import orderModel from "../../../../DB/models/order.model.js";
import AppError from "../../../utils/AppError.js";
import { sendEmail } from "../../../utils/sendEmail.js";

// create new order
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

  await sendEmail(
    "ao268314@gmail.com",
    "New Order Created",
    `<p>New order ${newOrder} placed with total: ${totalprice.toFixed(2)}</p>`
  );

  res.status(200).json({ message: newOrder });
});

// get all orders
export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await orderModel.find();

  if (!orders || orders.length === 0) {
    return next(new AppError("No orders found", 404));
  }

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});

// get order by id
export const getOrderById = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId);
  if (!order) {
    return next(new AppError("order not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

// update order status
export const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  const allowedStatuses = ["Pending", "Shipped", "Delivered", "Cancelled"];
  if (!allowedStatuses.includes(orderStatus)) {
    return res.status(400).json({ message: "Invalid status value" });
  }
  const order = await orderModel.findById(orderId);
  if (!order) {
    return next(new AppError("order not found", 404));
  }

  if (order.orderStatus === orderStatus) {
    return next(new AppError("Order is already in this status", 400));
  }

  order.orderStatus = orderStatus;
  await order.save();

  res.status(200).json({
    status: "success",
    message: "Order status updated successfully",
    order,
  });
});

// filter orders
export const filterOrdersByStatus = asyncHandler(async (req, res, next) => {
  const { orderStatus } = req.query;

  const allowedStatuses = ["Pending", "Shipped", "Delivered", "Cancelled"];
  if (!allowedStatuses.includes(orderStatus)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  const result = await orderModel.find({ orderStatus: orderStatus });
  if (!result || result.length === 0) {
    return next(new AppError(`No ${orderStatus} Orders Found`, 404));
  }

  res.status(200).json({
    status: "success",
    message: `${orderStatus} orders retrieved successfully`,
    count: result.length,
    data: result,
  });
});
