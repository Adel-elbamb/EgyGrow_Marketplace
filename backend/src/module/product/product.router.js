import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCatId ,
  getProductByName
} from "./controller/product.controller.js";
import {uploadProductImages} from "./../../utils/multer.js";

import { auth, restrictTo } from "../../middleware/auth.js";

const router = express.Router();

router.post("/", auth, restrictTo("admin", "subAdmin"), uploadProductImages, createProduct);
router.put("/:id", auth, restrictTo("admin", "subAdmin"),uploadProductImages,updateProduct);
router.delete("/:id", auth, restrictTo("admin", "subAdmin"), deleteProduct);
//////
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/category/:categoryID", getProductsByCatId);
router.get("/name/:name", getProductByName);
export default router;
