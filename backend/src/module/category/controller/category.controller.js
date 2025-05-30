import {asyncHandler} from "./../../../utils/asyncHandler.js";
import categoryModel from "./../../../../DB/models/category.model.js";
import AppError from "../../../utils/AppError.js";



//create categor
export const createCategory = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  const categoryExists = await categoryModel.findOne({ name });
  if (categoryExists) {
    return next(new AppError("Category already exists", 400));
  }

  const category = await categoryModel.create({ name, description });
  res.status(201).json({ message: "Category created", category });
});

export const getAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await categoryModel.find({ isDeleted: false });

  if (!categories || categories.length === 0) {
    return next(new AppError("No Categories Found", 404));
  }

  res.status(200).json({ message: "Categories retrieved", categories });
});

export const getCategoryById = asyncHandler(async (req, res, next) => {
  const category = await categoryModel.findOne({ _id: req.params.id, isDeleted: false });

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({ message: "Category retrieved", category });
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const updated = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!updated) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({ message: "Category updated", category: updated });
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const deleted = await categoryModel.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });

  if (!deleted) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({ message: "Category deleted" });
});