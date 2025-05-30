import Router from 'express'
import {
  createAdmin_one,
  login,
  createSubAdmin,
  getAllSubAdmins,
  getSubAdminById,
  updateSubAdmin,
  deleteOwnAdmin,
  softDeleteSubAdmin,
  hardDeleteSubAdmin
} from './controller/auth.controller.js'
import validation from '../../middleware/validation.js'
import { auth, restrictTo } from './../../middleware/auth.js'
import {
  createAdminSchema,
  loginSchema,
  createSubAdminSchema,
  getSubAdminByIdSchema,
  updateSubAdminValidation,
  deleteSubAdminSchema,
  softDeleteSubAdminSchema,
  hardDeleteSubAdminSchema
} from './auth.validation.js'

const router = Router()

router.post("/createAdmin", validation(createAdminSchema), createAdmin_one);
router.post("/login", validation(loginSchema), login);
router.post("/createSubadmin", auth, restrictTo("admin"), validation(createSubAdminSchema), createSubAdmin);
router.get("/subadmins", auth, restrictTo("admin"), getAllSubAdmins);
router.get("/subadmin/:id", auth, restrictTo("admin"), validation(getSubAdminByIdSchema), getSubAdminById);
router.put("/subadmin/:id", auth, restrictTo("admin"), validation(updateSubAdminValidation), updateSubAdmin);
// router.delete("/subadmin/:id", auth, restrictTo("admin"), deleteSubAdmin);
router.delete("/admin/self", auth, restrictTo("admin"), deleteOwnAdmin);
router.patch("/subadmin/:id/soft-delete", auth, restrictTo("admin"), validation(softDeleteSubAdminSchema), softDeleteSubAdmin);
router.delete("/subadmin/:id", auth, restrictTo("admin"), validation(hardDeleteSubAdminSchema), hardDeleteSubAdmin);

export default router