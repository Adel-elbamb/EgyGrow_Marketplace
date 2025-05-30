import joi from "joi";
import { generalfields } from '../../utils/generalfields.js';

export const createCategorySchema = {
    body: joi.object({
        name: joi.string().required().trim().messages({
            'any.required': 'Category name is required'
        }),
        description: joi.string().trim()
    })
};

export const updateCategorySchema = {
    params: joi.object({
        id: generalfields.id
    }),
    body: joi.object({
        name: joi.string().trim(),
        description: joi.string().trim()
    }).min(1)
};

export const getCategoryByIdSchema = {
    params: joi.object({
        id: generalfields.id
    })
};

export const deleteCategorySchema = {
    params: joi.object({
        id: generalfields.id
    })
};
