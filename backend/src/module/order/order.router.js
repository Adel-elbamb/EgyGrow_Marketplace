import express from "express";
import {
  createOrder,
  filterOrdersByStatus,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "./controller/order.controller.js";

const router = express.Router();
router.post("/", createOrder);
router.get("/", getAllOrders);
router.patch("/update-status/:orderId", updateOrderStatus);
router.get("/filter", filterOrdersByStatus);
router.get("/:orderId", getOrderById);

export default router;
