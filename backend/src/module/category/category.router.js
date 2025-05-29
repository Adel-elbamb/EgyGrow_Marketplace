import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./controller/category.controller.js";
import { auth, restrictTo } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";
import {
  createCategorySchema,
  updateCategorySchema,
  getCategoryByIdSchema,
  deleteCategorySchema
} from "./category.validation.js";

const router = express.Router();

router.post("/", 
  auth, 
  restrictTo("admin", "subAdmin"),
  validation(createCategorySchema), 
  createCategory
);

router.get("/", getAllCategories);

router.get("/:id", 
  validation(getCategoryByIdSchema),
  getCategoryById
);

router.put("/:id", 
  auth, 
  restrictTo("admin", "subAdmin"),
  validation(updateCategorySchema),
  updateCategory
);

router.delete("/:id", 
  auth, 
  restrictTo("admin", "subAdmin"),
  validation(deleteCategorySchema),
  deleteCategory
);

export default router;
