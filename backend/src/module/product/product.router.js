import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./controller/product.controller.js";

import { auth, restrictTo } from "../../middleware/auth.js";

const router = express.Router();

router.post("/", auth, restrictTo("admin", "subAdmin"), createProduct);
router.get("/", auth, restrictTo("admin", "subAdmin"), getAllProducts);
router.get("/:id", auth, restrictTo("admin", "subAdmin"), getProductById);
router.put("/:id", auth, restrictTo("admin", "subAdmin"), updateProduct);
router.delete("/:id", auth, restrictTo("admin", "subAdmin"), deleteProduct);

export default router;
