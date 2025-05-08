import Joi from 'joi';

export const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  userName:  Joi.string().min(2).max(50).required() ,
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  mobileNumber: Joi.string().pattern(/^01[0125][0-9]{8}$/).required(), // pattern for Egyptian numbers, adjust if needed
  password: Joi.string().min(6).max(30).required(),
  gender: Joi.string().valid('male', 'female').optional(),
  role: Joi.string().valid('User', 'Admin', 'Seller').optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().required()
});