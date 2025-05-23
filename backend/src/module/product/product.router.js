import express from "express";
import {
  getProductByName,
  getAllProducts,
  getProductsByCatId,
  createProduct,
} from "./controller/product.controller.js";
const router = express.Router();

router.get("/", getAllProducts);
router.post("/create-product", createProduct);
router.get("/:name", getProductByName);
router.get("/category/:categoryID", getProductsByCatId);

export default router;
