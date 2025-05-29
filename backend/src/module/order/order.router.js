import express from "express";
import {
  createOrder,
  filterOrdersByStatus,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "./controller/order.controller.js";
import { auth, restrictTo } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";
import {
  createOrderSchema,
  updateOrderStatusSchema,
  getOrderByIdSchema,
  filterOrdersByStatusSchema
} from "./order.validation.js";

const router = express.Router();

router.post("/", 
  auth,
  restrictTo("admin", "subAdmin"),
  validation(createOrderSchema),
  createOrder
);

router.get("/", 
  getAllOrders
);

router.patch("/update-status/:orderId", 
  auth,
  restrictTo("admin", "subAdmin"),
  validation(updateOrderStatusSchema),
  updateOrderStatus
);

router.get("/filter", 
  // auth,
  // restrictTo("admin", "subAdmin"),
  validation(filterOrdersByStatusSchema),
  filterOrdersByStatus
);

router.get("/:orderId", 
  validation(getOrderByIdSchema),
  getOrderById
);

export default router;
