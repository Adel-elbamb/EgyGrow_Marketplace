import Joi from "joi";

const singleCouponSchema = Joi.object({
  code: Joi.string().required(),
  discountPercentage: Joi.number().min(0).max(100).required(),
  expirationDate: Joi.date().required(),
});

const couponValidation = Joi.array().items(singleCouponSchema);

export const validateCoupon = (req, res, next) => {
  const { error } = couponValidation.validate(req.body, { abortEarly: false });

  if (error) {
    return next(
      new AppError("Validation Error", 400, {
        type: "validation",
        details: error.details,
      })
    );
  }
  console.log("pass validation");
  next();
};
