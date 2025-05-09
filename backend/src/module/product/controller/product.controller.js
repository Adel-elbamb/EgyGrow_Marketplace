import Product from "../../../../DB/models/product.model";
import { asyncHandler } from "../../../utils/asyncHandler";

export const getProductByName = asyncHandler(async (req, res, next) => {
  const { name } = req.params;
  const product = await Product.findOne({ name });
  if (!product) {
    return next(new Error("Product Not Found", { cause: 404 }));
  }
  return res.status(200).json({ status: "success", data: product });
});

export const getProductsByCatId = asyncHandler(async (req, res, next) => {
  const { page } = req.params.page || 1;
  const { limit } = req.params.limit || 15;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const { categoryID } = req.params.categoryID;
  let products = await Product.find({ category: categoryID })
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments({ category: categoryID });

  if (!products) {
    return next(new Error("No Products Found", { cause: 404 }));
  }

  return res.status(200).json({
    status: "success",
    page: page,
    pages: Math.ceil(total / limit),
    total: total,
    data: products,
  });
});

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const { page } = req.params.page || 1;
  const { limit } = req.params.limit || 15;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const products = Product.find().skip(skip).limit(limit);
  const total = await Product.countDocuments();

  if (!products) {
    return next(new Error("No Products Found", { cause: 404 }));
  }

  return res.status(200).json({
    status: "success",
    page: page,
    pages: Math.ceil(total / limit),
    total: total,
    data: products,
  });
});
