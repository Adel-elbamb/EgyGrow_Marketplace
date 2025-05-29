import joi from "joi";
import { generalfields } from '../../utils/generalfields.js';

export const createAdminSchema = {
    body: joi.object({
        firstName: joi.string().min(3).max(20).required().messages({
            'string.min': 'minimum length 3 char',
            'string.max': 'max length 20 char',
            'any.required': 'firstName required'
        }),
        lastName: joi.string().min(3).max(20).required().messages({
            'string.min': 'minimum length 3 char',
            'string.max': 'max length 20 char',
            'any.required': 'lastName required'
        }),
        userName: joi.string().required(),
        email: generalfields.email,
        password: generalfields.password,
        gender: joi.string().valid('female', 'male').default('female'),
        mobileNumber: joi.string().required().messages({
            'any.required': 'mobileNumber required'
        }),
        role: joi.string().valid('admin').required(),
        address: joi.string().optional(),
        image: joi.string().optional(),
        DOB: joi.string().optional()
    })
};

export const loginSchema = {
    body: joi.object({
        email: generalfields.email,
        password: generalfields.password
    })
};

export const createSubAdminSchema = {
    body: joi.object({
        firstName: joi.string().min(3).max(20).required().messages({
            'string.min': 'minimum length 3 char',
            'string.max': 'max length 20 char',
            'any.required': 'firstName required'
        }),
        lastName: joi.string().min(3).max(20).required().messages({
            'string.min': 'minimum length 3 char',
            'string.max': 'max length 20 char',
            'any.required': 'lastName required'
        }),
        userName: joi.string().required(),
        email: generalfields.email,
        password: generalfields.password,
        gender: joi.string().valid('female', 'male').default('female'),
        mobileNumber: joi.string().required().messages({
            'any.required': 'mobileNumber required'
        }),
        role: joi.string().valid('subAdmin').required(),
        address: joi.string().optional(),
        image: joi.string().optional(),
        DOB: joi.string().optional()
    })
};

export const updateSubAdminSchema = {
    body: joi.object({
        firstName: joi.string().min(3).max(20).messages({
            'string.min': 'minimum length 3 char',
            'string.max': 'max length 20 char'
        }),
        lastName: joi.string().min(3).max(20).messages({
            'string.min': 'minimum length 3 char',
            'string.max': 'max length 20 char'
        }),
        userName: joi.string(),
        email: joi.string().email({ tlds: { allow: ['com', 'net'] }}),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        gender: joi.string().valid('female', 'male'),
        mobileNumber: joi.string(),
        address: joi.string(),
        image: joi.string(),
        DOB: joi.string(),
        role: joi.string().valid('subAdmin')
    }).min(1)
};

export const getSubAdminByIdSchema = {
    params: joi.object({
        id: generalfields.id
    })
};

export const updateSubAdminValidation = {
    params: joi.object({
        id: generalfields.id
    }),
    body: joi.object({
        firstName: joi.string().min(3).max(20).messages({
            'string.min': 'minimum length 3 char',
            'string.max': 'max length 20 char'
        }),
        lastName: joi.string().min(3).max(20).messages({
            'string.min': 'minimum length 3 char',
            'string.max': 'max length 20 char'
        }),
        userName: joi.string(),
        email: joi.string().email({ tlds: { allow: ['com', 'net'] }}),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        gender: joi.string().valid('female', 'male'),
        mobileNumber: joi.string(),
        address: joi.string(),
        image: joi.string(),
        DOB: joi.string(),
        role: joi.string().valid('subAdmin')
    }).min(1)
};

export const deleteSubAdminSchema = {
    params: joi.object({
        id: generalfields.id
    })
};

export const softDeleteSubAdminSchema = {
    params: joi.object({
        id: generalfields.id
    })
};

export const hardDeleteSubAdminSchema = {
    params: joi.object({
        id: generalfields.id
    })
};
