import userModel from '../../../../DB/models/user.model.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';
// import {registerSchema ,validateRegister} from './../auth.validation.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


//  Create Admin (only if not exists)
export const createAdmin_one = async (req, res, next) => {
  const { email, password, role } = req.body;

  const existingAdmin = await userModel.findOne({ role: "admin" });
  if (existingAdmin && role === "admin") {
    return next(new Error("Admin already exists"));
  }

  const hashPassword = await bcrypt.hash(password, 10);
  req.body.password = hashPassword;

  const adminOne = await userModel.create(req.body);

  const token = jwt.sign(
    { _id: adminOne.id, email: adminOne.email, role: adminOne.role },
    process.env.SIGNTURE,
    { expiresIn: "9h" }
  );

  return res.status(201).json({
    message: "Admin successfully created",
    token,
  });
};

// ======================login+++=========
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return next(new Error("Email or password is invalid"));

  const match = await bcrypt.compare(password, user.password);
  if (!match) return next(new Error("Email or password is invalid"));

  const token = jwt.sign(
    { _id: user.id, email: user.email, role: user.role },
    process.env.SIGNTURE,
    { expiresIn: "9h" }
  );

  res.status(200).json({ message: "Login successful", token });
});

///create subadmin
export const createSubAdmin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return next(new Error("Email already in use"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  req.body.password = hashedPassword;
  req.body.role = "subAdmin";

  const subAdmin = await userModel.create(req.body);
  res.status(201).json({ message: "SubAdmin created", subAdmin });
});

///////get all sub admin 
export const getAllSubAdmins = asyncHandler(async (req, res) => {
  const subAdmins = await userModel.find({ role: "subAdmin", isDeleted: false });
  res.status(200).json({ subAdmins });
});

//get admin by id 
export const getSubAdminById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subAdmin = await userModel.findOne({ _id: id, role: "subAdmin" });
  if (!subAdmin) return next(new Error("SubAdmin not found"));
  res.status(200).json({ subAdmin });
});

////updatesubadmin
export const updateSubAdmin = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  const updated = await userModel.findOneAndUpdate(
    { _id: id, role: "subAdmin" },
    updates,
    { new: true }
  );

  if (!updated) return next(new Error("SubAdmin not found"));
  res.status(200).json({ message: "Updated successfully", updated });
});


///delete subadmin
export const deleteSubAdmin = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deleted = await userModel.findOneAndDelete({ _id: id, role: "subAdmin" });
  if (!deleted) return next(new Error("SubAdmin not found"));

  res.status(200).json({ message: "SubAdmin deleted" });
});

// delete  own admin
export const deleteOwnAdmin = asyncHandler(async (req, res, next) => {
  const adminId = req.user._id;

  const deleted = await userModel.findOneAndDelete({ _id: adminId, role: "admin" });
  if (!deleted) return next(new Error("Admin not found"));

  res.status(200).json({ message: "Admin account deleted" });
});
