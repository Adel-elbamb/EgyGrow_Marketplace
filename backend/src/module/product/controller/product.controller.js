import productModel from './../../../../DB/models/product.model.js'
import {asyncHandler} from "./../../../utils/asyncHandler.js";


//create the product 
export const createProduct = asyncHandler(async (req, res) => {
  const product = await productModel.create(req.body);
  res.status(201).json({ message: "Product created", product });
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productModel.find({ isDeleted: false });
  res.status(200).json({ message: "Products retrieved", products });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await productModel.findOne({ _id: req.params.id, isDeleted: false });
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ message: "Product retrieved", product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const updated = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Product not found" });
  res.status(200).json({ message: "Product updated", product: updated });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const deleted = await productModel.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
  if (!deleted) return res.status(404).json({ message: "Product not found" });
  res.status(200).json({ message: "Product deleted" });
});
