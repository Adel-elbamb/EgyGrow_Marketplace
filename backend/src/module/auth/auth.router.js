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
import{auth , restrictTo} from './../../middleware/auth.js'

const router = Router()

router.post("/createAdmin", createAdmin_one);
router.post("/login", login);
router.post("/createSubadmin", auth, restrictTo("admin"), createSubAdmin);
router.get("/subadmins", auth, restrictTo("admin"), getAllSubAdmins);
router.get("/subadmin/:id", auth, restrictTo("admin"), getSubAdminById);
router.put("/subadmin/:id", auth, restrictTo("admin"), updateSubAdmin);
// router.delete("/subadmin/:id", auth, restrictTo("admin"), deleteSubAdmin);
router.delete("/admin/self", auth, restrictTo("admin"), deleteOwnAdmin);
router.patch("/subadmin/:id/soft-delete",auth, restrictTo("admin"),softDeleteSubAdmin);
router.delete("/subadmin/:id", auth, restrictTo("admin"), hardDeleteSubAdmin);


export default router