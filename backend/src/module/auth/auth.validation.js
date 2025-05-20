import Joi from "joi";

export const createAdminSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("admin").required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const createSubAdminSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  fullName: Joi.string().min(3).max(50),
});

export const updateSubAdminSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6),
  fullName: Joi.string().min(3).max(50),
});
