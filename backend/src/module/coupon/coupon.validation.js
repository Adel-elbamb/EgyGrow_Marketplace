import joi from "joi";
import { generalfields } from '../../utils/generalfields.js';

const couponValidationSchema = joi.object({
    code: joi.string().required().messages({
        'any.required': 'Coupon code is required'
    }),
    discountPercentage: joi.number().min(0).max(100).required().messages({
        'number.min': 'Discount percentage cannot be negative',
        'number.max': 'Discount percentage cannot exceed 100',
        'any.required': 'Discount percentage is required'
    }),
    expirationDate: joi.date().greater('now').required().messages({
        'date.greater': 'Expiration date must be in the future',
        'any.required': 'Expiration date is required'
    }),
    isActive: joi.boolean().default(true)
});

export const createCouponSchema = {
    body: joi.alternatives().try(
        couponValidationSchema,
        joi.array().items(couponValidationSchema)
    )
};

export const updateCouponStatusSchema = {
    params: joi.object({
        id: generalfields.id
    }),
    body: joi.object({
        isActive: joi.boolean().required().messages({
            'any.required': 'isActive status is required'
        })
    })
};

export const deleteCouponSchema = {
    params: joi.object({
        id: generalfields.id
    })
};

export const validateCoupon = (req, res, next) => {
    const validation = createCouponSchema.body.validate(req.body, { abortEarly: false });
    if (validation.error) {
        return next(new AppError(validation.error.details[0].message, 400));
    }
    next();
};
