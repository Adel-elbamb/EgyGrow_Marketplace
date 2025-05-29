import joi from "joi";
import { generalfields } from '../../utils/generalfields.js';

export const createProductSchema = {
    body: joi.object({
        name: joi.string().min(3).max(20).required().messages({
            'string.min': 'minimum length 3 char',
            'string.max': 'max length 20 char',
            'any.required': 'name required'
        }),
        description: joi.string().min(3).max(1000).required().messages({
            'string.min': 'minimum length 3 char',
            'string.max': 'max length 1000 char',
            'any.required': 'description required'
        }),
        price: joi.number().required().messages({
            'any.required': 'price required'
        }),
        quantity: joi.number().required().messages({
            'any.required': 'quantity required'
        }),
        stock: joi.number().min(0).required().messages({
            'number.min': 'Stock cannot be negative',
            'any.required': 'Stock quantity is required'
        }),
        category: generalfields.id
    }),
    files: joi.array().items(generalfields.file)
};

export const updateProductSchema = {
    params: joi.object({
        id: generalfields.id
    }),
    body: joi.object({
        name: joi.string().min(3).max(20).messages({
            'string.min': 'minimum length 3 char',
            'string.max': 'max length 20 char'
        }),
        description: joi.string().min(3).max(1000).messages({
            'string.min': 'minimum length 3 char',
            'string.max': 'max length 1000 char'
        }),
        price: joi.number(),
        quantity: joi.number(),
        stock: joi.number().min(0).messages({
            'number.min': 'Stock cannot be negative'
        }),
        category: generalfields.id
    }).min(1),
    files: joi.array().items(generalfields.file)
};

export const deleteProductSchema = {
    params: joi.object({
        id: generalfields.id
    })
};

export const getProductByIdSchema = {
    params: joi.object({
        id: generalfields.id
    })
};

export const getProductByNameSchema = {
    params: joi.object({
        name: joi.string().required()
    })
};

export const getProductsByCatIdSchema = {
    params: joi.object({
        categoryID: generalfields.id
    }),
    query: joi.object({
        page: joi.number().integer().min(1),
        limit: joi.number().integer().min(1)
    })
};
