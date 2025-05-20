import productModel from './../../../../DB/models/product.model.js';
import categoryModel from './../../../../DB/models/Category.model.js';
import { asyncHandler } from './../../../utils/asyncHandler.js';

export const createProduct = asyncHandler(async (req, res, next) => {
  const { name, description, price, category, stock, quantity } = req.body;

  const categoryExists = await categoryModel.findById(category);
  if (!categoryExists) {
    return next(new Error("Invalid category ID", { cause: 400 }));
  }

  const images = req.files?.map(file => file.filename) || [];

  const product = await productModel.create({
    name,
    description,
    price,
    stock,
    quantity,
    category,
    images,
  });

  res.status(201).json({ message: "Product created", product });
});

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await productModel.find({ isDeleted: false }).populate("category", "name _id");

  if (!products.length) {
    return next(new Error("No Products Found", { cause: 404 }));
  }

  res.status(200).json({ message: "Products retrieved", products });
});

export const getProductById = asyncHandler(async (req, res, next) => {
  const product = await productModel
    .findOne({ _id: req.params.id, isDeleted: false })
    .populate("category", "name _id");

  if (!product) {
    return next(new Error("Product not found", { cause: 404 }));
  }

  res.status(200).json({ message: "Product retrieved", product });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const { category } = req.body;

  if (category) {
    const categoryExists = await categoryModel.findById(category);
    if (!categoryExists) {
      return next(new Error("Invalid category ID", { cause: 400 }));
    }
  }

  const updatedData = {
    ...req.body,
  };

  if (req.files?.length) {
    updatedData.images = req.files.map(file => file.filename);
  }

  const updated = await productModel
    .findByIdAndUpdate(req.params.id, updatedData, { new: true })
    .populate("category", "name _id");

  if (!updated) {
    return next(new Error("Product not found", { cause: 404 }));
  }

  res.status(200).json({ message: "Product updated", product: updated });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const deleted = await productModel.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });

  if (!deleted) {
    return next(new Error("Product not found", { cause: 404 }));
  }

  res.status(200).json({ message: "Product deleted" });
});

export const getProductByName = asyncHandler(async (req, res, next) => {
  const { name } = req.params;
  const product = await productModel.findOne({ name, isDeleted: false });

  if (!product) {
    return next(new Error("Product Not Found", { cause: 404 }));
  }

  res.status(200).json({ message: "Product retrieved", product });
});


export const getProductsByCatId = asyncHandler(async (req, res, next) => {
  const { categoryID } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 15;
  const skip = (page - 1) * limit;

  const products = await productModel
    .find({ category: categoryID, isDeleted: false })
    .skip(skip)
    .limit(limit)
    .populate("category", "name _id");

  if (!products.length) {
    return next(new Error("No Products Found for this category", { cause: 404 }));
  }

  const total = await productModel.countDocuments({ category: categoryID, isDeleted: false });

  res.status(200).json({
    message: "Products retrieved",
    page,
    pages: Math.ceil(total / limit),
    total,
    data: products,
  });
});
