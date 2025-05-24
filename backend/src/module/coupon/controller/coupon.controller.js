import couponModel from "../../../../DB/models/coupon.model.js";
import AppError from "../../../utils/AppError.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

export const createCoupon = asyncHandler(async (req, res, next) => {
  try {
    const bulkedCoupons = await couponModel.insertMany(req.body, {
      ordered: false,
    });
    return res.status(201).json({
      success: true,
      message: "All coupons inserted successfully",
      inserted: bulkedCoupons,
      failed: [],
    });
  } catch (error) {
    if (error.name === "MongoBulkWriteError") {
      const couponsToInsert = req.body;
      const insertedDocs = error.insertedDocs || [];
      const writeErrors = error.writeErrors || [];

      const failed = writeErrors.map((err) => {
        const index = err.index;
        const originalDoc = couponsToInsert[index];
        return {
          message: err.errmsg,
          code: err.code,
          index: err.index,
          couponCode: originalDoc?.code,
        };
      });

      return res.status(207).json({
        success: false,
        message: "Some or All coupons failed to insert",
        inserted: insertedDocs,
        failed,
      });
    }
    next(new AppError("Failed to insert coupons", 500));
  }
});

export const updateCouponStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { isActive } = req.body;

  const updatedCoupon = await couponModel.findByIdAndUpdate(
    id,
    { isActive },
    { new: true }
  );

  if (!updatedCoupon) {
    return res
      .status(404)
      .json({ success: false, message: "Coupon not found" });
  }

  res.status(200).json({
    success: true,
    data: updatedCoupon,
  });
});

export const deleteCoupon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedCoupon = await couponModel.findByIdAndDelete(id);

  if (!deletedCoupon) {
    return res
      .status(404)
      .json({ success: false, message: "Coupon not found" });
  }

  res.status(200).json({
    success: true,
    data: deletedCoupon,
  });
});

export const getAllCoupons = asyncHandler(async (req, res, next) => {
  const coupons = await couponModel.find();
  if (!coupons) {
    return next(new Error("No Coupons Found", { statusCode: 404 }));
  }

  return res.status(200).json({ success: true, data: coupons });
});
