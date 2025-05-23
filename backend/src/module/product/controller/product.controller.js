import Product from "../../../../DB/models/product.model.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

//
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, quantity, category, images, stock } =
    req.body;

  if (
    !name ||
    !description ||
    !price ||
    !quantity ||
    !category ||
    stock === undefined
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const product = await Product.create({
    name,
    description,
    price,
    quantity,
    category,
    images, // Optional field; default is handled by schema
    stock,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

export const getProductByID = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return res
      .status(404)
      .json({ status: "fail", message: "Product Not Found" });
  }
  res.status(200).json({ status: "success", message: product });
});

// @desc    Get product by Name
export const getProductByName = asyncHandler(async (req, res, next) => {
  const { name } = req.params;
  const product = await Product.findOne({ name });
  if (!product) {
    return next(new Error("Product Not Found", { statusCode: 404 }));
  }
  return res.status(200).json({ status: "success", data: product });
});

// @desc    Get products by category ID
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
    return next(new Error("No Products Found", { statusCode: 404 }));
  }

  return res.status(200).json({
    status: "success",
    page: page,
    pages: Math.ceil(total / limit),
    total: total,
    data: products,
  });
});

// @desc    Get all products
export const getAllProducts = asyncHandler(async (req, res, next) => {
  const { page } = req.params.page || 1;
  const { limit } = req.params.limit || 15;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const products = Product.find().skip(skip).limit(limit);
  const total = await Product.countDocuments();

  if (!products) {
    return next(new Error("No Products Found", { statusCode: 404 }));
  }

  return res.status(200).json({
    status: "success",
    page: page,
    pages: Math.ceil(total / limit),
    total: total,
    data: products,
  });
});
