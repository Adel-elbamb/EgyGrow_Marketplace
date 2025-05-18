import userModel from '../../../../DB/models/user.model.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';
// import {registerSchema ,validateRegister} from './../auth.validation.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//=================================== signUp  ======================================
export const signUp = asyncHandler(async (req, res, next) => {


  const { email, firstName, lastName, mobileNumber, password } = req.body;


  if (await userModel.findOne({ email })) {
    return next(new Error("Email already exists, please login"), { cause: 409 });
  }

  if (await userModel.findOne({ mobileNumber })) {
    return next(new Error("Mobile number already exists"), { cause: 409 });
  }
  
  const hashPassword = await bcrypt.hash(password, 10);
  req.body.password = hashPassword;

  const user = await userModel.create(req.body);

  res.status(201).json({ message: "Success", user });
});

// =========================== login ==========================================
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return next(new Error("Email or password is not valid"), { cause: 404 });
  }

  const match = bcrypt.compareSync(password, user.password);

  if (!match) {
    return next(new Error("Email or password is not valid"), { cause: 404 });
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email , role : user.role },
    process.env.SIGNTURE,
    { expiresIn: "9h" }
  );

  res.status(200).json({ message: "Login successful", token });
});
