import express from "express";
import {
  createCoupon,
  updateCouponStatus,
  deleteCoupon,
  getAllCoupons,
} from "./controller/coupon.controller.js";
import { auth, restrictTo } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";
import {
  createCouponSchema,
  updateCouponStatusSchema,
  deleteCouponSchema
} from "./coupon.validation.js";

const router = express.Router();

router.get("/", getAllCoupons);

router.post("/add-coupon", 
  auth, 
  restrictTo("admin", "subAdmin"),
  validation(createCouponSchema), 
  createCoupon
);

router.patch("/update-coupon/:id", 
  auth, 
  restrictTo("admin", "subAdmin"),
  validation(updateCouponStatusSchema),
  updateCouponStatus
);

router.delete("/delete-coupon/:id", 
  auth, 
  restrictTo("admin", "subAdmin"),
  validation(deleteCouponSchema),
  deleteCoupon
);

export default router;
