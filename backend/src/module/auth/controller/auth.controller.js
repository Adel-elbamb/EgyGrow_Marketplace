import userModel from '../../../../DB/models/user.model.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export const createAdmin_one = asyncHandler(async (req, res, next) => {
  const { email, password, role } = req.body;

  const existingAdmin = await userModel.findOne({ role: "admin" });
  if (existingAdmin && role === "admin") {
    return next(new Error("Admin already exists", { cause: 400 }));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const adminOne = await userModel.create({ ...req.body, password: hashedPassword });

  const token = jwt.sign(
    { _id: adminOne.id, email: adminOne.email, role: adminOne.role },
    process.env.SIGNTURE,
    { expiresIn: "9h" }
  );

  return res.status(201).json({ message: "Admin successfully created", token });
});


export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email, isDeleted: false });
  if (!user) return next(new Error("Email or password is invalid", { cause: 400 }));

  const match = await bcrypt.compare(password, user.password);
  if (!match) return next(new Error("Email or password is invalid", { cause: 400 }));

  const token = jwt.sign(
    { _id: user.id, email: user.email, role: user.role },
    process.env.SIGNTURE,
    { expiresIn: "9h" }
  );

  res.status(200).json({ message: "Login successful", token });
});

export const createSubAdmin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return next(new Error("Email already in use", { cause: 400 }));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const subAdmin = await userModel.create({
    ...req.body,
    password: hashedPassword,
    role: "subAdmin",
  });

  res.status(201).json({ message: "SubAdmin created", subAdmin });
});

export const getAllSubAdmins = asyncHandler(async (req, res, next) => {
  const subAdmins = await userModel.find({ role: "subAdmin", isDeleted: false });

  if (!subAdmins.length) {
    return next(new Error("No SubAdmins Found", { cause: 404 }));
  }

  res.status(200).json({ subAdmins });
});

export const getSubAdminById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subAdmin = await userModel.findOne({ _id: id, role: "subAdmin", isDeleted: false });

  if (!subAdmin) {
    return next(new Error("SubAdmin Not Found", { cause: 404 }));
  }

  res.status(200).json({ subAdmin });
});

export const updateSubAdmin = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updates = { ...req.body };

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  const updated = await userModel.findOneAndUpdate(
    { _id: id, role: "subAdmin", isDeleted: false },
    updates,
    { new: true }
  );

  if (!updated) {
    return next(new Error("SubAdmin Not Found", { cause: 404 }));
  }

  res.status(200).json({ message: "SubAdmin Updated", updated });
});

// Soft Delete SubAdmin
export const softDeleteSubAdmin = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const updated = await userModel.findOneAndUpdate(
    { _id: id, role: "subAdmin", isDeleted: false },
    { isDeleted: true },
    { new: true }
  );

  if (!updated) {
    return next(new Error("SubAdmin Not Found", { cause: 404 }));
  }

  res.status(200).json({ message: "SubAdmin soft deleted" });
});

// Hard Delete SubAdmin
export const hardDeleteSubAdmin = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deleted = await userModel.findOneAndDelete({ _id: id, role: "subAdmin" });

  if (!deleted) {
    return next(new Error("SubAdmin Not Found", { cause: 404 }));
  }

  res.status(200).json({ message: "SubAdmin permanently deleted" });
});

// (Hard Delete)
export const deleteOwnAdmin = asyncHandler(async (req, res, next) => {
  const adminId = req.user._id;

  const deleted = await userModel.findOneAndDelete({ _id: adminId, role: "admin" });

  if (!deleted) {
    return next(new Error("Admin Not Found", { cause: 404 }));
  }

  res.status(200).json({ message: "Admin account permanently deleted" });
});
