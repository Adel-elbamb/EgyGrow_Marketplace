import express from "express";
import {
  createCoupon,
  updateCouponStatus,
  deleteCoupon,
  getAllCoupons,
} from "./controller/coupon.controller.js";
import { validateCoupon } from "./coupon.validation.js";

const router = express.Router();
router.get("/", getAllCoupons);
router.post("/add-coupon", validateCoupon, createCoupon);
router.patch("/update-coupon/:id", updateCouponStatus);
router.delete("/delete-coupon/:id", deleteCoupon);
export default router;
