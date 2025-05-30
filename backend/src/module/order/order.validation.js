import joi from "joi";
import { generalfields } from '../../utils/generalfields.js';

const productItemSchema = joi.object({
    productId: generalfields.id,
    quantity: joi.number().integer().min(1).required().messages({
        'number.min': 'Quantity must be at least 1',
        'any.required': 'Quantity is required'
    })
});

const customerInfoSchema = joi.object({
    fullname: joi.string().min(12).max(50).required().messages({
        'string.min': 'Minimum length is 12 characters',
        'string.max': 'Maximum length is 50 characters',
        'any.required': 'Full name is required'
    }),
    address: joi.string().min(12).max(50).required().messages({
        'string.min': 'Minimum length is 12 characters',
        'string.max': 'Maximum length is 50 characters',
        'any.required': 'Address is required'
    }),
    mobileNumber: joi.string().required().messages({
        'any.required': 'mobileNumber required'
    }),
    Government: joi.string().optional()
});

export const createOrderSchema = {
    body: joi.object({
        customerInfo: customerInfoSchema.required(),
        products: joi.array().items(productItemSchema).min(1).required().messages({
            'array.min': 'Order must contain at least one product',
            'any.required': 'Products are required'
        }),
        couponCode: joi.string().optional().allow('', null),
        paymentMethod: joi.string().valid('CashOnDelivery', 'Company', 'e-wallet').required().messages({
            'any.only': 'Payment method must be one of: CashOnDelivery, Company, e-wallet',
            'any.required': 'Payment method is required'
        })
    }).required()
};

export const updateOrderStatusSchema = {
    params: joi.object({
        orderId: generalfields.id
    }).required(),
    body: joi.object({
        orderStatus: joi.string().valid('Pending', 'Shipped', 'Delivered', 'Cancelled').required().messages({
            'any.only': 'Status must be one of: Pending, Shipped, Delivered, Cancelled',
            'any.required': 'Order status is required'
        })
    }).required()
};

export const getOrderByIdSchema = {
    params: joi.object({
        orderId: generalfields.id
    }).required()
};

export const filterOrdersByStatusSchema = {
    query: joi.object({
        orderStatus: joi.string().valid('Pending', 'Shipped', 'Delivered', 'Cancelled').required().messages({
            'any.only': 'Status must be one of: Pending, Shipped, Delivered, Cancelled',
            'any.required': 'Order status is required'
        })
    }).required()
};
