import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCatId,
  getProductByName
} from "./controller/product.controller.js";
import {uploadProductImages} from "./../../utils/multer.js";

import { auth, restrictTo } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";
import {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
  getProductByIdSchema,
  getProductByNameSchema,
  getProductsByCatIdSchema
} from "./product.validation.js";

const router = express.Router();

router.post("/", 
  auth, 
  restrictTo("admin", "subAdmin"), 
  uploadProductImages,
  validation(createProductSchema),
  createProduct
);

router.put("/:id", 
  auth, 
  restrictTo("admin", "subAdmin"),
  uploadProductImages,
  validation(updateProductSchema),
  updateProduct
);

router.delete("/:id", 
  auth, 
  restrictTo("admin", "subAdmin"), 
  validation(deleteProductSchema),
  deleteProduct
);

router.get("/", getAllProducts);

router.get("/:id", 
  validation(getProductByIdSchema),
  getProductById
);

router.get("/category/:categoryID", 
  validation(getProductsByCatIdSchema),
  getProductsByCatId
);

router.get("/name/:name", 
  validation(getProductByNameSchema),
  getProductByName
);

export default router;
